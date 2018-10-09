<template>
  <div class="header">
    <div class="logo">
      <span class="big">{{ $Config.siteName }}</span>
      <span class="min">{{ $Config.minSiteMame }}</span>
    </div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
          <span v-if="item.redirect===&quot;noredirect&quot;||index==levelList.length-1" class="no-redirect">{{ $t('router.'+item.meta.title) }}</span>
          <router-link v-else :to="item.redirect||item.path" class="redirect">{{ $t('router.'+item.meta.title) }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="right">
      <span class="header-btn" @click="fullScreenToggle">
        <i class="fa fa-arrows-alt"></i>
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
</template>

<script>
import Screenfull from 'screenfull'

export default {
  data () {
    return {
      userName: 'Administrator',
      userAvatar: '',
      siteName: this.$Config.siteName,
      levelList: null,
      lang: '',
      langName: ''
    }
  },
  components: {

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
    managerBackEnd () {
      this.$router.push({ path: '/goods/goodslist' })
    }
  }
}
</script>
