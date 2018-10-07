module.exports = function () {
  // 多个中间件组件
  const convert = require('koa-convert')
  // 路由
  const Router = require('koa-router')
  const router = new Router()
  const checkToken = require('../token/checkToken.js')

  /***************************************************************
   * 操作控制器方法
   **************************************************************/
  const userController = require('../controller/user.js')

  /***************************************************************
   * 实现路由
   **************************************************************/
  // 登录
  const loginRouter = new Router()
  loginRouter.post('/user/login', userController.UserLogin)
  // 注册
  const registerRouter = new Router()
  registerRouter.post('/user/register', userController.UserRegister)
  // 获取所有用户
  const allUserRouter = new Router()
  allUserRouter.get('/user/list', checkToken, userController.GetAllUsers)
  // 删除某个用户
  const delUserRouter = new Router()
  delUserRouter.post('/user/delete', checkToken, userController.DelUser)
  // 用户头像上传
  const uploadPicRouter = new Router()
  uploadPicRouter.post('/user/upload', checkToken, userController.UploadPic)

  /***************************************************************
   * 装载子路由方法
   **************************************************************/
  router.use('/api', loginRouter.routes(), loginRouter.allowedMethods())
  router.use('/api', registerRouter.routes(), registerRouter.allowedMethods())
  router.use('/api', allUserRouter.routes(), allUserRouter.allowedMethods())
  router.use('/api', delUserRouter.routes(), delUserRouter.allowedMethods())
  router.use('/api', uploadPicRouter.routes(), uploadPicRouter.allowedMethods())

  /***************************************************************
   * 商品
   **************************************************************/
  const goodsController = require('../controller/goods.js')
  const allGoodsRouter = new Router()
  allGoodsRouter.get('/goods/list', checkToken, goodsController.GetAllGoods)
  router.use('/api', allGoodsRouter.routes(), allGoodsRouter.allowedMethods())

  const getGoodsByIdRouter = new Router()
  getGoodsByIdRouter.get('/goods/get', checkToken, goodsController.GetGoodsById)
  router.use('/api', getGoodsByIdRouter.routes(), getGoodsByIdRouter.allowedMethods())

  const goodsNewAndUpdateRouter = new Router()
  goodsNewAndUpdateRouter.post('/goods/update', checkToken, goodsController.GoodsNewAndUpdate)
  router.use('/api', goodsNewAndUpdateRouter.routes(), goodsNewAndUpdateRouter.allowedMethods())

  const goodsUploadPicRouter = new Router()
  goodsUploadPicRouter.post('/goods/upload', checkToken, goodsController.GoodsUploadPic)
  router.use('/api', goodsUploadPicRouter.routes(), goodsUploadPicRouter.allowedMethods())

  // 加载路由中间件
  return convert.compose([
    router.routes(),
    router.allowedMethods()
  ])
}
