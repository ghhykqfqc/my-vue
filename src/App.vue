<template>
  <!-- 根据 shouldUseLayout 的值决定是否使用 AppLayout布局 -->
  <AppLayout v-if="shouldUseLayout">
      <router-view />
  </AppLayout>
  <!-- 如果不需要布局，则直接渲染路由组件 -->
  <router-view v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/components/AppLayout.vue';

const route = useRoute();
const shouldUseLayout = computed(() => route.meta.useLayout);
</script>

<style scoped lang="scss">

</style>
