// 基本配置文件
const config = require('./config')

// mongoose
const mongoose = require('mongoose')
// MongoDB路径
const dbUrl = `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.address}/${config.mongodb.db}`

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('数据库连接失败！')
  } else {
    console.log('数据库连接成功！')
  }
})

module.exports = mongoose
