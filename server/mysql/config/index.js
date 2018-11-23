// mysql数据库配置
const mysqlDB = {
  user: 'root',
  password: '123456',
  host: '148.70.59.54', // 腾讯云
  database: 'hadmin'
}
// 服务地址
const serverAddress = '127.0.0.1'
// 服务端口
const serverPort = '9522'

const baseApi = '/api'

module.exports = {
  serverAddress,
  serverPort,
  mysqlDB,
  baseApi
}
