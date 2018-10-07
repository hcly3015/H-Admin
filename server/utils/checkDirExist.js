/**
 * @description 判断文件夹是否存在 如果不存在则创建文件夹
 */
const fs = require('fs')

function checkDirExist (dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

module.exports = checkDirExist
