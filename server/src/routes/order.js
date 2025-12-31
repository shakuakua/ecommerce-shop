import Router from '@koa/router'
import { pool } from '../index.js'
import { auth } from '../middleware/auth.js'
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'qq',
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS }
})
export const orderRouter = new Router()
.get('/', auth, async (ctx) => {
  const [rows] = await pool.query('SELECT * FROM `order` ORDER BY id DESC')
  ctx.body = rows
})
.post('/', auth, async (ctx) => {
  const { email } = ctx.request.body;  // 修复解构赋值
  console.log('Email from request body:', email);

  const userId = ctx.state.user.id
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const [cart] = await conn.query('SELECT c.qty, p.price FROM cart c JOIN product p ON c.productId=p.id WHERE c.userId=?', [userId])
    if (!cart.length) return ctx.throw(400, '购物车空')
    let amount = 0; cart.forEach(i => amount += i.qty * i.price)

    const no = 'T' + Date.now()
    const [res] = await conn.query('INSERT INTO `order` (no,userId,amount,email) VALUES (?,?,?,?)', [no, userId, amount, email])
    const orderId = res.insertId

    // 需要获取购物车中商品的详细信息
    const cartItems = await conn.query('SELECT c.productId, c.qty, p.price FROM cart c JOIN product p ON c.productId=p.id WHERE c.userId=?', [userId])
    for (const item of cartItems[0]) {
      await conn.query('INSERT INTO order_item (orderId,productId,qty,price) VALUES (?,?,?,?)', [orderId, item.productId, item.qty, item.price])
    }

    await conn.query('DELETE FROM cart WHERE userId=?', [userId])
    await conn.commit()

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: '订单确认',
      html: `订单号 ${no} 已支付，共￥${amount}`
    })

    ctx.body = { orderId, no, amount }
  } catch (e) {
    await conn.rollback()
    console.error('Order creation error:', e)
    ctx.status = 500
    ctx.body = { error: '订单创建失败' }
  } finally {
    conn.release()
  }
})
.put('/:id', auth, async (ctx) => {
  await pool.query('UPDATE `order` SET status=? WHERE id=?', [ctx.request.body.status, ctx.params.id])
  ctx.body = { ok: 1 }
})
