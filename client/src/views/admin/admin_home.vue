<template>
    <div class="admin-home-container">
      <div class="admin-home">
        <div class="data-box">
          <div>用户总数: {{ userCount }}</div>
          <div>歌曲总数: {{ songCount }}</div>
          <div>歌手数量: {{ singerCount }}</div>
          <div>歌单数量: {{ playlistCount }}</div>
        </div>
        <div class="charts">
          <div id="user-gender-chart" style="width: 400px; height: 300px;"></div>
          <div id="song-type-chart" style="width: 400px; height: 300px;"></div>
          <div id="singer-gender-chart" style="width: 400px; height: 300px;"></div>
          <div id="singer-nationality-chart" style="width: 400px; height: 300px;"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import { fetchStatistics } from "../../apis/adminapi"; // 替换为你的 adminapi.js 路径
  
  export default {
    data() {
      return {
        userCount: 0,
        songCount: 0,
        singerCount: 0,
        playlistCount: 0,
        userGenderRatio: [],
        songTypeDistribution: [],
        singerGenderRatio: [],
        singerNationalityDistribution: [],
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      async fetchData() {
        const data = await fetchStatistics();
        if (data) {
          this.userCount = data.userCount;
          this.songCount = data.songCount;
          this.singerCount = data.singerCount;
          this.playlistCount = data.playlistCount;
          this.userGenderRatio = data.userGenderRatio;
          this.songTypeDistribution = data.songTypeDistribution;
          this.singerGenderRatio = data.singerGenderRatio;
          this.singerNationalityDistribution = data.singerNationalityDistribution;
  
          this.renderCharts();
        }
      },
      renderCharts() {
        // 用户性别比例饼图
        const userGenderChart = echarts.init(document.getElementById('user-gender-chart'));
        userGenderChart.setOption({
          title: { text: '用户性别比例' },
          tooltip: { trigger: 'item' },
          series: [
            {
              name: '性别',
              type: 'pie',
              data: this.userGenderRatio.map(item => ({
                name: item.sex === 0 ? '女' : '男',
                value: item.count,
              })),
            },
          ],
        });
  
        // 歌曲类型分布直方图
        const songTypeChart = echarts.init(document.getElementById('song-type-chart'));
        songTypeChart.setOption({
          title: { text: '歌曲类型分布' },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: this.songTypeDistribution.map(item => item.style) },
          yAxis: { type: 'value' },
          series: [
            {
              name: '歌曲类型',
              type: 'bar',
              data: this.songTypeDistribution.map(item => item.count),
            },
          ],
        });
  
        // 歌手性别比例饼图
        const singerGenderChart = echarts.init(document.getElementById('singer-gender-chart'));
        singerGenderChart.setOption({
          title: { text: '歌手性别比例' },
          tooltip: { trigger: 'item' },
          series: [
            {
              name: '性别',
              type: 'pie',
              data: this.singerGenderRatio.map(item => ({
                name: item.sex === 0 ? '女' : '男',
                value: item.count,
              })),
            },
          ],
        });
  
        // 歌手国籍分布直方图
        const singerNationalityChart = echarts.init(document.getElementById('singer-nationality-chart'));
        singerNationalityChart.setOption({
          title: { text: '歌手国籍分布' },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: this.singerNationalityDistribution.map(item => item.location) },
          yAxis: { type: 'value' },
          series: [
            {
              name: '国籍',
              type: 'bar',
              data: this.singerNationalityDistribution.map(item => item.count),
            },
          ],
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .admin-home {
    padding: 20px;
  }
  
  .data-box {
    margin-top: 20px;
    font-size: 18px;
  }
  
  .charts {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
  }
  
  .admin-home-container {
    max-height: calc(100vh - 64px);
    overflow-y: auto;
  }
  </style>