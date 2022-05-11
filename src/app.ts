// import the modules that will be use in here
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import path from 'path'
// admin routes import
import { AdminUsers } from './routes/administration/users'
import { AdminCategories } from './routes/administration/categories'
import { AdminProducts } from './routes/administration/products'
import { AdminOrders } from './routes/administration/orders'
import { AdminOrderProducts } from './routes/administration/orderProducts'
// user routes import
import { Users } from './routes/user/users'
import { Categories } from './routes/user/categories'
import { Products } from './routes/user/products'
import { Orders } from './routes/user/orders'
import { OrderProducts } from './routes/user/orderProducts'
// dashboard routes import
import { Dashboard } from './routes/administration/dashboard'

dotenv.config()

const api: express.Application = express()
const apiHost: string = <string>(process.env.API_HOST as unknown)
const apiPort: number = <number>(process.env.API_PORT as unknown)
const apiBackLog: number = <number>(process.env.API_BACKLOG as unknown)
export const baseUrl: string = `http://${apiHost}:${apiPort}`
const serverOnListen = (): void => {
  console.log('Server is now listening at http://%s:%s', apiHost, apiPort)
}

const corsOptions = {
  origin: 'http://www.google.com',
  optionsSuccessStatus: 200
}

api.use(cors(corsOptions))

// parse application/x-www-form-urlencoded
api.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
api.use(bodyParser.json())

// routes
AdminUsers.initialize(api)
Users.initialize(api)
AdminCategories.initialize(api)
Categories.initialize(api)
AdminProducts.initialize(api)
Products.initialize(api)
AdminOrders.initialize(api)
Orders.initialize(api)
AdminOrderProducts.initialize(api)
OrderProducts.initialize(api)
Dashboard.initialize(api)
api.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'public', 'html', 'error.html'))
})
const apiListen = api.listen(apiPort, apiHost, apiBackLog, serverOnListen)

export default apiListen
