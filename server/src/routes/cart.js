import Router from '@koa/router'
import { pool } from '../index.js'
import { auth } from '../middleware/auth.js'

export const cartRouter = new Router()

// 获取当前用户购物车
.get('/', auth, async (ctx) => {
  const [rows] = await pool.query(`
    SELECT c.id, c.qty, p.id AS productId, p.name, p.price, p.cover
    FROM cart c
    JOIN product p ON c.productId = p.id
    WHERE c.userId = ?
  `, [ctx.state.user.id])
  ctx.body = rows
})

// 加入购物车
.post('/', auth, async (ctx) => {
  const { productId, qty = 1 } = ctx.request.body
  // 先检查是否已存在
  const [rows] = await pool.query('SELECT id,qty FROM cart WHERE userId=? AND productId=?', [ctx.state.user.id, productId])
  if (rows.length) {
    // 更新数量
    await pool.query('UPDATE cart SET qty=qty+? WHERE id=?', [qty, rows[0].id])
  } else {
    await pool.query('INSERT INTO cart (userId,productId,qty) VALUES (?,?,?)', [ctx.state.user.id, productId, qty])
  }
  ctx.body = { ok: 1 }
})

// 删除单品
.delete('/:id', auth, async (ctx) => {
  await pool.query('DELETE FROM cart WHERE id=? AND userId=?', [ctx.params.id, ctx.state.user.id])
  ctx.body = { ok: 1 }
})
