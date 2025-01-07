<template>
  <div class="common-layout">
    <el-container class="common-container">
      <el-header class="common-header">
        <div class="header-left" :style="{ width: isCollapse ? '64px' : '200px' }">
          <el-icon class="header-left__logo"><icon-menu /></el-icon>
          <div class="header-left__title">DDP</div>
        </div>
        <div class="header-right">
          <el-icon class="header-right__collapse" @click="toggleCollapse">
            <Expand v-if="isCollapse"/>
            <Fold v-else/>
          </el-icon>
          <div class="header-right__account toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <Avatar />
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>账号信息</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>{{ username }}</span>
          </div>
        </div>
      </el-header>
      
      <el-container class="common-wrapper">
        <el-aside class="wrapper-left" :style="{ width: isCollapse ? '64px' : '200px' }">
          <el-scrollbar>
            <el-menu 
            :default-openeds="[filteredRoutes[0]?.path]"
            :default-active="'/home'"
            :collapse="isCollapse"
            :collapse-transition="true"
            :unique-opened="true"
            @select="handleMenuSelect"
            class="wrapper-left__menu"
            >
              <sidebar-item
                v-for="route in filteredRoutes"
                :key="route.path"
                :route="route"
                :base-path="route.path"
              />
            </el-menu>
          </el-scrollbar>
        </el-aside>
        
        <el-container class="wrapper-right">
          <el-main class="wrapper-right__main">
            <!-- 主内容区域 -->
            <slot></slot>
          </el-main>
          <el-footer class="wrapper-right__footer">
            <!-- Footer 内容 -->
            <div>Powered By <span class="note-text">DDP</span> 1.0.0</div>
            <div><span class="note-text">Copyright</span> © <span class="note-text">2015-2025</span></div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Menu as IconMenu, Avatar, Fold, Expand } from '@element-plus/icons-vue'
import { computed, ref } from 'vue';
import SidebarItem from './SideBarItem.vue';
import { showMsg } from '@/common/ts/tool';
import { useUserStore } from "@/store/modules/user";

const isCollapse = ref(false);
const router = useRouter();
const userStore = useUserStore();

// 使用 computed 获取响应式的 username
const username = computed(() => userStore.user.name);

// 根据需要过滤路由，只显示有name、meta信息且useLayout为true（使用layout布局）的路由
const filteredRoutes = computed(() => {
  return router.getRoutes().filter(r => r.name && r.meta && r.meta.useLayout);
});

// 处理侧边导航菜单的选中事件
const handleMenuSelect = (index: string) => {
  router.push(index);
};

// 切换侧边栏的展开和收缩
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

// 退出登录
const loginOut = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
  }
  if (localStorage.getItem('userInfo')) {
    localStorage.removeItem('userInfo');
  }
  if (localStorage.getItem('remember')) {
    localStorage.removeItem('remember');
  }
  showMsg('退出成功!', 'success');
  router.replace({ path: '/' });
};
</script>

<style scoped lang="scss">
.common-container {
  height: 100vh;
  .common-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 0;
    color: #fff;
    .header-left {
      display: flex;
      width: 200px;
      height: inherit;
      align-items: center;
      padding-left: 10px;
      box-sizing: border-box;
      background-color: #3c8dbc;
      overflow: hidden;
      transition: width 0.3s ease;
    }
    .header-right {
      display: flex;
      height: inherit;
      align-items: center;
      flex: 1;
      padding: 0 10px;
      box-sizing: border-box;
      justify-content: space-between;
      background-color: #3c8dbce6;
      .header-right__collapse {
        cursor: pointer;
      }
      .header-right__collapse:hover {
        color: #fff;
      }
      .header-right__account {
        display: flex;
        align-items: center;
      }
    }
  }
  .common-wrapper {
    max-height: calc(100% - 60px);
    .wrapper-left{
      width: 200px;
      transition: width 0.3s ease;
      background-color: #fff;
      .wrapper-left__menu {
        border-right: none;
      }
      .submenu-title {
        opacity: 1;
        visibility: visible;
      }
      .el-menu--collapse {
        .submenu-title {
          opacity: 0;
          visibility: hidden;
        }
      }
    }
    .wrapper-right {
      .wrapper-right__main {
        padding: 20px;
        overflow: auto;
      }
      .wrapper-right__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        color: #888;
        background-color: #f4f4f4;
        .note-text {
          color: #333;
        }
      }
    }
  }
}
</style>
