// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入日期时间转化器
import moment from 'moment/moment'

// 引入store
import store from './store'

// 引入全局定义
import Config from './config'
// 引入全局Function
import Func from './common/Function'
// 引入dialog可拖拽
import './common/DialogDrag'

// 引入Element-UI
import ElementUI from 'element-ui'

import './theme/green/elementUI/index.css' // 自定义主题样式
import './theme/green/style/index.less' // 自定义主题样式
import './theme/green/style/pages.less' // 自定义主题样式

import './assets/css/style.css'
import './assets/css/font-awesome.min.css'
import './assets/css/less/common.less'
import './assets/css/less/pages.less'

// 语言
import i18n from './lang'

Vue.use(ElementUI)

// 配置
Vue.prototype.$Config = Config
Vue.prototype.$Func = Func

Vue.config.productionTip = false

// 路由判断
router.beforeEach((to, from, next) => {
  // window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName
  if (!sessionStorage.getItem(Config.userInfo) && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  // return moment(value).format(formatString); // value可以是普通日期 20170723
  return moment.unix(value).format(formatString) // 这是时间戳转时间
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.prototype.msgSuccess = function (msg) {
  this.$message({
    message: msg,
    type: 'success'
  })
}
Vue.prototype.msgWarning = function (msg) {
  this.$message({
    message: msg,
    type: 'warning'
  })
}
Vue.prototype.msgInfo = function (msg) {
  this.$message({
    type: 'info',
    message: msg
  })
}

Vue.prototype.dgConfirm = function (caption, msg) {
  var title = caption || this.$t('common.tips')
  var content = msg || this.$t('common.iscontinue')
  return new Promise((resolve, reject) => {
    this.$confirm(content, title, { confirmButtonText: this.$t('common.ok'), cancelButtonText: this.$t('common.cancel') }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
Vue.prototype.dgConfirmSuccess = function (caption, msg) {
  var title = caption || this.$t('common.tips')
  var content = msg || this.$t('common.iscontinue')
  return new Promise((resolve, reject) => {
    this.$confirm(content, title, { confirmButtonText: this.$t('common.ok'), cancelButtonText: this.$t('common.cancel'), type: 'success' }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
Vue.prototype.dgConfirmInfo = function (caption, msg) {
  var title = caption || this.$t('common.tips')
  var content = msg || this.$t('common.iscontinue')
  return new Promise((resolve, reject) => {
    this.$confirm(content, title, { confirmButtonText: this.$t('common.ok'), cancelButtonText: this.$t('common.cancel'), type: 'info' }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
Vue.prototype.dgConfirmWarning = function (caption, msg) {
  var title = caption || this.$t('common.tips')
  var content = msg || this.$t('common.iscontinue')
  return new Promise((resolve, reject) => {
    this.$confirm(content, title, { confirmButtonText: this.$t('common.ok'), cancelButtonText: this.$t('common.cancel'), type: 'warning' }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
Vue.prototype.dgConfirmError = function (caption, msg) {
  var title = caption || this.$t('common.tips')
  var content = msg || this.$t('common.iscontinue')
  return new Promise((resolve, reject) => {
    this.$confirm(content, title, { confirmButtonText: this.$t('common.ok'), cancelButtonText: this.$t('common.cancel'), type: 'error' }).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}
