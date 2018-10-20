<template>
  <div class="mainlist collenting-silver">
    <!-- 头部 -->
    <collecting-silver-header></collecting-silver-header>

    <!-- 内容 -->
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
            <el-button type="success">数量+</el-button>
            <el-button type="success">数量-</el-button>
            <el-button type="warning">折扣</el-button>
            <el-button type="danger">改价</el-button>
            <el-input clearable :placeholder="$t('common.inputcontent')" style="float:right;width:260px;">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="22" class="grid-content-card">
          <el-col :span="6" v-for="(item, index) in gridDatas" :key="index" :offset="0" style="padding-bottom:10px;">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <div class="grid-content">
                <img :src="$Config.serverAddress+item.goods_picture" class="grid-image">
                <div class="grid-content-right">
                  <div class="grid-name">{{ item.goods_name }}</div>
                  <div class="grid-number">库存：{{ item.goods_stock_number }}</div>
                  <el-button @click="sellDetl(item)" type="primary" class="grid-button" size="mini">卖出</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

    <!-- 弹框 -->
    <el-dialog v-dialog-drag :close-on-click-modal="false" :visible.sync="editVisible">
      <div style="padding-bottom:10px;">{{ $t('common.details') }}</div>
      <!-- 表单 -->
      <common-form :pageName="pageName" :formModels="formModels" :formProps="formProps"></common-form>
      <div style="border-top:1px #ccc dashed;"></div>

      <div style="padding-top:30px;">{{ $t('common.color') }}</div>
      <!-- 颜色 -->
      <div style="margin-bottom:10px;border-bottom:1px #ccc dashed;padding-top:15px;padding-bottom:15px;">
        <span style="margin-left:115px;"></span>
        <el-button v-for="(item, index) in detlColorList" :key="index" style="width:100px;">
          {{ item }}
        </el-button>
      </div>

      <div style="padding-top:30px;">{{ $t('common.size') }}</div>
      <!-- 尺码 -->
      <div style="margin-bottom:10px;border-bottom:1px #ccc dashed;padding-top:15px;padding-bottom:15px;">
        <span style="margin-left:115px;"></span>
        <el-button v-for="(item, index) in detlSizeList" :key="index" style="width:100px;">
          {{ item }}
        </el-button>
      </div>

      <div style="padding-top:30px;">{{ $t('common.selected') }}</div>
      <!-- 选择 -->
      <div style="margin-bottom:10px;border-bottom:1px #ccc dashed;padding-top:15px;padding-bottom:15px;">
        <span style="margin-left:115px;">
          <span>黑色，L，10</span>
        </span>
      </div>

      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click.native="handleEditSubmit" :loading="editLoading">{{$t('common.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../../api/index.js'
import Global from '@/components/Global/Global'

import dataEdit from './data-edit.js'

import CommonForm from '@/components/CommonForm/CommonForm'
import CollectingSilverHeader from "@/components/HeaderBar/CollectingSilverHeader"

export default {
  data () {
    let formModels = {}
    let deForms = dataEdit.forms
    deForms.forEach((item, index) => {
      if (item.type === Global.fieldType.string) {
        formModels[item.name] = ''
      }
    })

    return {
      pageIndex: 1,
      pageSize: 50,

      goodsSellNumber: 0,
      gridDatas: [],

      editLoading: false,
      editVisible: false,
      detlDatas: [],

      pageName: dataEdit.name,
      formProps: dataEdit.forms,
      formModels,

      tempGoodsItem: {},
      detlColorList: [],
      detlSizeList: []
    }
  },
  created () {
    this.getAllGoods()
  },
  components: {
    CollectingSilverHeader,
    CommonForm
  },
  methods: {
    getAllGoods (filter) {
      var pageParas = {
        page: this.pageIndex,
        pageSize: this.pageSize
      }
      let that = this
      let paras = Object.assign(pageParas, filter)
      api.goods.goodsList(paras).then(response => {
        if (response.success) {
          this.gridDatas = response.result
        } else if (response.status === 401) {
          // 不成功跳转回登录页
          this.$router.push('/login')
          // 并且清除掉这个token
          this.$store.dispatch('UserLogout')
        }
      }, function (error) {
        that.msgWarning(error.status + ' ' + error.statusText)
      })
    },
    getAllGoodsDetl (filter) {
      var pageParas = {
        page: this.pageIndex,
        pageSize: this.pageSize
      }
      let paras = Object.assign(pageParas, filter)
      api.goods.goodsListDetl(paras).then(response => {
        if (response.success) {
          this.detlDatas = response.result
          this.showDetlDialog()
        } else if (response.status === 401) {
          // 不成功跳转回登录页
          this.$router.push('/login')
          // 并且清除掉这个token
          this.$store.dispatch('UserLogout')
        }
      })
    },
    sellDetl (item) {
      this.tempGoodsItem = item
      this.getAllGoodsDetl()
    },
    showDetlDialog () {
      let dataItem = {}
      for (let i = 0; i < this.gridDatas.length; i++) {
        let goodsItem = this.gridDatas[i]
        if (goodsItem._id === this.tempGoodsItem._id) {
          dataItem = goodsItem
          break
        }
      }

      for (let i = 0; i < this.detlDatas.length; i++) {
        let colorItem = this.detlDatas[i]
        if (this.detlColorList.indexOf(colorItem.goods_color) < 0) {
          this.detlColorList.push(colorItem.goods_color)
        }
        if (this.detlSizeList.indexOf(colorItem.goods_size) < 0) {
          this.detlSizeList.push(colorItem.goods_size)
        }
      }

      this.formModels = dataItem
      this.editVisible = true
    },
    handleEditSubmit () {

    }
  }
}
</script>
