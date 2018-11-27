let fs = require('fs')
let readDir = fs.readdirSync('./server/mysql/api') // 开发
// let readDir = fs.readdirSync('./api') // 部署
let obj = {}
let exclude = ['index.js', 'public.js'] // 排除文件
readDir.forEach(function (file) {
  if (file.endsWith('.js') && !exclude.includes(file)) {
    obj[file.replace('.js', '')] = require('./' + file)
  }
})
module.exports = obj
