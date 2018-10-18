<template>
  <div class="datagridlist">
    <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5">
      <el-button v-for="(item,index) in toolbar" :key="index" v-if="item==='add'" @click="handleNewData" type="primary" icon="el-icon-plus"></el-button>
      <el-button v-for="(item,index) in toolbar" :key="index" v-if="item==='refresh'" @click="handleRefresh" type="primary" icon="el-icon-refresh"></el-button>
      <el-input clearable :placeholder="$t('common.inputcontent')" style="float:right;width:260px;">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-col>
    <el-table :data="datas" :max-height="gridMaxHeight" v-loading="gridLoading" border highlight-current-row ref="table" style="width: 100%">
      <el-table-column v-for="(item,index) in columns" :key="index" :prop="item.name" :label="$t(pageName.toLowerCase()+'.'+item.name)" :width="item.width">
        <template slot-scope="scope">
          <img v-if="item.template==='img'" :src="(scope.row[item.name]!==null&&scope.row[item.name]!==''&&scope.row[item.name]!==undefined)?$Config.serverAddress+scope.row[item.name]:''" alt="" style="width: 100%;height: 100%">
          <span v-else>{{ scope.row[item.name] }}</span>
        </template>
      </el-table-column>
      <el-table-column v-show="operation.length!==0" fixed="right" :label="$t('common.operation')" width="140">
        <template slot-scope="scope">
          <el-button v-for="(item,index) in operation" :key="index" :type="item.type" @click.native.prevent="handleOperation(item.name, scope.$index, scope.row)" size="small">
            {{$t('common.'+item.name)}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import moment from 'moment/moment'

export default {
  data () {
    return {
      gridMaxHeight: 500,
      gridLoading: false
    }
  },
  props: {
    pageName: {
      type: String
    },
    toolbar: {
      type: Array
    },
    columns: {
      type: Array
    },
    operation: {
      type: Array
    },
    datas: {
      type: Array
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      var that = this
      // 设置表格高度
      that.gridMaxHeight =
        window.innerHeight - that.$refs.table.$el.offsetTop - 50
      // 监听window的resize事件
      window.onresize = function setTableHeight () {
        that.gridMaxHeight =
          window.innerHeight - that.$refs.table.$el.offsetTop - 50
      }
    })
  },
  methods: {
    handleNewData: function () {
      this.$emit('gridNewData')
    },
    handleRefresh: function () {
      this.$emit('gridRefresh')
    },
    handleOperation: function (name, index, row) {
      this.$emit('gridMethods', name, index, row)
    },

    // 时间格式化
    dateFormatter: function (row, column) {
      var date = row[column.property]
      if (date === undefined) {
        return ''
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
