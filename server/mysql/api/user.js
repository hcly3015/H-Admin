// 公共类
const P = require('./public')

/***************************************************************
 * 登录
 **************************************************************/
const UserLogin = async (ctx) => {
  // 用户名和密码
  let username = ctx.request.body.username
  let password = P.sha1(ctx.request.body.password)
  // 初步验证通过，开始查询数据库
  const connection = await P.mysql.createConnection(P.config.mysqlDB)
  const [rows] = await connection.execute('SELECT * FROM `user` where `username`=?', [username])
  if (rows.length) {
    const userInfo = rows[0]
    if (userInfo.password === password) {
      let ip = P.getClientIP(ctx)
      await connection.execute('UPDATE `user` SET `loginip`=? where `id`=?', [ip, userInfo.id])
      delete userInfo.pass_word

      let token = P.createToken(username)
      ctx.status = 200
      ctx.body = {
        success: true,
        username,
        token,
        avatar: userInfo.avatar,
        createtime: userInfo.createtime
      }
    } else {
      console.log('密码错误' + password)
      ctx.status = 200
      ctx.body = {
        success: false,
        msg: '密码错误'
      }
    }
  } else {
    console.log('用户名不存在')
    ctx.status = 200
    ctx.body = {
      success: false,
      msg: '用户名不存在'
    }
  }
  await connection.end()
}

module.exports = {
  UserLogin
}
