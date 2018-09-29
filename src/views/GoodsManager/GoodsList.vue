<template>
  <div class="goodslist">
    <search-bar :searchList="searchList" :pageName="pageName"></search-bar>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar/SearchBar'

import pageData from './data.js'

export default {
  data() {
    return {
      pageName: pageData.name,
      searchList: pageData.search
    }
  },
  components: {
    SearchBar
  }
}
</script>
