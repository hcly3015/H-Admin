<template>
  <div class="mainlist">
    <!-- 搜索栏 -->
    <!-- <search-bar :pageName="pageName" :searchForm="searchForm" @searchData="searchData"></search-bar> -->

    <!-- 数据网格 -->
    <data-grid :pageName="pageName" :toolbar="gridToolbar" :columns="gridColumn" :operation="gridOperation" :datas="gridDatas" @gridNewData="gridNewData" @gridRefresh="gridRefresh" @gridMethods="gridMethods"></data-grid>

    <!-- 分页 -->
    <pagination :pageName="pageName" :pageTotal="pageTotal" @pageSizeChange="pageSizeChange" @currentPageChange="currentPageChange"></pagination>

    <!-- 编辑 -->
    <goods-edit v-if="editVisible" ref="editDialog" @gridRefresh="gridRefresh"></goods-edit>
  </div>
</template>

<script>
import dataList from './data-list.js'

import SearchBar from '@/components/SearchBar/SearchBar'
import DataGrid from '@/components/DataGrid/DataGrid'
import Pagination from '@/components/Pagination/Pagination'
import GoodsEdit from './GoodsEdit'

import axios from '../../axios/axios.js'

export default {
  data () {
    return {
      pageName: dataList.name,
      searchForm: dataList.search,
      gridToolbar: dataList.grid.toolbar,
      gridColumn: dataList.grid.column,
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
    GoodsEdit
  },
  methods: {
    getAllGoods (filter) {
      var pageParas = {
        page: this.pageIndex,
        pageSize: this.pageSize
      }
      let paras = Object.assign(pageParas, filter)
      axios.goodsList(paras).then(response => {
        if (response.data.success) {
          this.pageTotal = response.data.total
          this.gridDatas = response.data.result
        } else if (response.status === 401) {
          //不成功跳转回登录页
          this.$router.push('/login')
          //并且清除掉这个token
          this.$store.dispatch('UserLogout')
        }
      })
    },

    // 搜索栏-搜索
    searchData (forms) {
      var goods_code = forms.goods_code
      var goods_name = forms.goods_name
      var mnemonic_code = forms.mnemonic_code
      let filter = {}
      if (goods_code !== '' && goods_code !== null) {
        filter.goods_code = goods_code
      }
      if (goods_name !== '' && goods_name !== null) {
        filter.goods_name = goods_name
      }
      if (mnemonic_code !== '' && mnemonic_code !== null) {
        filter.mnemonic_code = mnemonic_code
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
      if (name === 'edit') {
        this.editVisible = true
        this.$nextTick(() => {
          this.$refs.editDialog.init(row._id)
        })
      }
      if (name === 'delete') {
        this.dgConfirmWarning(
          this.$t('common.tips'),
          this.$t('common.isdelete')
        ).then(
          () => {
            // 执行删除
            this.msgSuccess(this.$t('common.success'))
            this.gridRefresh()
          },
          () => {
            this.msgInfo('cancel')
          }
        )
      }
    }
  }
}
</script>
