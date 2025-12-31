import jwt from 'jsonwebtoken'
export const auth = async (ctx, next) => {
  const token = ctx.headers.authorization?.replace('Bearer ', '')
  if (!token) return ctx.throw(401)
  try {
    ctx.state.user = jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    return ctx.throw(401)
  }
  await next()
}
