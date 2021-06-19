/* Database */
import Dexie from 'dexie'

import { data } from './measurements'

export const db = new Dexie('gains')

db.version(1).stores({
  measurements: "++id, date, type, [type+date]"
})

// load latest data
// only looks for new dates
async function loadNewData() {
  console.log('loading new data')
  const latest = await db.measurements.orderBy('date').last() 
  const maxDate = latest ? latest.date : new Date("1981-01-01")
  console.log(`maxDate: ${maxDate}`)
  const newData = data.measurements.filter(m => m.date > maxDate)
  console.log(`new data identified: ${newData}`)
  newData.sort((a, b) => { a.date - b.date})
  console.log(`serted data: ${newData}`)
  for(const x of newData) {
    for(const prop in x) {
      if(prop !== "date") {
        const id = await db.measurements.put({
          date: x.date,
          type: prop,
          uom: data.uom[prop],
          unit: x[prop]
        })
        console.log(`just put ${id}`)
      }
    }
  }
}

/*
 * Helper functions
 */
async function startingWeight() {
  const record = await db.measurements.where({type: "weight"}).first()
  return record.unit
}


db.on('ready', loadNewData)
db.open()

export const store = {
  db: db,
  startingWeight
}