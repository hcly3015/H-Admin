<template>
  <div class="datagridlist">
    <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5">
      <el-button @click="handleNewRow" type="primary" icon="el-icon-plus"></el-button>
    </el-col>
    <el-table :data="datas" v-loading="gridLoading" border highlight-current-row ref="table" style="width: 100%">
      <el-table-column v-for="(item,index) in columns" :key="index" :prop="item.name" :label="$t(pageName.toLowerCase()+'.'+item.name)" :width="item.width">
        <template slot-scope="scope">
          <el-input v-if="item.template==='input'" v-model="scope.row[item.name]" clearable>
          </el-input>
          <el-input v-if="item.template==='inputnumber'" v-model="scope.row[item.name]" type="number" clearable>
          </el-input>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operation')" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click.native.prevent="handleDeleteRow(scope.$index, datas)" size="small">
            {{$t('common.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridLoading: false
    }
  },
  props: {
    pageName: {
      type: String,
      default () {
        return ''
      }
    },
    columns: {
      type: Array
    },
    datas: {
      type: Array
    }
  },
  methods: {
    handleNewRow: function () {
      this.$emit('gridNewRow')
    },
    handleDeleteRow: function (index, rows) {
      rows.splice(index, 1);
    }
  }
}
</script>
