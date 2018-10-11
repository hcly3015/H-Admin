import axios from 'axios'

import store from '../store'
import router from '../router'

export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({ timeout: 5000, headers: { 'Content-Type': 'application/json;charset=UTF-8' } })

    instance.interceptors.request.use(
      config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        if (store.state.token) {
          config.headers.Authorization = `token ${store.state.token}`
        }
        return config
      },
      err => {
        return Promise.reject(err)
      }
    )

    instance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        // 默认除了2XX之外的都是错误的，就会走这里
        if (error.response) {
          switch (error.response.status) {
            case 401:
              store.dispatch('UserLogout') // 可能是token过期，清除它
              // 跳转到登录页面
              // 将跳转的路由path作为参数，登录成功后跳转到该路由
              router.replace({
                path: 'login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
          }
        }
        return Promise.reject(error.response)
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res.data)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
