<template>
  <div>
    <el-col :span="24" class="searchbar">
      <el-form :model="forms" :inline="true" ref="forms">
        <el-row>
          <el-form-item v-for="(item,index) in searchForm" :key="index" :label="$t(pageName.toLowerCase()+'.'+item.name)" :prop="item.name">
            <el-input v-if="item.type===fieldType.string" v-model="forms[item.name]" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" clearable style="width:240px"></el-input>
            <el-date-picker v-if="item.type===fieldType.datetime" v-model="forms[item.name]" unlink-panels value-format='yyyy-MM-dd' type="daterange" align="left" :start-placeholder="$t('common.starttime')" :end-placeholder="$t('common.endtime')" style="width:240px;">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="margin-left:115px">
            <el-button @click="handleSearchData" type="primary" icon="el-icon-search">{{$t('common.search')}}</el-button>
            <el-button @click="handleResetData" type="info" icon="el-icon-remove-outline">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import Global from '@/components/Global/Global'

export default {
  data () {
    let forms = {}
    let deForms = this.searchForm
    deForms.forEach((item, index) => {
      if (item.type === Global.fieldType.string) {
        forms[item.name] = ''
      }
    })

    return {
      fieldType: Global.fieldType,
      forms
    }
  },
  props: {
    pageName: {
      type: String
    },
    searchForm: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    handleSearchData: function () {
      this.$emit('searchData', this.forms)
    },
    handleResetData: function () {
      this.$refs['forms'].resetFields()
    }
  }
}
</script>
