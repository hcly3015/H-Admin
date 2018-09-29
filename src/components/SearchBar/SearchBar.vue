<template>
  <div>
    <el-col :span="24" class="searchbar">
      <el-form :model="search" :inline="true" ref="search">
        <el-row>
          <el-form-item v-for="(item,index) in searchList" :key="index" :label="$t(pageName.toLowerCase()+'.'+item.name)" :prop="item.name">
            <el-input v-if="item.type===fieldType.string" :placeholder="$t(pageName.toLowerCase()+'.'+item.name)" clearable style="width:240px;"></el-input>
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
  </div>
</template>

<script>

const fieldType = {
  string: 'string',
  number: 'number',
  datetime: 'datetime'
}

export default {
  data() {
    return {
      fieldType,
      search: {

      }
    }
  },
  props: {
    pageName: {
      type: String
    },
    searchList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
