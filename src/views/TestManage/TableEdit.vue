<template>
  <div class="mainpage">
    <el-dialog v-dialogDrag :title="editTitle" :close-on-click-modal="false" :visible.sync="editVisible">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editVisible: false,
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      },
      editFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      editLoading: false,
      editTitle: ''
    }
  },
  methods: {
    init: function (status, row) {
      if (status === 'add') {
        this.editTitle = '新增'
        this.editForm = {}
      } else {
        this.editTitle = '编辑'
        this.editForm = row
      }
      this.editVisible = true
      this.$nextTick(() => {
        //加载数据
      })
    },
    editSubmit: function () {

    }
  }
}
</script>
