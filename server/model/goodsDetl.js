const db = require('../db')

// 声明Schema
const goodsDetlSchema = db.Schema({
  goodsId: String,
  goods_code: String,
  goods_name: String,
  goods_category: String,
  goods_unit: String,
  goods_spec: String,

  purchase_price: String,
  sales_price: String,
  minimum_price: String,
  inventory_quantity: String,
  goods_color: String,
  goods_size: String,
  remark: String,
  createtime: Date
})

module.exports = db.model('GoodsDetl', goodsDetlSchema)
