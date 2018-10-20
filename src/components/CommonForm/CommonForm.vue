<template>
  <div>
    <el-form :model="formModels" :inline="true" label-width="115px" ref="formModels">
      <el-form-item v-for="(item,index) in formProps" :key="index" :label="$t(pageName.toLowerCase()+'.'+item.name)" :prop="item.name">
        <el-input v-if="item.type===fieldType.string" v-model="formModels[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" :readonly="item.readonly" clearable :style="'width:'+item.width+'px'">
        </el-input>
        <el-input-number v-if="item.type===fieldType.number" v-model="formModels[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" :readonly="item.readonly" clearable :style="'width:'+item.width+'px'">
        </el-input-number>
        <el-input v-if="item.type===fieldType.textarea" type="textarea" v-model="formModels[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" :readonly="item.readonly" clearable :style="'width:'+item.width+'px'">
        </el-input>
        <el-upload v-if="item.type===fieldType.picture" class="avatar-uploader" action="/api/goods/upload" :show-file-list="false" :headers="uploadHeaders" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Global from '@/components/Global/Global'

export default {
  data () {
    return {
      fieldType: Global.fieldType,

      uploadHeaders: {
        Authorization: 'token ' + this.$store.state.token
      }
    }
  },
  props: {
    pageName: {
      type: String,
      default: ''
    },
    formModels: {
      type: Object,
      default () {
        return {}
      }
    },
    formProps: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    uploadImageUrl () {
      let imagUrl = this.formModels.goods_picture
      return (imagUrl !== '' && imagUrl !== undefined) ? this.$Config.serverAddress + imagUrl : ''
    }
  },
  methods: {
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
        this.formModels.goods_picture = res.msg
        this.uploadImageUrl = URL.createObjectURL(file.raw)
      }
    }
  }
}
</script>
