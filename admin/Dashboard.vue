<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="card-header">用户总数</div>
          <div class="card-content">14</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-header">歌曲总数</div>
          <div class="card-content">111</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-header">歌手数量</div>
          <div class="card-content">42</div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class="card-header">歌单数量</div>
          <div class="card-content">84</div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts">
      <el-col :span="12">
        <el-card>
          <div class="chart-title">用户性别比例</div>
          <!-- 这里可以插入图表组件 -->
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="chart-title">��曲类型分布</div>
          <!-- 这里可以插入图表组件 -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      // 这里可以定义数据
    };
  },
  methods: {
    // 这里可以定义方法
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.card-header {
  font-size: 16px;
  font-weight: bold;
}
.card-content {
  font-size: 24px;
  text-align: center;
  margin-top: 10px;
}
.charts {
  margin-top: 20px;
}
.chart-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style> 