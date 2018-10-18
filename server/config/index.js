// MongoDB配置
const mongodb = {
  username: 'root',
  password: 'hexx123',
  address: 'localhost:27017',
  db: 'vue2'
}
// 端口
const port = '9521'

const baseApi = '/api'

module.exports = {
  port,
  mongodb,
  baseApi
}
