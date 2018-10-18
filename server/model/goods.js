const db = require('../db')

// 声明Schema
const goodsSchema = db.Schema({
  goods_code: String,
  goods_name: String,
  mnemonic_code: String,
  goods_picture: String,
  goods_category: String,
  goods_unit: String,
  goods_spec: String,
  remark: String,
  createtime: Date
})

module.exports = db.model('Goods', goodsSchema)
