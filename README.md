# vue2-admin
> 基于vue2+mongodb+koa2+jsonwebtoken的简单后台管理

## 环境配置
本地搭建好环境(node.js，node淘宝镜像，mongodb安装以及配置等等)

``` bash
$ use vue2  (mongodb命令下创建数据库)
$ db.createUser({user:"root",pwd:"hexx123",roles:[{role:"readWrite",db:"vue2"}]})  (mongodb命令下创建用户)
$ db.users.insert({
  "username": "admin",
  "password": "7c4a8d09ca3762af61e59520943dc26494f8941b",
  "nick": "admin123",
  "sex": 1,
  "email": "hcly3015@163.com",
  "avatar": "",
  "remark": "",
  "createtime": ISODate("2018-09-03T10:28:12.481+08:00")
})  (mongodb用户表中插入数据：username:admin，password：123456)
```

## 项目启动
1/初始化项目

``` bash
$ npm install  （建议使用淘宝镜像$ cnpm install）
```

2/启动服务端

``` bash
$ npm run server
```

3/启动项目

``` bash
$ npm run dev
```

## jsonwebtoken（JWT）
JWT能够在HTTP通信过程中，帮助我们进行身份认证。

具体API详见：https://segmentfault.com/a/1190000009494020

Json Web Token是怎么工作的？
1、客户端通过用户名和密码登录服务器；

2、服务端对客户端身份进行验证；

3、服务端对该用户生成Token，返回给客户端；

4、客户端将Token保存到本地浏览器，一般保存到cookie（本文是用sessionStorage，看情况而定）中；

5、客户端发起请求，需要携带该Token；

6、服务端收到请求后，首先验证Token，之后返回数据。服务端不需要保存Token，只需要对Token中携带的信息进行验证即可。无论客户端访问后台的哪台服务器，只要可以通过用户信息的验证即可。


## MongonDB数据库可视化
> 数据库可视化工具:MongoBooster

## 提交日志
``` bash
2018-09-20
1/修改多语言支持，用户图片上传功能。
```

## 效果图
![Alt text](https://github.com/hcly3015/H-Admin/raw/master/screenshot/login.png)
![Alt text](https://github.com/hcly3015/H-Admin/raw/master/screenshot/home.png)
![Alt text](https://github.com/hcly3015/H-Admin/raw/master/screenshot/userlist.png)
![Alt text](https://github.com/hcly3015/H-Admin/raw/master/screenshot/useradd.png)
![Alt text](https://github.com/hcly3015/H-Admin/raw/master/screenshot/useredit.png)
![Alt text](https://github.com/hcly3015/H-Admin/raw/master/screenshot/userlist1.png)
