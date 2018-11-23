// 加密
const sha1 = require('sha1')

// 创建Token类
const createToken = require('../token/createToken.js')

// mysql
const mysql = require('mysql2/promise')

// 配置
const config = require('../config')

// 公用：获取客户端IP
function getClientIP (ctx) {
  let req = ctx.request
  let ip = ctx.ip ||
    req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress || ''
  let arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/)
  return arr ? arr[0] : ''
}

module.exports = {
  sha1,
  createToken,
  mysql,
  config,
  getClientIP
}
