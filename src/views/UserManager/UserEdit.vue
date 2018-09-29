<template>
  <div class="useredit">
    <el-dialog v-dialog-drag :title="editTitle" :close-on-click-modal="false" :visible.sync="editVisible">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item :label="$t('usermanager.username')" prop="username" label-width="100px">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usermanager.sex')" label-width="100px">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">{{$t('common.male')}}</el-radio>
            <el-radio class="radio" :label="0">{{$t('common.female')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('usermanager.nick')" prop="nick" label-width="100px">
          <el-input v-model="editForm.nick"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usermanager.email')" prop="email" label-width="100px">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usermanager.createtime')" label-width="100px">
          <el-date-picker v-model="editForm.createtime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('usermanager.remark')" label-width="100px">
          <el-input v-model="editForm.remark"></el-input>
        </el-form-item>
        <el-form-item :label="$t('usermanager.headpic')" label-width="100px">
          <el-upload class="avatar-uploader" action="/api/user/upload" :show-file-list="false" :headers="uploadHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editVisible = false">{{$t('common.cancel')}}</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">{{$t('common.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from '../../axios/axios.js'

export default {
  data() {
    return {
      editVisible: false,
      editLoading: false,
      editTitle: '',
      editForm: {
        _id: '',
        username: '',
        sex: -1,
        nick: '',
        email: '',
        createtime: '',
        avatar: '',
        remark: ''
      },
      editFormRules: {
        username: [
          { required: true, message: this.$t('usermanager.inputname'), trigger: 'blur' }
        ]
      },
      uploadImageUrl: '',
      uploadHeaders: {
        Authorization: "token " + this.$store.state.token
      }
    }
  },
  methods: {
    init: function (status, row) {
      if (status === 'add') {
        this.editTitle = this.$t('common.add')
        this.editForm = {}
      } else {
        this.editTitle = this.$t('common.edit')
        this.editForm = row
        this.uploadImageUrl = row.avatar !== '' ? this.$Config.serverAddress + row.avatar : ''
      }
      this.editVisible = true
      this.$nextTick(() => {
        //加载数据
      })
    },
    editSubmit: function () {
      this.editLoading = true;
      var userObj = this.editForm;
      axios.userRegister(userObj).then((response) => {
        this.editLoading = false
        if (response.data.success) {
          this.msgSuccess(this.$t('common.success'))
          this.editVisible = false
          this.$emit('refreshList')
        }
      })
      this.editLoading = false
    },
    handleAvatarSuccess(res, file) {
      if (res.success) {
        this.editForm.avatar = res.msg
        this.uploadImageUrl = URL.createObjectURL(file.raw)
      }
    },
    beforeAvatarUpload(file, fileList) {
      const isJPG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.msgWarning(this.$t('usermanager.uploadheadtypeerror'))
      }
      if (!isLt2M) {
        this.msgWarning(this.$t('usermanager.uploadheadsizeerror'))
      }
      return isJPG && isLt2M
    }
  }
}
</script>
