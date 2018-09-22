<template>
  <div>
    <template v-for="value in this.menuData">
      <el-submenu :index="value.path" :key="value.path" v-if="value.children">
        <template slot="title">
          <i :class="value.icon"></i>
          <span slot="title" v-if="langData==='cn'">{{value.cn_title}}</span>
          <span slot="title" v-if="langData==='ft'">{{value.ft_title}}</span>
          <span slot="title" v-if="langData==='en'">{{value.en_title}}</span>
        </template>
        <MenuTree :menuData="value.children" :langData="langData"></MenuTree>
      </el-submenu>
      <el-menu-item :index="value.path" :key="value.path" v-else>
        <i :class="value.icon"></i>
        <span slot="title" v-if="langData==='cn'">{{value.cn_title}}</span>
        <span slot="title" v-if="langData==='ft'">{{value.ft_title}}</span>
        <span slot="title" v-if="langData==='en'">{{value.en_title}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  props: { ['menuData']: Array, 'langData': String },
  name: 'MenuTree'
}
</script>
