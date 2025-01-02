// src\router\index.ts
 
import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
 
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/login/LoginView.vue'),
    meta: {
      title: "登录",
      useLayout: false
    }
  },
  {
    path: '/control',
    name: 'control',
    meta: {
      title: '调度框架',
      iconName: 'settings',
      useLayout: true
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/control/HomeView.vue'),
        meta: {
          title: "首页",
          useLayout: true
        }
      },
      {
        path: '/batchPrepare',
        component: () => import('@/views/control/BatchPrepareView.vue'),
        meta: {
          title: '批次预设',
          useLayout: true
        }
      },
      {
        path: '/batchStatus',
        component: () => import('@/views/control/BatchStatusView.vue'),
        meta: {
          title: '批次状态',
          useLayout: true
        }
      }
    ]
  },
  {
    path: '/ruleEngine',
    name: 'ruleEngine',
    meta: {
      title: '规则引擎',
      iconName: 'settings',
      useLayout: true
    },
    children: [
      {
        path: '/factor',
        component: () => import('@/views/ruleEngine/FactorView.vue'),
        meta: {
          title: '因子表',
          useLayout: true
        }
      },
      {
        path: '/ruleModel',
        component: () => import('@/views/ruleEngine/RuleModelView.vue'),
        meta: {
          title: '规则模板',
          useLayout: true
        }
      },
      {
        path: '/rule',
        component: () => import('@/views/ruleEngine/RuleView.vue'),
        meta: {
          title: '规则配置表',
          useLayout: true
        }
      }
    ]
  },
  {
    path: '/notFound',
    component: () => import('@/views/notFound/NotFoundView.vue'),
    meta: {
      title: "404",
      useLayout: false
    }
  },
  {
    path: '/:pathMatch(.*)*', // 通配符路由 访问不到的页面将重定向到 /notFound
    redirect: '/notFound'
  }
]
 
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
 
export default router