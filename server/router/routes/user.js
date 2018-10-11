const checkToken = require('../../token/checkToken.js')

const userController = require('../../controller/user.js')

/***************************************************************
 * 商品
 **************************************************************/
module.exports = function (router) {
  // 登录
  router.post('/user/login', userController.UserLogin)

  // 注册
  router.post('/user/register', userController.UserRegister)

  // 获取所有用户
  router.get('/user/list', checkToken, userController.GetAllUsers)

  // 删除某个用户
  router.post('/user/delete', checkToken, userController.DelUser)

  // 上传图片
  router.post('/user/upload', checkToken, userController.UploadPic)
}
