<template>
  <div class="dashboard">
    <el-row :gutter="20" style="margin-bottom: 20px; min-width:500px;">
      <el-col :span="24" style="padding-left:0px !important; padding-right: 0px !important;">
        <el-row :gutter="20" class="grid-content-card">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-view grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1100</div>
                  <div>{{$t('other.useraccess')}}</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-message grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">10</div>
                  <div>{{$t('other.systemmessage')}}</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-goods grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">1314</div>
                  <div>{{$t('other.usernumber')}}</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 20px; min-width:500px;">
      <el-col :span="24" style="padding-left:0px !important; padding-right: 0px !important;">
        <el-row :gutter="20" class="user-info-card">
          <el-col :span="24">
            <el-card shadow="hover">
              <div class="user-info">
                <img v-if="this.userAvatar" :src="this.userAvatar" class="user-avator" alt="">
                <div class="user-info-cont">
                  <div class="user-info-name">{{this.userName}}</div>
                  <div>{{role}}</div>
                </div>
              </div>
              <div class="user-info-list">{{$t('other.lastlogintime')}}
                <span>2018-01-01</span>
              </div>
              <div class="user-info-list">{{$t('other.lastloginplace')}}
                <span></span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>


export default {
  data () {
    return {
      userName: 'Administrator',
      userAvatar: ''
    }
  },
  mounted () {
    var userInfo = sessionStorage.getItem(this.$Config.userInfo)
    if (userInfo) {
      userInfo = JSON.parse(userInfo)
      this.userName = userInfo.name || ''
      this.userAvatar = userInfo.avatar !== '' ? this.$Config.serverAddress + userInfo.avatar : ''
    }
  },
  computed: {
    role () {
      return this.userName === 'admin' ? this.$t('common.admin') : this.$t('common.user')
    }
  }
}
</script>
