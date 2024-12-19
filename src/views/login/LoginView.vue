<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useUserStore } from "@/store/modules/user";
import { UserType } from "@/store/types/user";
import { ref } from 'vue';

const userStore = useUserStore();
const dialogVisible = ref(false);
 
//获取用户信息
const getUserInfo = () => {
  const { name, role } = userStore.user;
  console.log('useUserStore中的user信息', name, role)
}
 
//改变用户信息
const changeUserInfo = () => {
  let person: UserType = {
    name: "test",
    role: 0,
  };
  userStore.changeUserInfo(person);
  dialogVisible.value = false;
}

const handleOpen = () => {
  dialogVisible.value = true;
}

const handleClose = () => {
  dialogVisible.value = false;
}
</script>

<template>
  <div>登录</div>
  <el-button @click="getUserInfo">获取用户信息</el-button>
  <el-button @click="handleOpen">改变用户信息</el-button>
  <HelloWorld msg="Vite + Vue" />

  <el-dialog v-model="dialogVisible" :title="'提示'" width="500" :show-close="false" :close-on-click-modal="false">
    <span>确认要修改用户信息吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="changeUserInfo">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
</style>