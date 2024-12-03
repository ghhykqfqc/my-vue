// src\router\index.ts
 
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
 
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home/HomeView.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/LoginView.vue')
  }
]
 
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
export default router