<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import { useUserStore } from "@/store/modules/user";
import { UserType } from "@/store/types/user";

const userStore = useUserStore();
 
//获取用户信息
const getUserInfo = () => {
  const { name, age, sex, address } = userStore.user;
  console.log('useUserStore中的user信息', name, age, sex, address)
}
 
//改变用户信息
const changeUserInfo = () => {
  let person: UserType = {
    name: "李四",
    age: 20,
    sex: "男",
    address: "北京",
  };
  userStore.changeUserInfo(person);
}
</script>

<template>
  <div>登录</div>
  <button @click="getUserInfo">获取用户信息</button>
  <button @click="changeUserInfo">改变用户信息</button>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
</style>