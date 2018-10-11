const db = require('../db')

// 声明Schema
const goodsDetlSchema = db.Schema({
  purchase_price: String,
  sales_price: String,
  minimum_price: String,
  inventory_quantity: String,
  color: String,
  size: String,
  remark: String,
  createtime: Date
})

module.exports = db.model('GoodsDetl', goodsDetlSchema)
