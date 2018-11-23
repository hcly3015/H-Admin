// 加密
const sha1 = require('sha1')

// 创建Token类
const createToken = require('../token/createToken.js')

/***************************************************************
 * User模型
 **************************************************************/
const User = require('../model/user.js')

/***************************************************************
 * 更新用户信息
 **************************************************************/
const updateUser = (userId, userObj) => {
  return new Promise((resolve, reject) => {
    User.update({ _id: userId }, userObj, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
/***************************************************************
 * 根据用户名查找用户
 **************************************************************/
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
/***************************************************************
 * 找到用户总数目
 **************************************************************/
const findUserCount = (paras) => {
  return new Promise((resolve, reject) => {
    User.count(paras, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    })
  })
}
/***************************************************************
 * 找到所有用户
 **************************************************************/
const findAllUsers = (paras, page, pageSize) => {
  return new Promise((resolve, reject) => {
    User.find(paras, (err, doc) => {
      if (err) {
        reject(err)
      }
      resolve(doc)
    }).skip(pageSize * (page - 1)).limit(pageSize)
  })
}
/***************************************************************
 * 删除某个用户
 **************************************************************/
const delUser = function (id) {
  return new Promise((resolve, reject) => {
    User.findOneAndRemove({ _id: id }, err => {
      if (err) {
        reject(err)
      }
      console.log('删除用户成功')
      resolve()
    })
  })
}

/***************************************************************
 * 登录
 **************************************************************/
const UserLogin = async (ctx) => {
  // 用户名和密码
  let username = ctx.request.body.username
  let password = sha1(ctx.request.body.password)
  let doc = await findUser(username)
  if (!doc) {
    console.log('用户名不存在')
    ctx.status = 200
    ctx.body = {
      success: false,
      msg: '用户名不存在'
    }
  } else if (doc.password === password) {
    console.log('登录成功')
    // 生成一个新的token,并存到数据库
    let token = createToken(username)
    doc.token = token
    await new Promise((resolve, reject) => {
      doc.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200
    ctx.body = {
      success: true,
      username,
      token,
      avatar: doc.avatar,
      createtime: doc.createtime
    }
  } else {
    console.log('密码错误' + password)
    ctx.status = 200
    ctx.body = {
      success: false,
      msg: '密码错误'
    }
  }
}
/***************************************************************
 * 注册
 **************************************************************/
const UserRegister = async (ctx) => {
  var userId = ctx.request.body._id
  if (userId !== '' && userId !== undefined) {
    var userObj = {
      username: ctx.request.body.username,
      sex: ctx.request.body.sex,
      nick: ctx.request.body.nick,
      email: ctx.request.body.email,
      remark: ctx.request.body.remark,
      avatar: ctx.request.body.avatar
    }
    await updateUser(userId, userObj)
    console.log('修改成功')
  } else {
    let user = new User({
      id: ctx.request.body.id,
      username: ctx.request.body.username,
      password: sha1(ctx.request.body.password || '123456'), // 加密
      sex: ctx.request.body.sex,
      nick: ctx.request.body.nick,
      email: ctx.request.body.email,
      createtime: ctx.request.body.createtime,
      avatar: ctx.request.body.avatar,
      remark: ctx.request.body.remark,
      token: createToken(this.username) // 创建token并存入数据库
    })
    let doc = await findUser(user.username)
    if (doc) {
      console.log('用户名已经存在')
      ctx.status = 200
      ctx.body = {
        success: false
      }
    } else {
      await new Promise((resolve, reject) => {
        user.save((err) => {
          if (err) {
            reject(err)
          }
          resolve()
        })
      })
      console.log('注册成功')
    }
  }
  ctx.status = 200
  ctx.body = {
    success: true
  }
}
/***************************************************************
 * 获得所有用户信息
 **************************************************************/
const GetAllUsers = async (ctx) => {
  // 查询所有用户信息
  let query = ctx.request.query
  let page = Number(query.page)
  let pageSize = Number(query.pageSize)
  var paras = {}
  var username = query.username || ''
  var sex = query.sex || ''
  var nick = query.nick || ''
  var email = query.email || ''
  var createtime = query.createtime || ''
  if (username !== '') { paras.username = new RegExp(username) }
  if (sex !== '') { paras.sex = sex }
  if (nick !== '') { paras.username = new RegExp(nick) }
  if (email !== '') { paras.email = email }
  if (createtime !== '') {
    var ctime = createtime.split(',')
    paras.createtime = { '$gte': new Date(ctime[0]), '$lte': new Date(ctime[1]) }
  }
  let total = await findUserCount(paras)
  let doc = await findAllUsers(paras, page, pageSize)
  ctx.status = 200
  ctx.body = {
    succsess: true,
    result: doc,
    total: total
  }
}
/***************************************************************
 * 删除某个用户
 **************************************************************/
const DelUser = async (ctx) => {
  // 拿到要删除的用户id
  let userId = ctx.request.body.id
  if (userId !== '' && userId !== undefined) {
    await delUser(userId)
  }
  ctx.status = 200
  ctx.body = {
    success: true
  }
}

/***************************************************************
 * 用户上传头像
 **************************************************************/
const UploadPic = async (ctx) => {
  ctx.body = {
    success: true,
    msg: ctx.uploadpath.file // JSON.stringify(ctx.request.files)
  }
}

module.exports = {
  UserLogin,
  UserRegister,
  GetAllUsers,
  DelUser,
  UploadPic
}
