<template>
  <div class="mainlist">
    <el-dialog v-dialog-drag :title="editTitle" :close-on-click-modal="false" :visible.sync="editVisible">
      <el-form :model="forms" label-width="115px" ref="forms">
        <el-form-item v-for="(item,index) in editForm" :key="index" :label="$t(pageName.toLowerCase()+'.'+item.name)" :prop="item.name">
          <el-input v-if="item.type===fieldType.string" v-model="forms[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" clearable>
          </el-input>
          <el-input-number v-if="item.type===fieldType.number" v-model="forms[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" clearable>
          </el-input-number>
          <el-input v-if="item.type===fieldType.textarea" type="textarea" v-model="forms[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" clearable>
          </el-input>
          <el-upload v-if="item.type===fieldType.picture" class="avatar-uploader" action="/api/goods/upload" :show-file-list="false" :headers="uploadHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click.native="handleEditSubmit" :loading="editLoading">{{$t('common.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const fieldType = {
  string: 'string',
  number: 'number',
  datetime: 'datetime',
  textarea: 'textarea',
  picture: 'picture'
}

import dataEdit from './data-edit.js'

import axios from '../../axios/axios.js'

export default {
  data () {
    let forms = {}
    let deForms = dataEdit.forms
    deForms.forEach((item, index) => {
      if (item.type === fieldType.string) {
        forms[item.name] = ''
      }
    })

    return {
      pageName: dataEdit.name,
      editForm: dataEdit.forms,

      fieldType,
      forms,
      editTitle: '',
      editVisible: false,
      editLoading: false,

      uploadImageUrl: '',
      uploadHeaders: {
        Authorization: 'token ' + this.$store.state.token
      }
    }
  },
  methods: {
    init: function (goodsId) {
      if (goodsId) {
        this.editVisible = true
        this.$nextTick(() => {
          axios.goodsById({ id: goodsId }).then(response => {
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
        this.forms = {}
        this.uploadImageUrl = ''
      }
    },
    handleEditSubmit: function () {
      let submitForm = this.forms
      axios.goodsNewAndUpdate(submitForm).then(response => {
        this.editLoading = false
        if (response.data.success) {
          this.msgSuccess(this.$t('common.success'))
          this.editVisible = false
          this.$emit('gridRefresh')
        } else {
          this.msgWarning(response.data.msg)
        }
      })
      this.editLoading = false
    },
    beforeAvatarUpload (file, fileList) {
      const isImg = file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.msgWarning(this.$t('common.uploadheadtypeerror'))
      }
      if (!isLt2M) {
        this.msgWarning(this.$t('common.uploadheadsizeerror'))
      }
      return isImg && isLt2M
    },
    handleAvatarSuccess (res, file) {
      if (res.success) {
        this.forms.goods_picture = res.msg
        this.uploadImageUrl = URL.createObjectURL(file.raw)
      }
    }
  }
}
</script>
