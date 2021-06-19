/* Database */
import Dexie from 'dexie'

import data from './measurements'

export const db = new Dexie('gains')

db.version(1).stores({
  measurements: "++id, date"
})

// load latest data
db.open()
db.measurements
