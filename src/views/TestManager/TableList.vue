<template>
  <div class="mainpage">
    <!--搜素栏-->
    <el-col :span="24" class="searchbar">
      <el-form :model="searchForm" :inline="true" ref="searchForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="searchForm.name" placeholder="姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="searchForm.age" placeholder="年龄" size="small"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="searchForm.sex" placeholder="性别" size="small"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="searchForm.address" placeholder="详细地址" size="small"></el-input>
        </el-form-item>
        <el-form-item style="margin-left:85px;">
          <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
          <el-button type="info" size="small" icon="el-icon-rank" @click="handleReset('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <div class="tablelist">
      <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5;">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd"></el-button>
        <el-button type="primary" size="small" icon="el-icon-refresh" @click="handleRefresh"></el-button>
      </el-col>
      <el-table :data="tableData4" border highlight-current-row ref="table" style="width: 100%" :max-height="tableMaxHeight">
        <el-table-column fixed type="selection" width="50">
        </el-table-column>
        <el-table-column sortable prop="date" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="200">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="200">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="200">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="200">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="200">
        </el-table-column>
        <el-table-column prop="province" label="省份" width="200">
        </el-table-column>
        <el-table-column prop="city" label="市区" width="200">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="address" label="地址" width="200">
        </el-table-column>
        <el-table-column prop="zip" label="邮编">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" type="text" size="small">
              编辑
            </el-button>
            <el-button @click.native.prevent="handleDelete(scope.$index, tableData4)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--弹窗操作-->
    <table-edit v-if="editVisible" ref="editDialog"></table-edit>
  </div>
</template>

<script>
import TableEdit from './TableEdit'

export default {
  data () {
    return {
      tableMaxHeight: 500,
      editVisible: false,
      searchForm: {
        name: '',
        age: '',
        sex: '',
        address: ''
      },
      tableData4: [{
        id: 1,
        date: '2016-05-01',
        name: '王小虎1',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 2,
        date: '2016-05-02',
        name: '王小虎2',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 3,
        date: '2016-05-03',
        name: '王小虎3',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 4,
        date: '2016-05-04',
        name: '王小虎4',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 5,
        date: '2016-05-05',
        name: '王小虎5',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 6,
        date: '2016-05-06',
        name: '王小虎6',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 7,
        date: '2016-05-07',
        name: '王小虎7',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 8,
        date: '2016-05-08',
        name: '王小虎8',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 9,
        date: '2016-05-09',
        name: '王小虎9',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 10,
        date: '2016-05-10',
        name: '王小虎10',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 11,
        date: '2016-05-11',
        name: '王小虎11',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 12,
        date: '2016-05-12',
        name: '王小虎12',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 13,
        date: '2016-05-13',
        name: '王小虎13',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 14,
        date: '2016-05-14',
        name: '王小虎14',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        id: 15,
        date: '2016-05-15',
        name: '王小虎15',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      var that = this
      // 设置表格高度 
      that.tableMaxHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 8
      // 监听window的resize事件
      window.onresize = function setTableHeight () {
        that.tableMaxHeight = window.innerHeight - that.$refs.table.$el.offsetTop - 8
      }
    })
  },
  components: {
    TableEdit
  },
  methods: {
    handleReset: function (formName) {
      this.$refs[formName].resetFields()
    },
    handleAdd: function () {
      this.editVisible = true
      this.$nextTick(() => {
        this.$refs.editDialog.init('add', {})
      })
    },
    handleEdit: function (index, row) {
      this.editVisible = true
      this.$nextTick(() => {
        this.$refs.editDialog.init('edit', row)
      })
    },
    handleRefresh: function () {

    },
    handleDelete: function (index, row) {

    }
  }
}
</script>

<style lang="scss" scoped>
.mainpage {
	display: flex;
	flex-flow: column;
}
</style>
