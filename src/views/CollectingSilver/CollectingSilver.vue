<template>
  <div class="mainlist collenting-silver">
    <!-- 头部 -->
    <collecting-silver-header></collecting-silver-header>

    <el-container style="margin-top:50px;">
      <el-aside style="background-color:#d3dce6;">

      </el-aside>
      <el-main style="background-color:#e9eef3;">
        <el-row>
          <el-col :span="24" style="padding: 5px 12px;background-color: #fff;border:1px solid #ebeef5">
            <el-input style="float:right;width:200px;"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="22" class="grid-content-card">
          <el-col :span="6" v-for="(o, index) in 10" :key="index" :offset="0" style="padding-bottom:10px;">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <div class="grid-content">
                <img src="http://127.0.0.1:8091/20180920/15374320508347630.png" class="grid-image">
                <div class="grid-content-right">
                  <div class="grid-name">我的名称</div>
                  <div class="grid-number">库存：10</div>
                  <el-button type="primary" class="grid-button" size="mini">卖出</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CollectingSilverHeader from "@/components/HeaderBar/CollectingSilverHeader"

export default {
  data () {
    return {

    }
  },
  components: {
    CollectingSilverHeader
  }
}
</script>
