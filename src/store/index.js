/*
  store

  The store is responsible for data management and access
*/
import Dexie from 'dexie'
import { reactive } from 'vue'

import { data } from './measurements'

const db = new Dexie('gains')

// Constants
const AVERAGE_PERIOD_DAYS = 5

db.version(1).stores({
  measurements: "++id, date, [type+date]"
})

// load latest data
// only looks for new dates
async function loadNewData() {
  const latest = await db.measurements.orderBy('date').last()
  const maxDate = latest ? latest.date : new Date("1981-01-01")
  const newData = data.measurements.filter(m => m.date > maxDate)
  newData.sort((a, b) => { a.date - b.date })
  for (const x of newData) {
    for (const prop in x) {
      if (prop !== "date") {
        const id = await db.measurements.put({
          date: x.date,
          type: prop,
          uom: data.uom[prop],
          unit: x[prop]
        })
      }
    }
  }
}

/*
 * Helper functions
 */
async function measurementAt(date, type, dayRange = 0) {
  let startDate = new Date(date)
  startDate.setDate(startDate.getDate() - dayRange)

  console.log("starting query")
  const records = await db.table('measurements')
    .where("[type+date]")
    .between(
      [type, startDate],
      [type, date],
      true,
      true)
    .toArray()

  console.log("records", records)

  let sum = records.reduce((a, b) => a + b.unit, 0)
  let avg = (sum / records.length) || 0
  return avg
}

async function getCurrent(type) {
  console.log("calculating", type)
  // get the rolling average
  let value = await measurementAt(new Date(), type, AVERAGE_PERIOD_DAYS)
  console.log("value", value)
  // if no data, get the most recent
  if (value == 0) {
    let record = await db.measurements.where("type").equals(type).last()
    value = record.unit
  }

  return value
}

const metrics = reactive({})
async function calculateMetrics() {
  console.log("Calculating metrics")
  console.log(db)
  metrics.currentHeight = await getCurrent("height")
  metrics.currentWeight = await getCurrent("weight")
  metrics.currentNeck = await getCurrent("neck")
  metrics.currentWaist = await getCurrent("waist")
  console.log("metrics", metrics)
}

db.on('ready', async () => {
  await loadNewData()
  await calculateMetrics()
  console.log("Database ready")
})
db.open()

export const store = {
  // data
  metrics,

  // Vue plugin installation
  install(app) {
    app.config.globalProperties.$store = this
  }
}