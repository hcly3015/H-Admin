import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index/Index'
import Login from '@/views/Login/Login'
import Dashboard from '@/views/Dashboard/Dashboard'

import UserList from '@/views/UserManager/UserList'

import GoodsList from '@/views/GoodsManager/GoodsList'
import GoodsCheck from '@/views/GoodsCheck/GoodsCheck'
import CollectingSilver from '@/views/CollectingSilver/CollectingSilver'

import PermsSetting from '@/views/PermsManager/PermsSetting'
import RoleSetting from '@/views/PermsManager/RoleSetting'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Login,
      meta: {
        title: 'login',
        keepAlive: false
      }
    },
    {
      path: '/index',
      component: Index,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            title: 'dashboard',
            keepAlive: false
          }
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: UserList,
          meta: {
            title: 'userlist',
            keepAlive: true
          }
        },
        {
          path: '/permssetting',
          name: 'permssetting',
          component: PermsSetting,
          meta: {
            title: 'permssetting',
            keepAlive: true
          }
        },
        {
          path: '/rolesetting',
          name: 'rolesetting',
          component: RoleSetting,
          meta: {
            title: 'rolesetting',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/goods',
      component: Index,
      redirect: '/goods/goodslist',
      children: [
        {
          path: 'goodslist',
          name: 'goodslist',
          component: GoodsList,
          meta: {
            title: 'goodslist',
            keepAlive: true
          }
        },
        {
          path: 'goodscheck',
          name: 'goodscheck',
          component: GoodsCheck,
          meta: {
            title: 'goodscheck',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/collectingsilver',
      name: 'collectingsilver',
      component: CollectingSilver,
      meta: {
        title: 'collectingsilver',
        keepAlive: false
      }
    },
    {
      path: '/test',
      component: Index,
      redirect: '/test/tablelist',
      children: [
        {
          path: 'tablelist',
          name: 'tablelist',
          component: () => import('@/views/TestManager/TableList'),
          meta: {
            title: 'tablelist',
            keepAlive: false
          }
        }
      ]
    }
  ]
})
