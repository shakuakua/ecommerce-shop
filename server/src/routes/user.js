import Router from '@koa/router'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../index.js'
export const userRouter = new Router()
.post('/register', async (ctx) => {
  const { email, password } = ctx.request.body
  const hash = bcrypt.hashSync(password, 10)
  const [res] = await pool.query('INSERT INTO user (email, password) VALUES (?,?)', [email, hash])
  ctx.body = { id: res.insertId, email }
})
.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body
  const [rows] = await pool.query('SELECT * FROM user WHERE email=?', [email])
  if (!rows.length || !bcrypt.compareSync(password, rows[0].password)) return ctx.throw(401)
  const token = jwt.sign({ id: rows[0].id, role: rows[0].role }, process.env.JWT_SECRET)
  ctx.body = { token, user: { id: rows[0].id, email: rows[0].email, role: rows[0].role } }
})
