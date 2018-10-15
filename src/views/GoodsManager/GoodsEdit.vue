<template>
  <div class="mainlist">
    <el-dialog v-dialog-drag :title="editTitle" :close-on-click-modal="false" :visible.sync="editVisible">
      <!-- 表单 -->
      <common-form :pageName="pageName" :formModels="formModels" :formProps="formProps"></common-form>

      <!-- 明细网格 -->
      <data-grid-row-edit :pageName="pageName" :columns="gridColumns" :datas="gridDatas" @gridNewRow="gridNewRow"></data-grid-row-edit>

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
import DataGridRowEdit from '@/components/DataGridRowEdit/DataGridRowEdit'

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
      pageName: dataEdit.name,
      formProps: dataEdit.forms,

      formModels,

      editTitle: '',
      editVisible: false,
      editLoading: false,

      gridColumns: dataEdit.grid.column,
      gridDatas: []
    }
  },
  components: {
    CommonForm,
    DataGridRowEdit
  },
  methods: {
    init: function (goodsId) {
      if (goodsId) {
        this.editVisible = true
        this.editTitle = this.$t('common.edit')
        this.$nextTick(() => {
          api.goods.goodsById({ id: goodsId }).then(response => {
            if (response.data.success) {
              this.forms = response.data.data
              this.uploadImageUrl =
                response.data.data.goods_picture !== ''
                  ? this.$Config.serverAddress +
                  response.data.data.goods_picture
                  : ''
            } else if (response.status === 401) {
              // 不成功跳转回登录页
              this.$router.push('/login')
              // 并且清除掉这个token
              this.$store.dispatch('UserLogout')
            }
          })
        })
      } else {
        this.editVisible = true
        this.editTitle = this.$t('common.add')
        this.forms = {}
        this.uploadImageUrl = ''
      }
    },
    handleEditSubmit: function () {
      let submitForm = this.formModels
      let submitDetl = this.gridDatas
      let data = {
        main: submitForm,
        delt: submitDetl
      }
      api.goods.goodsNewAndUpdate(data).then(response => {
        this.editLoading = false
        if (response.success) {
          this.msgSuccess(this.$t('common.success'))
          this.editVisible = false
          this.$emit('gridRefresh')
        } else {
          this.msgWarning(response.msg)
        }
      })
      this.editLoading = false
    },
    gridNewRow () {
      let column = dataEdit.grid.column
      let colItem = {}
      for (let col in column) {
        let field = column[col]['name']
        colItem[field] = ''
      }
      this.gridDatas.push(colItem)
    }
  }
}
</script>
