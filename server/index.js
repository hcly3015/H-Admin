// Koa
const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()

// 文件操作
const path = require('path')
const checkDirExist = require('./utils/checkDirExist')
const getUploadDirName = require('./utils/getUploadDirName')
const getUploadFileExt = require('./utils/getUploadFileExt')
const getUploadFileName = require('./utils/getUploadFileName')

// 静态路径
const statics = require('koa-static')

// 配置文件
const config = require('./config')

// // bodyparser:该中间件用于post请求的数据
// const bodyParser = require('koa-bodyparser')
// app.use(bodyParser())

// koa-body 代替koa-bodyparser
const koaBody = require('koa-body')
app.use(koaBody({
  multipart: true, // 支持文件上传
  formidable: {
    // 设置上传文件大小最大限制，默认2M
    maxFileSize: 200 * 1024 * 1024,
    uploadDir: path.join(__dirname, 'public/upload'),
    keepExtensions: true,
    onFileBegin: (name, file) => {
      // 获取文件后缀
      const ext = getUploadFileExt(file.name)
      // 最终要保存到的文件夹目录
      const dirName = getUploadDirName()
      const dir = path.join(__dirname, `public/upload/${dirName}`)
      // 检查文件夹是否存在如果不存在则新建文件夹
      checkDirExist(dir)
      // 获取文件名称
      const fileName = getUploadFileName(ext)
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {}
      app.context.uploadpath[name] = `${dirName}/${fileName}`
    }
  }
}))

// 设置静态资源的路径
const staticPath = './public/upload'
app.use(statics(
  path.join(__dirname, staticPath)
))

// 处理跨域的配置
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous']
}))

// 路由
const router = require('./router')
app.use(router())

app.listen(config.port, () => {
  console.log('The server is running at http://127.0.0.1:' + config.port)
})
