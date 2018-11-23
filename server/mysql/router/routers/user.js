// const checkToken = require('../../token/checkToken.js')

const api = require('../../api/index')

/***************************************************************
 * 用户
 **************************************************************/
module.exports = function (router) {
  // 登录
  router.post('/user/login', api.user.UserLogin)
}
