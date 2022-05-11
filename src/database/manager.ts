import { Pool, QueryResult } from 'pg'

import dotenv from 'dotenv'
dotenv.config()
const {
  DATABASE_HOST,
  DATABASE_CATALOG,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_CATALOG_TEST,
  ENV
} = process.env

let client: Pool

console.log('Current runtime environment: ' + ENV)
if (ENV === 'dev') {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_CATALOG,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string)
  })
} else if (ENV === 'test') {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_CATALOG_TEST,
    user: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string)
  })
} else {
  client = new Pool()
}

export const execute = async (
  queryText: string,
  values?: (string | number | boolean)[] | undefined
): Promise<QueryResult<any>> => {
  return new Promise((resolve, reject) => {
    try {
      client.connect().then((connection) => {
        connection.query(queryText, values).then((result) => {
          connection.release()
          resolve(result)
        })
      })
    } catch (catchedError) {
      reject(catchedError)
    }
  })
}
// psql -d egyfwd_db -U egyfwd -W
export default client
