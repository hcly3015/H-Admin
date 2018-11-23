const db = require('../db')

// 声明Schema
const userSchema = db.Schema({
  username: String,
  password: String,
  nick: String,
  sex: Number,
  email: String,
  avatar: String,
  remark: String,
  createtime: Date,
  token: String
})

module.exports = db.model('User', userSchema)
