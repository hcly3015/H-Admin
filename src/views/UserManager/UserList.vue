<template>
  <div class="userlist">
    <!--搜素栏-->
    <el-col :span="24" class="searchbar">
      <el-form :model="searchForm" :inline="true" ref="searchForm">
        <el-row>
          <el-form-item :label="$t('usermanager.username')" prop="username">
            <el-input v-model="searchForm.username" clearable :placeholder="$t('usermanager.username')" style="width:240px;"></el-input>
          </el-form-item>
          <el-form-item :label="$t('usermanager.sex')" prop="sex">
            <el-select v-model="searchForm.sex" clearable :placeholder="$t('common.pleaseselect')" style="width:240px;">
              <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('usermanager.nick')" prop="nick">
            <el-input v-model="searchForm.nick" clearable :placeholder="$t('usermanager.nick')" style="width:240px;"></el-input>
          </el-form-item>
          <el-form-item :label="$t('usermanager.email')" prop="email">
            <el-input v-model="searchForm.email" clearable :placeholder="$t('usermanager.email')" style="width:240px;"></el-input>
          </el-form-item>
          <el-form-item :label="$t('usermanager.createtime')" prop="createtime">
            <el-date-picker v-model="searchForm.createtime" unlink-panels value-format='yyyy-MM-dd MM:hh:ss' type="daterange" align="left" :start-placeholder="$t('usermanager.starttime')" :end-placeholder="$t('usermanager.endtime')" style="width:240px;">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="margin-left:115px;">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch()">{{$t('common.search')}}</el-button>
            <el-button type="info" icon="el-icon-remove-outline" @click="handleReset('searchForm')">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>

    <!--列表-->
    <div class="tablelist">
      <!--工具栏-->
      <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5;">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd"></el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="handleRefresh"></el-button>
      </el-col>
      <!--表格-->
      <el-table :data="tableDatas" border highlight-current-row v-loading="tableLoading" :max-height="tableMaxHeight" ref="table" style="width: 100%">
        <el-table-column prop="avatar" :label="$t('usermanager.headpic')" width="120">
          <template slot-scope="scope">
            <img :src="(scope.row.avatar!==''&&scope.row.avatar!==undefined)?$Config.serverAddress+scope.row.avatar:''" alt="" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column sortable prop="username" :label="$t('usermanager.username')" width="150">
        </el-table-column>
        <el-table-column sortable prop="sex" :label="$t('usermanager.sex')" width="90">
          <template slot-scope="scope">
            <el-tag :type="scope.row.sex === 1 ? 'primary' : 'success'" disable-transitions>{{scope.row.sex===1?$t('common.male'):$t('common.female')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column sortable prop="nick" :label="$t('usermanager.nick')" width="150">
        </el-table-column>
        <el-table-column sortable prop="email" :label="$t('usermanager.email')" width="220">
        </el-table-column>
        <el-table-column sortable prop="createtime" :label="$t('usermanager.createtime')" :formatter="dateFormat" width="180">
        </el-table-column>
        <el-table-column prop="remark" :label="$t('usermanager.remark')">
        </el-table-column>
        <el-table-column fixed="right" :label="$t('usermanager.operation')" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleEdit(scope.$index, scope.row)" type="text" size="small">
              {{$t('common.edit')}}
            </el-button>
            <el-button @click.native.prevent="handleDelete(scope.$index, scope.row)" type="text" size="small">
              {{$t('common.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页栏-->
      <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5;">
        <el-pagination :page-sizes="[15, 30, 50, 60]" :page-size="tablePageSize" :total="tableTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" style="float:right;">
        </el-pagination>
      </el-col>
    </div>

    <!--弹窗操作-->
    <table-edit v-if="editVisible" ref="editDialog" @refreshList="handleRefresh"></table-edit>
  </div>
</template>

<script>
import moment from 'moment/moment'

import axios from '../../axios/axios.js'
import TableEdit from './UserEdit'

export default {
  data () {
    return {
      tableMaxHeight: 500,
      tableLoading: false,
      tablePage: 1,
      tablePageSize: 15,
      tableTotal: 0,
      tableDatas: [],
      editVisible: false,
      sexOptions: [
        {
          value: '1',
          label: this.$t('common.male')
        }, {
          value: '0',
          label: this.$t('common.female')
        }
      ],
      // 搜素表单
      searchForm: {
        username: '',
        sex: '',
        nick: '',
        email: '',
        createtime: ''
      }
    }
  },
  created () {
    this.getAllUsers();
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
    handleSizeChange: function (val) {
      this.tablePageSize = val;
      this.getAllUsers();
    },
    handleCurrentChange: function (val) {
      this.tablePage = val;
      this.getAllUsers();
    },
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
    handleDelete: function (index, row) {
      this.dgConfirmWarning(this.$t('common.tips'), this.$t('common.isdelete')).then(() => {
        axios.userDelete({ id: row._id }).then((response) => {
          if (response.data.success) {
            this.msgSuccess(this.$t('common.success'))
            this.handleRefresh()
          }
        })
      }, () => {
        this.msgInfo('cancel')
      })
    },
    handleSearch: function () {
      this.getAllUsers()
    },
    handleRefresh: function () {
      this.getAllUsers()
    },
    getAllUsers: function () {
      this.tableLoading = true
      var paras = {
        page: this.tablePage,
        pageSize: this.tablePageSize
      }
      var username = this.searchForm.username
      var sex = this.searchForm.sex
      var nick = this.searchForm.nick
      var email = this.searchForm.email
      var createtime = this.searchForm.createtime
      if (username !== '' && username !== null) {
        paras.username = username
      }
      if (sex !== '' && sex !== null) {
        paras.sex = sex
      }
      if (nick !== '' && nick !== null) {
        paras.nick = nick
      }
      if (email !== '' && email !== null) {
        paras.email = email
      }
      if (createtime !== '' && createtime !== null) {
        if (createtime.length > 1) {
          var ctimeStart = createtime[0].substring(0, 10) + " 23:59:59"
          var ctiemEnd = createtime[1].substring(0, 10) + " 23:59:59"
          paras.createtime = ctimeStart + "," + ctiemEnd
        }
      }
      axios.userList(paras).then((response) => {
        this.tableLoading = false
        if (response.data.succsess) {
          this.tableTotal = response.data.total
          this.tableDatas = response.data.result
        } else if (response.status === 401) {
          //不成功跳转回登录页
          this.$router.push('/login')
          //并且清除掉这个token
          this.$store.dispatch('UserLogout')
        }
      })
    },
    //时间格式化
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ""
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
}
</script>
