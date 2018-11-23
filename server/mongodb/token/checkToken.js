const jwt = require('jsonwebtoken')

// 检查token是否过期
module.exports = async (ctx, next) => {
  const authorization = ctx.get('Authorization')
  if (authorization === '') {
    ctx.throw(401, 'no token detected in http headerAuthorization')
  }
  const token = authorization.split(' ')[1]
  let tokenContent
  try {
    // 如果token过期或验证失败，将抛出错误
    tokenContent = await jwt.verify(token, 'hexx')
  } catch (err) {
    ctx.throw(401, 'invalid token。' + tokenContent)
  }
  console.log('Token鉴权成功')
  await next()
}
