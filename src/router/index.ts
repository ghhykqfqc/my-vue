// src\router\index.ts
 
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
 
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: "登录"
    }
  },
  {
    path: '/home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: {
      title: "首页"
    }
  },
]
 
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
export default router