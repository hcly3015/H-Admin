<template>
  <div>
    <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5">
      <el-pagination :page-sizes="[15, 30, 50, 60]" :page-size="pageSize" :total="pageTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" style="float:right">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    pageName: {
      type: String
    },
    pageSize: {
      type: Number
    },
    pageTotal: {
      type: Number
    }
  },
  methods: {
    handleSizeChange: function (size) {
      this.$emit('pageSizeChange', size)
    },
    handleCurrentChange: function (currentPage) {
      this.$emit('currentPageChange', currentPage)
    }
  }
}
</script>
