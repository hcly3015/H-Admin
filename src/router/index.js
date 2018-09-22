import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/Index/Index'
import Login from '@/views/Login/Login'
import Dashboard from '@/views/Dashboard/Dashboard'

import UserList from '@/views/UserManage/UserList'

import PermsList from '@/views/PermsManage/PermsList'
import RoleList from '@/views/PermsManage/RoleList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'login',
        keepAlive: false
      }
    },
    {
      path: '/',
      component: Index,
      redirect: '/dashboard',
      meta: {
        title: 'home',
        keepAlive: false
      }
    },
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: {
            title: 'home',
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
          path: '/permslist',
          name: 'permslist',
          component: PermsList,
          meta: {
            title: 'permslist',
            keepAlive: true
          }
        },
        {
          path: '/rolelist',
          name: 'rolelist',
          component: RoleList,
          meta: {
            title: 'rolelist',
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/test',
      component: Index,
      redirect: '/test/tablelist',
      children: [
        {
          path: 'tablelist',
          name: 'tablelist',
          component: () => import('@/views/TestManage/TableList'),
          meta: {
            title: 'tablelist',
            keepAlive: false
          }
        }
      ]
    }
  ]
})
