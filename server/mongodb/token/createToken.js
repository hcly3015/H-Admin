const jwt = require('jsonwebtoken')

// 登录时核对用户名和密码成功后，应用将用户的id作为JWT Payload的一个属性
module.exports = function (userId) {
  const token = jwt.sign({ user_id: userId }, 'hexx', {
    expiresIn: '6000s' // 过期时间设置为6000妙。那么decode这个token的时候得到的过期时间为 : 创建token的时间+设置的值
  })
  return token
}
