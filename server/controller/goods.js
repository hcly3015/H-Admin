/***************************************************************
 * Goods模型
 **************************************************************/
const Goods = require('../model/goods.js')
const GoodsDetl = require('../model/goodsDetl.js')

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
const findGoodsDetlById = (goodsId) => {
  return new Promise((resolve, reject) => {
    GoodsDetl.find({
      goodsId: goodsId
    }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
const updateGoodsById = (id, obj) => {
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
const updateGoodsDetlById = (id, obj) => {
  return new Promise((resolve, reject) => {
    GoodsDetl.updateOne({
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

const findGoodsDetlCount = (paras) => {
  return new Promise((resolve, reject) => {
    GoodsDetl.count(paras, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
const findAllGoodsDetl = (paras, page, pageSize) => {
  return new Promise((resolve, reject) => {
    GoodsDetl.find(paras, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    }).skip(pageSize * (page - 1)).limit(pageSize)
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
  let mnemoniccode = query.mnemonic_code || ''
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
  let docDelt = null
  if (goodsId !== '' && goodsId !== undefined) {
    doc = await findGoodsById(goodsId)
    docDelt = await findGoodsDetlById(goodsId)
  }
  ctx.status = 200
  ctx.body = {
    success: true,
    data: doc,
    detl: docDelt
  }
}

/***************************************************************
 * 商品新增/编辑
 **************************************************************/
const GoodsNewAndUpdate = async (ctx) => {
  let mains = ctx.request.body.main
  let detls = ctx.request.body.detl
  let goodsId = mains._id
  if (goodsId !== '' && goodsId !== undefined) {
    let obj = {
      goods_code: mains.goods_code,
      goods_name: mains.goods_name,
      mnemonic_code: mains.mnemonic_code,
      goods_picture: mains.goods_picture,
      goods_category: mains.goods_category,
      goods_unit: mains.goods_unit,
      goods_spec: mains.goods_spec,
      remark: mains.remark
    }
    await updateGoodsById(goodsId, obj)

    for (let i = 0; i < detls.length; i++) {
      let detlId = detls[i]._id
      let objDetl = {
        goods_code: mains.goods_code,
        goods_name: mains.goods_name,
        goods_category: mains.goods_category,
        goods_unit: mains.goods_unit,
        goods_spec: mains.goods_spec,

        purchase_price: detls[i].purchase_price,
        sales_price: detls[i].sales_price,
        minimum_price: detls[i].minimum_price,
        inventory_quantity: detls[i].inventory_quantity,
        goods_color: detls[i].color,
        goods_size: detls[i].size,
        remark: detls[i].remark
      }
      await updateGoodsDetlById(detlId, objDetl)
    }
    console.log('商品信息修改成功')
  } else {
    let goods = new Goods({
      goods_code: mains.goods_code,
      goods_name: mains.goods_name,
      mnemonic_code: mains.mnemonic_code,
      goods_picture: mains.goods_picture,
      goods_category: mains.goods_category,
      goods_unit: mains.goods_unit,
      goods_spec: mains.goods_spec,
      remark: mains.remark,
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
        for (let i = 0; i < detls.length; i++) {
          let goodsDetl = new GoodsDetl({
            goodsId: goods._id,
            goods_code: mains.goods_code,
            goods_name: mains.goods_name,
            goods_category: mains.goods_category,
            goods_unit: mains.goods_unit,
            goods_spec: mains.goods_spec,

            purchase_price: detls[i].purchase_price,
            sales_price: detls[i].sales_price,
            minimum_price: detls[i].minimum_price,
            inventory_quantity: detls[i].inventory_quantity,
            goods_color: detls[i].goods_color,
            goods_size: detls[i].goods_size,
            remark: detls[i].remark,
            createtime: new Date()
          })
          goodsDetl.save((err) => {
            if (err) {
              let errorMsg = 'goodsDetl:' + err
              reject(errorMsg)
            }
            resolve()
          })
        }

        goods.save((err) => {
          if (err) {
            let errorMsg = 'goods:' + err
            reject(errorMsg)
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

/***************************************************************
 * 获取所有商品信息
 **************************************************************/
const GetAllGoodsDetl = async (ctx) => {
  let query = ctx.request.query
  let page = Number(query.page)
  let pageSize = Number(query.pageSize)
  let paras = {}
  let goodscode = query.goods_code || ''
  let goodsname = query.goods_name || ''
  let mnemoniccode = query.mnemonic_code || ''
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
  let total = await findGoodsDetlCount(paras)
  let doc = await findAllGoodsDetl(paras, page, pageSize)
  ctx.status = 200
  ctx.body = {
    success: true,
    result: doc,
    total: total
  }
}

module.exports = {
  GetAllGoods,
  GetGoodsById,
  GoodsNewAndUpdate,
  GoodsUploadPic,
  GetAllGoodsDetl
}
