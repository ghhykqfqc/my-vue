<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Menu as IconMenu, Message, Setting, Avatar, Fold, Expand } from '@element-plus/icons-vue'
import { ref } from 'vue';

const isCollapse = ref(true);
const router = useRouter();

// 处理侧边导航菜单的选中事件
const handleMenuSelect = (index: string) => {
  router.push(index);
};

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<!-- <template>
  <div id="app">
    <router-view></router-view>
  </div>
</template> -->
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
            <Fold v-show="!isCollapse"/>
            <Expand v-show="isCollapse"/>
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
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Admin</span>
          </div>
        </div>
      </el-header>
      
      <el-container class="common-wrapper">
        <el-aside class="wrapper-left" :width="isCollapse ? '64px' : '200px'">
          <el-scrollbar>
            <el-menu 
            :default-openeds="['1', '3']"
            :collapse="isCollapse"
            :collapse-transition="true"
            @select="handleMenuSelect"
            class="wrapper-left__menu"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon><message /></el-icon>
                  <span class="submenu-title">Navigator One</span>
                </template>
                <el-menu-item index="1-1">Option 1</el-menu-item>
                <el-menu-item index="1-2">Option 2</el-menu-item>
                <el-menu-item index="1-3">Option 3</el-menu-item>
                <el-sub-menu index="1-4">
                  <template #title>Option4</template>
                  <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-sub-menu index="2">
                <template #title>
                  <el-icon><icon-menu /></el-icon>
                  <span class="submenu-title">Navigator Two</span>
                </template>
                <el-menu-item index="2-1">Option 1</el-menu-item>
                <el-menu-item index="2-2">Option 2</el-menu-item>
                <el-menu-item index="2-3">Option 3</el-menu-item>
                <el-sub-menu index="2-4">
                  <template #title>Option 4</template>
                  <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><setting /></el-icon>
                  <span class="submenu-title">Navigator Three</span>
                </template>
                <el-menu-item index="3-1">Option 1</el-menu-item>
                <el-menu-item index="3-2">Option 2</el-menu-item>
                <el-menu-item index="3-3">Option 3</el-menu-item>
                <el-sub-menu index="3-4">
                  <template #title>Option 4</template>
                  <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                </el-sub-menu>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        
        <el-container class="wrapper-right">
          <el-main class="wrapper-right__main">
            <!-- 主内容区域 -->
            <router-view></router-view>
          </el-main>
          <el-footer class="wrapper-right__footer">
            <!-- Footer 内容 -->
            <div>Footer</div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-container {
  height: 100vh;
  .common-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 0;
    .header-left {
      display: flex;
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
        text-align: center;
        padding: 10px 0;
        background-color: #f4f4f4;
      }
    }
  }
}
</style>
