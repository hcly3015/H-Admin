const checkToken = require('../../token/checkToken.js')

const goodsController = require('../../controller/goods.js')

/***************************************************************
 * 商品
 **************************************************************/
module.exports = function (router) {
  // 获取所有商品
  router.get('/goods/list', checkToken, goodsController.GetAllGoods)

  // 根据ID获取商品
  router.get('/goods/get', checkToken, goodsController.GetGoodsById)

  // 新增/修改商品
  router.post('/goods/update', checkToken, goodsController.GoodsNewAndUpdate)

  // 上传图片
  router.post('/goods/upload', checkToken, goodsController.GoodsUploadPic)
}
