<template>
  <div class="mainlist">
    <!-- 搜索栏 -->
    <!-- <search-bar :pageName="pageName" :searchForm="searchForm" @searchData="searchData"></search-bar> -->

    <!-- 数据网格 -->
    <data-grid :pageName="pageName" :toolbar="gridToolbar" :columns="gridColumns" :operation="gridOperation" :datas="gridDatas" @gridNewData="gridNewData" @gridRefresh="gridRefresh" @gridMethods="gridMethods"></data-grid>

    <!-- 分页 -->
    <pagination :pageName="pageName" :pageTotal="pageTotal" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></pagination>

    <!-- 编辑 -->
    <goods-stock v-if="editVisible" ref="editDialog" @gridRefresh="gridRefresh"></goods-stock>
  </div>
</template>

<script>
import api from '../../api/index.js'

import dataList from './data-list.js'

import SearchBar from '@/components/SearchBar/SearchBar'
import DataGrid from '@/components/DataGrid/DataGrid'
import Pagination from '@/components/Pagination/Pagination'
import GoodsStock from './GoodsStock'

export default {
  data () {
    return {
      pageName: dataList.name,
      searchForm: dataList.search,
      gridToolbar: dataList.grid.toolbar,
      gridColumns: dataList.grid.column,
      gridOperation: dataList.grid.operation,

      pageIndex: 1,
      pageSize: 15,
      pageTotal: 0,
      gridDatas: [],

      editVisible: false
    }
  },
  created () {
    this.getAllGoods()
  },
  components: {
    SearchBar,
    DataGrid,
    Pagination,
    GoodsStock
  },
  methods: {
    getAllGoods (filter) {
      var pageParas = {
        page: this.pageIndex,
        pageSize: this.pageSize
      }
      let paras = Object.assign(pageParas, filter)
      api.goods.goodsListDetl(paras).then(response => {
        if (response.success) {
          this.pageTotal = response.total
          this.gridDatas = response.result
        } else if (response.status === 401) {
          // 不成功跳转回登录页
          this.$router.push('/login')
          // 并且清除掉这个token
          this.$store.dispatch('UserLogout')
        }
      })
    },

    // 搜索栏-搜索
    searchData (forms) {
      var goodscode = forms.goods_code
      var goodsname = forms.goods_name
      var mnemoniccode = forms.mnemonic_code
      var createtime = forms.createtime
      let filter = {}
      if (goodscode !== '' && goodscode !== null) {
        filter.goods_code = goodscode
      }
      if (goodsname !== '' && goodsname !== null) {
        filter.goods_name = goodsname
      }
      if (mnemoniccode !== '' && mnemoniccode !== null) {
        filter.mnemonic_code = mnemoniccode
      }
      if (createtime !== '' && createtime !== null) {
        if (createtime.length > 1) {
          var ctimeStart = createtime[0].substring(0, 10)
          var ctiemEnd = createtime[1].substring(0, 10)
          filter.createtime = ctimeStart + ',' + ctiemEnd
        }
      }
      this.getAllGoods(filter)
    },

    // 分页-下拉选择每页显示时触发事件
    pageSizeChange (size) {
      this.pageSize = size
      this.getAllGoods()
    },
    // 分页-点击页码时触发事件
    currentPageChange (currentPage) {
      this.pageIndex = currentPage
      this.getAllGoods()
    },

    // 网格-新增
    gridNewData () {
      this.editVisible = true
      this.$nextTick(() => {
        this.$refs.editDialog.init(null)
      })
    },
    // 网格-刷新
    gridRefresh () {
      this.getAllGoods()
    },
    // 网格-操作方法事件
    gridMethods (name, index, row) {
      if (name === 'stockNumber') {

      }
      if (name === 'stockRecord') {

      }
    }
  }
}
</script>
