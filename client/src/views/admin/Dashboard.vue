<template>
  <div class="layout-container">
    <!-- Header -->
    <el-header class="header">
      <div class="header-content">
        <h1 class="title">Music 后台管理</h1>
        <div class="user-name" @click="toggleLogoutBox">{{ username }}</div>
        <div v-if="logoutBoxVisible" class="logout-box">
          <el-button type="danger" @click="logout">退出登录</el-button>
        </div>
      </div>
    </el-header>

    <!-- Sidebar Menu -->
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      style="width: 200px; height: calc(100vh - 64px); position: fixed; bottom: 0; margin-top: 0;"
    >
      <el-menu-item index="1" @click="navigateTo('admin_home')">
        <i class="el-icon-s-home"></i>
        <span slot="title">系统首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="navigateTo('userManagement')">
        <i class="el-icon-user"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="navigateTo('singerManagement')">
        <i class="el-icon-microphone"></i>
        <span slot="title">歌手管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="navigateTo('playlistManagement')">
        <i class="el-icon-headset"></i>
        <span slot="title">歌单管理</span>
      </el-menu-item>
    </el-menu>

    <!-- Content Area -->
    <div class="content-area">
      <!-- 显示 admin_home 组件 -->
      <admin-home></admin-home>
    </div>
  </div>
</template>

<script>
import AdminHome from './admin_home.vue'; // 引入 admin_home 组件

export default {
  components: {
    AdminHome, // 注册组件
  },
  data() {
    return {
      activeMenu: '1',
      username: localStorage.getItem('username') || '用户名称',
      logoutBoxVisible: false,
    };
  },
  methods: {
    navigateTo(page) {
      this.$router.push({ name: page });
    },
    toggleLogoutBox() {
      this.logoutBoxVisible = !this.logoutBoxVisible;
    },
    logout() {
      // 清除本地存储的用户信息
      localStorage.removeItem('username');
      // 跳转到登录页面
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Layout Container */
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f7fa; /* 背景色 */
}

/* Header */
.header {
  background-color: #409eff;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  position: fixed; /* 固定顶栏位置 */
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  transition: background-color 0.3s; /* 添加背景色过渡效果 */
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  position: relative; /* 设置为相对定位 */
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: white;
  transition: color 0.3s; /* 添加字体颜色过渡效果 */
}

.user-name {
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  transition: color 0.3s, transform 0.3s; /* 添加颜色和变换过渡效果 */
}

.user-name:hover {
  color: #f5f7fa;
  transform: scale(1.1); /* 鼠标悬停时放大 */
}

/* Sidebar Menu */
.el-menu-vertical-demo {
  background-color: #f5f7fa;
  border-right: none;
  position: fixed; /* 固定侧边栏位置 */
  top: 64px; /* 顶栏高度 */
  left: 0;
  bottom: 0;
  width: 200px;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.12); /* 添加阴影 */
  transition: background-color 0.3s; /* 添加背景色过渡效果 */
}

.el-menu-item {
  font-size: 16px;
  color: #333;
  transition: background-color 0.3s, color 0.3s, transform 0.3s; /* 添加过渡效果 */
}

.el-menu-item:hover {
  background-color: #e6f7ff;
  color: #409eff;
  transform: translateX(5px); /* 鼠标悬停时向右移动 */
}

.el-menu-item.is-active {
  background-color: #e6f7ff;
  color: #409eff;
  font-weight: bold; /* 选中项加粗 */
}

.el-menu-item i {
  margin-right: 10px;
}

.el-dropdown-item {
  color: black;
}

/* Logout Box */
.logout-box {
  position: absolute;
  top: 100%; /* 相对于 header-content 的顶部 */
  right: 20px; /* 调整位置 */
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1001;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  border-radius: 4px; /* 添加圆角 */
  transition: opacity 0.3s, transform 0.3s; /* 添加过渡效果 */
}

.logout-box:hover {
  opacity: 0.9; /* 鼠标悬停时透明度降低 */
  transform: translateY(-5px); /* 鼠标悬停时向上移动 */
}

.user-dropdown {
  position: relative; /* 确保下拉框相对定位 */
}

/* Content Area */
.content-area {
  margin-top: 64px; /* 顶部栏高度 */
  margin-left: 200px; /* 侧边栏宽度 */
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  height: calc(100vh - 64px); /* 动态计算内容区域高度 */
  overflow-y: auto; /* 添加滚动条 */
}
</style>