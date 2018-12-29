<template>
  <div class="login">
    <div class="login-form">
      <div class="login-header">
        <img src="../../../static/images/logo.png" height="100" alt="">
        <p>{{ $Config.siteName }}</p>
      </div>
      <el-select :value="lang" @change="changeLang" style="width:100%;margin-bottom: 18px">
        <el-option v-for="item in langOptions" :key="item.value" :label="item.label" :value="item.value">
          <img v-if="item.value=='cn'" src="/static/images/gq_zhongg.png" alt="">
          <img v-if="item.value=='ft'" src="/static/images/gq_xiang.png" alt="">
          <img v-if="item.value=='en'" src="/static/images/gq_meig.png" alt=""> {{item.label}}
        </el-option>
      </el-select>
      <el-input :placeholder="usernamePlaceHolder" prefix-icon="fa fa-user" v-model="username" style="margin-bottom: 18px">
      </el-input>
      <el-input :placeholder="passwordPlaceHolder" prefix-icon="fa fa-keyboard-o" v-model="password" auto-complete="off" type="password" style="margin-bottom: 18px" @keyup.native.enter="login">
      </el-input>
      <el-button type="primary" :loading="loginLoading" style="width: 100%;margin-bottom: 18px" @click.native="login">{{$t('common.login')}}
      </el-button>
      <!-- <div>
        <el-checkbox v-model="remenber"> Remenber</el-checkbox>
        <a href="javascript:;" style="float: right;color: #3C8DBC;font-size: 14px">Register</a>
      </div> -->
    </div>
  </div>
</template>

<script>
import api from '../../api/index.js'

export default {
  data () {
    return {
      username: 'admin',
      password: '123456',
      remenber: true,
      loginLoading: false,
      usernamePlaceHolder: this.$t('other.inputusername'),
      passwordPlaceHolder: this.$t('other.inputpassword'),
      lang: this.$store.state.lang || 'cn',
      langOptions: [
        { label: this.$t('lang.cn'), value: 'cn' },
        { label: this.$t('lang.ft'), value: 'ft' },
        { label: this.$t('lang.en'), value: 'en' }
      ]
    }
  },
  mounted () {
    this.$i18n.locale = this.lang
    this.$store.dispatch('SetLang', this.lang)
    this.usernamePlaceHolder = this.$t('other.inputusername')
    this.passwordPlaceHolder = this.$t('other.inputpassword')
  },
  methods: {
    // 提交表单
    login () {
      this.loginLoading = true
      if (this.username.length === 0) {
        this.loginLoading = false
        this.msgWarning(this.$t('other.usernameempty'))
        return
      }
      if (this.password.length === 0) {
        this.loginLoading = false
        this.msgWarning(this.$t('other.passwordempty'))
        return
      }
      let loginForm = {
        username: this.username,
        password: this.password
      }
      let that = this
      api.user.userLogin(loginForm).then((response) => {
        if (response.success) {
          this.msgSuccess(this.$t('other.loginsuccess'))
          var userInfo = {
            'name': response.username,
            'avatar': response.avatar,
            'token': response.token,
            'createtime': response.createtime
          }
          this.$store.dispatch('UserLogin', JSON.stringify(userInfo))

          // 跳到目标页
          this.$router.push({ path: '/index' })
        } else {
          this.msgInfo(response.msg)
        }
      }, function (error) {
        that.msgWarning(error.status + ' ' + error.statusText)
      })
      this.loginLoading = false
    },
    changeLang (val) {
      this.lang = val
      this.$i18n.locale = val
      this.$store.dispatch('SetLang', val)
      this.usernamePlaceHolder = this.$t('other.inputusername')
      this.passwordPlaceHolder = this.$t('other.inputpassword')
    }
  }
}
</script>
