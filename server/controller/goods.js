/***************************************************************
 * Goods模型
 **************************************************************/
const Goods = require('../model/goods.js')

const findGoodsCount = (paras) => {
  return new Promise((resolve, reject) => {
    Goods.count(paras, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
const findAllGoods = (paras, page, pageSize) => {
  return new Promise((resolve, reject) => {
    Goods.find(paras, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    }).skip(pageSize * (page - 1)).limit(pageSize)
  })
}
const findGoodsById = (id) => {
  return new Promise((resolve, reject) => {
    Goods.findOne({
      _id: id
    }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
const updateGoodsById = (id, obj) => {
  console.log(obj)
  return new Promise((resolve, reject) => {
    Goods.updateOne({
      _id: id
    }, obj, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
const findGoodsByCode = (code) => {
  return new Promise((resolve, reject) => {
    Goods.findOne({
      code
    }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}

/***************************************************************
 * 获取所有商品信息
 **************************************************************/
const GetAllGoods = async (ctx) => {
  let query = ctx.request.query
  let page = Number(query.page)
  let pageSize = Number(query.pageSize)
  let paras = {}
  let goodscode = query.goods_code || ''
  let goodsname = query.goods_name || ''
  let mnemoniccode = query.mnemoniccode || ''
  let createtime = query.createtime || ''
  if (goodscode !== '') {
    paras.goodscode = new RegExp(goodscode)
  }
  if (goodsname !== '') {
    paras.goods_name = new RegExp(goodsname)
  }
  if (mnemoniccode !== '') {
    paras.mnemonic_code = new RegExp(mnemoniccode)
  }
  if (createtime !== '') {
    var ctime = createtime.split(',')
    paras.createtime = {
      '$gte': new Date(ctime[0]),
      '$lte': new Date(ctime[1])
    }
  }
  let total = await findGoodsCount(paras)
  let doc = await findAllGoods(paras, page, pageSize)
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc,
    total: total
  }
}

/***************************************************************
 * 获取单个商品信息
 **************************************************************/
const GetGoodsById = async (ctx) => {
  let goodsId = ctx.request.query.id
  let doc = null
  if (goodsId !== '' && goodsId !== undefined) {
    doc = await findGoodsById(goodsId)
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    data: doc
  }
}

/***************************************************************
 * 商品新增/编辑
 **************************************************************/
const GoodsNewAndUpdate = async (ctx) => {
  var goodsId = ctx.request.body._id
  if (goodsId !== '' && goodsId !== undefined) {
    var obj = {
      goods_code: ctx.request.body.goods_code,
      goods_name: ctx.request.body.goods_name,
      mnemonic_code: ctx.request.body.mnemonic_code,
      purchase_price: ctx.request.body.purchase_price,
      sales_price: ctx.request.body.sales_price,
      minimum_price: ctx.request.body.minimum_price,
      inventory_quantity: ctx.request.body.inventory_quantity,
      goods_color: ctx.request.body.goods_color,
      goods_size: ctx.request.body.goods_size,
      goods_picture: ctx.request.body.goods_picture,
      remark: ctx.request.body.remark
    }
    await updateGoodsById(goodsId, obj)
    console.log('商品信息修改成功')
  } else {
    let goods = new Goods({
      goods_code: ctx.request.body.goods_code,
      goods_name: ctx.request.body.goods_name,
      mnemonic_code: ctx.request.body.mnemonic_code,
      purchase_price: ctx.request.body.purchase_price,
      sales_price: ctx.request.body.sales_price,
      minimum_price: ctx.request.body.minimum_price,
      inventory_quantity: ctx.request.body.inventory_quantity,
      goods_color: ctx.request.body.goods_color,
      goods_size: ctx.request.body.goods_size,
      goods_picture: ctx.request.body.goods_picture,
      remark: ctx.request.body.remark,
      createtime: new Date()
    })
    let doc = await findGoodsByCode(goods.goods_code)
    if (doc) {
      console.log('该商品名已经存在')
      ctx.status = 200
      ctx.body = {
        success: false,
        msg: '该商品名已经存在'
      }
      return
    } else {
      await new Promise((resolve, reject) => {
        goods.save((err) => {
          if (err) {
            reject(err)
          }
          resolve()
        })
      })
      console.log('添加商品成功')
    }
  }
  ctx.status = 200
  ctx.body = {
    success: true
  }
}

/***************************************************************
 * 用户上传头像
 **************************************************************/
const GoodsUploadPic = async (ctx) => {
  ctx.body = {
    success: true,
    msg: ctx.uploadpath.file // JSON.stringify(ctx.request.files)
  }
}

module.exports = {
  GetAllGoods,
  GetGoodsById,
  GoodsNewAndUpdate,
  GoodsUploadPic
}
