<template>
  <div class="mainlist collenting-silver">
    <!-- 头部 -->
    <collecting-silver-header></collecting-silver-header>

    <el-container style="margin-top:50px;">
      <el-aside class="left-container" width="280px">
        <el-row class="left-header">
          <el-col :span="24" class="header-container">
            <div class="flex-row align-items-center" style="height:100%;">
              <span>{{ $t('goodsmanager.salestime') }}：</span>
              <span>2018-10-10 12:12:30</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="left-content">
          <el-col :span="24" v-for="(o, index) in 3" :key="index" class="sell-container">
            <div class="flex-row flex-justify-content-space-between align-items-center">
              <span>我的名称&nbsp;[颜色，尺码]</span>
              <el-button type="text">删除</el-button>
            </div>
            <div class="line-height-30 flex-row flex-justify-content-space-between">
              <span>
                111201
              </span>
              <span>
                2
              </span>
            </div>
            <div class="line-height-30 flex-row flex-justify-content-space-between">
              <span>
                ￥100
              </span>
              <span>
                ￥200
              </span>
            </div>
          </el-col>
        </el-row>
        <el-row class="left-footer">
          <el-col :span="24" class="footer-container">
            <div class="line-height-30 flex-row flex-justify-content-space-between">
              <div>{{ $t('goodsmanager.total') }}</div>
              <div>￥100.00</div>
            </div>
            <div class="line-height-30 flex-row flex-justify-content-space-between">
              <span>{{ $t('goodsmanager.rebate') }}</span>
              <span>100%</span>
            </div>
            <div class="line-height-30 flex-row flex-justify-content-space-between">
              <span style="color:#18BC9C;">{{ $t('goodsmanager.discount') }}</span>
              <span style="color:#18BC9C;">￥10.00</span>
            </div>
            <div class="line-height-30 flex-row flex-justify-content-space-between">
              <span style="color:red;">{{ $t('goodsmanager.receivable') }}</span>
              <span style="color:red;">￥100.00</span>
            </div>
            <div class="flex-row flex-justify-content-space-between" style="margin-top:8px;">
              <el-button type="danger" style="width:100%;">{{ $t('goodsmanager.selectmember') }}</el-button>
              <el-button type="danger" style="width:100%;">{{ $t('goodsmanager.balance') }}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-aside>
      <el-main class="main-container">
        <el-row class="main-header">
          <el-col :span="24">
            <el-button type="primary" plain>数量+</el-button>
            <el-button type="primary" plain>数量-</el-button>
            <el-button type="primary" plain>折扣</el-button>
            <el-button type="primary" plain>改价</el-button>
            <el-input clearable :placeholder="$t('common.inputcontent')" style="float:right;width:260px;">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="22" class="grid-content-card">
          <el-col :span="6" v-for="(o, index) in 10" :key="index" :offset="0" style="padding-bottom:10px;">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <div class="grid-content">
                <img src="http://127.0.0.1:9521/20180920/15374320508347630.png" class="grid-image">
                <div class="grid-content-right">
                  <div class="grid-name">我的名称</div>
                  <div class="grid-number">库存：10</div>
                  <el-button type="primary" class="grid-button" size="mini">卖出</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CollectingSilverHeader from "@/components/HeaderBar/CollectingSilverHeader"

export default {
  data () {
    return {
      goodsSellNumber: 0
    }
  },
  components: {
    CollectingSilverHeader
  }
}
</script>
