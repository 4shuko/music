import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import admin from '../views/admin/Dashboard.vue';
import AdminHome from '../views/admin/admin_home.vue';

const routes = [
  {
    path: '/',
    redirect: '/login' // 默认重定向到登录页面
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin_home',
    name: 'admin_home',
    component: AdminHome,
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  }
];

const router = createRouter({
  history: createWebHistory(), // 使用 createWebHistory 而不是 Vue Router 3 的 mode: 'history'
  routes
});

export default router;