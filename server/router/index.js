const convert = require('koa-convert')
const requireDir = require('require-dir')
const Router = require('koa-router')

const config = require('../config')
const routes = requireDir('./routes')

module.exports = function () {
  const router = new Router({ prefix: config.baseApi })
  Object.keys(routes).forEach(name => {
    return routes[name](router)
  })
  return convert.compose([router.routes(), router.allowedMethods()])
}
