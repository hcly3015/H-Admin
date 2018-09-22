import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config'

Vue.use(Vuex)

// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
const state = {
  lang: window.sessionStorage.getItem(config.lang) || 'cn',
  token: window.sessionStorage.getItem(config.userToken),
  userInfo: window.sessionStorage.getItem(config.userInfo)
}

const mutations = {
  SETLANG: (state, data) => {
    state.lang = data
    window.sessionStorage.setItem(config.lang, data)
  },
  USERLOGIN: (state, data) => {
    // 更改token的值
    let usertoken = JSON.parse(data).token
    state.token = usertoken
    state.userInfo = data
    window.sessionStorage.setItem(config.userInfo, data)
    window.sessionStorage.setItem(config.userToken, usertoken)
  },
  USERREGISTER: (state, data) => {
    let userData = data
    console.log(userData)
  },
  USERLOGOUT: (state) => {
    // 登出时清除token
    state.token = null
    state.userInfo = null
    window.sessionStorage.removeItem(config.lang)
    window.sessionStorage.removeItem(config.userInfo)
    window.sessionStorage.removeItem(config.userToken)
  }
}

const actions = {
  SetLang ({ commit }, data) {
    commit('SETLANG', data)
  },
  UserLogin ({ commit }, data) {
    commit('USERLOGIN', data)
  },
  UserRegister ({ commit }, data) {
    commit('USERREGISTER', data)
  },
  UserLogout ({ commit }) {
    commit('USERLOGOUT')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
