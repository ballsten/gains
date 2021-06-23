/*
  store

  The store is responsible for data management and access
*/
import Dexie from 'dexie'

import { measurements } from './measurements'
import { plans } from './plans'

// Constants
const AVERAGE_PERIOD_DAYS = 3

export class Store extends Dexie {
  constructor() {
    super('gains')

    this.on.addEventType("dataload")

    this.version(1).stores({
      measurements: "++id, date, [type+date]",
      plans: "startDate, status"
    })

    this.on('ready', () => {
      this.measurements = this.table('measurements')
      this.plans = this.table('plans')
      this.prepareData()
    })

    this.open()
  }

  // load latest data
  // only looks for new dates
  async prepareData() {
    const latest = await this.measurements.orderBy('date').last()
    const maxDate = latest ? latest.date : new Date("1981-01-01")
    const newData = measurements.data.filter(m => m.date > maxDate)
    newData.sort((a, b) => { a.date - b.date })
    for (const x of newData) {
      for (const prop in x) {
        if (prop !== "date") {
          const id = await this.measurements.put({
            date: x.date,
            type: prop,
            uom: measurements.uom[prop],
            unit: x[prop]
          })
        }
      }
    }

    this.plans.clear()
    this.plans.bulkAdd(plans)

    this.on.dataload.fire()
  }

  /*
   * Helper functions
   */
  async measurementAt(date, type, dayRange = 0) {
    let startDate = new Date(date)
    startDate.setDate(startDate.getDate() - dayRange)
    let endDate = new Date(date)
    endDate.setDate(endDate.getDate() + 1)

    let records = await (this.measurements
      .where("[type+date]")
      .between(
        [type, startDate],
        [type, endDate])
      .reverse()
      .toArray())

    // cut results to the equal the day range. This issue was caused by
    // the time part of the dates
    records = records.slice(0, dayRange)

    let sum = records.reduce((a, b) => a + b.unit, 0)
    let avg = (sum / records.length) || 0
    return avg
  }

  async getCurrent(type) {
    // get the rolling average
    let value = await this.measurementAt(new Date(), type, AVERAGE_PERIOD_DAYS)

    // if no data, get the most recent
    if (value == 0) {
      let record = await this.measurements.where("type").equals(type).last()
      value = record.unit
    }

    return value
  }

  async getCurrentPlan() {
    return this.plans.where("status").equals("active").first()
  }
}