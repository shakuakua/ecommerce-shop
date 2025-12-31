import 'dotenv/config'
import Koa from 'koa'
import cors from '@koa/cors'
import Router from '@koa/router'
import mysql from 'mysql2/promise'
import bodyParser from 'koa-bodyparser'
import { userRouter } from './routes/user.js'
import { productRouter } from './routes/product.js'
import { orderRouter } from './routes/order.js'
import { cartRouter } from './routes/cart.js'

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
})

const app = new Koa()
app.use(cors())
app.use(bodyParser())
const router = new Router({ prefix: '/api' })
router.use('/user', userRouter.routes())
router.use('/product', productRouter.routes())
router.use('/order', orderRouter.routes())
router.use('/cart', cartRouter.routes())
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`API on ${port}`))
