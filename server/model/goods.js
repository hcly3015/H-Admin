const db = require('../db')

// 声明Schema
const goodsSchema = db.Schema({
  goods_code: String,
  goods_name: String,
  mnemonic_code: String,
  purchase_price: String,
  sales_price: String,
  minimum_price: String,
  inventory_quantity: String,
  goods_color: String,
  goods_size: String,
  goods_picture: String,
  remark: String,
  createtime: Date
})

module.exports = db.model('Goods', goodsSchema)
