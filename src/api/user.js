import { fetch } from '../axios/fetch'

// 用户登录
function userLogin (data) {
  return fetch({ url: '/api/user/login', method: 'post', data: data })
}
// 用户注册
function userRegister (data) {
  return fetch({ url: '/api/user/register', method: 'post', data: data })
}
// 用户列表
function userList (params) {
  return fetch({ url: '/api/user/list', method: 'get', params: params })
}
// 用户头像上传
function userUploadPic (data) {
  return fetch({ url: '/api/user/upload', method: 'post', data: data })
}
// 用户删除
function userDelete (data) {
  return fetch({ url: '/api/user/delete', method: 'post', data: data })
}

export default {
  userLogin,
  userRegister,
  userList,
  userUploadPic,
  userDelete
}
