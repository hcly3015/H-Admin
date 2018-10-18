import { fetch } from '../axios/fetch.js'

// 获取所有商品信息
function goodsList (params) {
  return fetch({ url: '/api/goods/list', method: 'get', params: params })
}
// 获取单个商品信息
function goodsById (params) {
  return fetch({ url: '/api/goods/get', method: 'get', params: params })
}
// 商品新增/编辑
function goodsNewAndUpdate (params) {
  return fetch({ url: '/api/goods/update', method: 'post', data: params })
}
// 商品图片上传
function goodsUploadPic (params) {
  return fetch({ url: '/api/goods/upload', method: 'post', data: params })
}

// 获取所有商品明细
function goodsListDetl (params) {
  return fetch({ url: '/api/goodsdetl/list', method: 'get', params: params })
}

export default {
  goodsList,
  goodsById,
  goodsNewAndUpdate,
  goodsUploadPic,
  goodsListDetl
}
