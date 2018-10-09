<template>
  <div class="main">
    <div class="header">
      <div class="logo">
        <span class="big">{{ $Config.siteName }}</span>
        <span class="min">{{ $Config.minSiteMame }}</span>
      </div>
      <span class="header-btn" @click="hiddenSidebar">
        <div class="icon-left">
          <i class="el-icon-back"></i>
        </div>
      </span>
      <span class="header-btn" @click="toggleSidebar">
        <i class="fa fa-navicon"></i>
      </span>
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
            <span v-if="item.redirect===&quot;noredirect&quot;||index==levelList.length-1" class="no-redirect">{{ $t('router.'+item.meta.title) }}</span>
            <router-link v-else :to="item.redirect||item.path" class="redirect">{{ $t('router.'+item.meta.title) }}</router-link>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
      <div class="right">
        <span class="header-btn" @click="collectingSilver">
          <i class="el-icon-mobile-phone"></i>
        </span>

        <span class="header-btn" @click="fullScreenToggle">
          <i class="fa fa-arrows-alt"></i>
        </span>
        <span class="header-btn">
          <el-badge :value="3" class="badge">
            <i class="el-icon-bell"></i>
          </el-badge>
        </span>
        <el-dropdown>
          <span class="header-btn">
            <span>{{langName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="changeLang('cn')">
              {{$t('lang.cn')}}</el-dropdown-item>
            <el-dropdown-item @click.native="changeLang('ft')">
              {{$t('lang.ft')}}</el-dropdown-item>
            <el-dropdown-item @click.native="changeLang('en')">
              {{$t('lang.en')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="header-btn">
            <img v-if="this.userAvatar" :src="this.userAvatar" /> {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/personal')">
              <i style="padding-right: 8px" class="fa fa-cog"></i>{{$t('user.personal')}}</el-dropdown-item>
            <el-dropdown-item @click.native="logout">
              <i style="padding-right: 8px" class="fa fa-sign-out"></i>{{$t('user.loginout')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="app">
      <div class="aside">
        <div class="menus">
          <el-menu unique-opened router background-color="#3d4a5c" text-color="#fff" class="menu" :default-active="$route.path" :collapse="isCollapse">
            <MenuTree :menuData="this.menus" :langData="this.lang"></MenuTree>
          </el-menu>
        </div>
      </div>
      <div class="app-body">
        <NavBar id="nav-bar" style="position: fixed;top: 0;"></NavBar>
        <div id="mainContainer" class="main-container" style="margin-top: 88px;">
          <!--<transition name="fade">-->
          <router-view></router-view>
          <!--</transition>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Screenfull from 'screenfull'
import NavBar from './NavBar'

// import Bus from '../../common/bus'
import Menu from '../../menu'

import MenuTree from '@/components/MenuTree/MenuTree'

export default {
  data () {
    return {
      userName: 'Administrator',
      userAvatar: '',
      siteName: this.$Config.siteName,
      isCollapse: false,
      menus: Menu,
      levelList: null,
      lang: '',
      langName: ''
    }
  },
  components: {
    NavBar,
    'MenuTree': MenuTree
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  mounted () {
    var userInfo = this.$store.state.userInfo
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userName = userInfo.name || ''
      this.userAvatar = userInfo.avatar !== '' ? this.$Config.serverAddress + userInfo.avatar : ''
    }
    var lng = this.$store.state.lang
    this.changeLang(lng)
  },
  computed: {

  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name.trim().toLocaleLowerCase() !== 'Dashboard'.toLocaleLowerCase()) {
        matched = [{ path: '/dashboard', meta: { title: 'home' } }].concat(matched)
      }
      this.levelList = matched
    },
    NavBarWidth () {
      let navBar = document.getElementById('nav-bar')
      if (!navBar) return
      let sidebarClose = document.body.classList.contains('sidebar-close')
      if (sidebarClose) {
        navBar.style.width = '100%'
        return
      }
      if (this.isCollapse) navBar.style.width = 'calc(100% - 64px)'
      else navBar.style.width = 'calc(100% - 230px)'
    },
    toggleGrayMode () {
      document.body.classList.toggle('gray-mode')
    },
    // 隐藏
    hiddenSidebar (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-close')
      this.NavBarWidth()
    },
    // 折叠
    toggleSidebar (e) {
      e.preventDefault()
      if (this.isCollapse) {
        document.body.classList.remove('sidebar-toggle')
        this.siteName = this.$Config.siteName
        this.isCollapse = false
      } else {
        document.body.classList.add('sidebar-toggle')
        this.isCollapse = true
      }
      this.NavBarWidth()
    },
    // 全屏
    fullScreenToggle () {
      if (!Screenfull.enabled) {
        this.msgWarning(this.$t('other.notfullscreen'))
        return false
      }
      Screenfull.toggle()
    },
    // 退出
    logout () {
      this.$store.dispatch('UserLogout')
      this.$router.push({ path: '/login' })
    },
    // 切换语言
    changeLang (val) {
      this.langName = this.$t('lang.' + val)
      this.lang = val
      this.$store.dispatch('SetLang', val)
      this.$i18n.locale = val
    },

    // 前台收银
    collectingSilver(){
      this.$router.push({ path: '/collectingsilver' })
    }
  }
}
</script>
