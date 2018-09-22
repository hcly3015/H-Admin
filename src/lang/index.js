import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import locale from 'element-ui/lib/locale'

import zhongg from './cn'
import taiwai from './ft'
import english from './en'

import config from '../config'

Vue.use(VueI18n, {
  i18n: function (path, options) {
    let value = i18n.t(path, options)
    if (value !== null && value !== undefined) {
      return value
    }
    return ''
  }
})

const messages = {
  cn: {
    ...zhongg,
    ...zhLocale
  },
  ft: {
    ...taiwai,
    ...twLocale
  },
  en: {
    ...english,
    ...enLocale
  }
}

const i18n = new VueI18n({
  locale: window.sessionStorage.getItem(config.lang) || 'cn',
  messages
})
locale.i18n((key, value) => i18n.t(key, value))

export default i18n
