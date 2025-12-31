import Router from '@koa/router'
import { pool } from '../index.js'
import { auth } from '../middleware/auth.js'
export const productRouter = new Router()
.get('/', async (ctx) => {
  const [rows] = await pool.query('SELECT * FROM product ORDER BY id DESC LIMIT 50')
  ctx.body = rows
})
.post('/', auth, async (ctx) => {
  const [res] = await pool.query('INSERT INTO product SET ?', [ctx.request.body])
  ctx.body = { id: res.insertId }
})
.put('/:id', auth, async (ctx) => {
  await pool.query('UPDATE product SET ? WHERE id=?', [ctx.request.body, ctx.params.id])
  ctx.body = { ok: 1 }
})
.delete('/:id', auth, async (ctx) => {
  await pool.query('DELETE FROM product WHERE id=?', [ctx.params.id])
  ctx.body = { ok: 1 }
})
