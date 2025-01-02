<template>
    <el-sub-menu v-if="props.route?.children" :index="basePath">
      <template #title>
        <el-icon><CommonIcon :name="props.route?.meta.iconName" color="inherit"/></el-icon>
        <span>{{ props.route?.meta.title }}</span>
      </template>
      <sidebar-item
        v-for="child in props.route?.children"
        :key="child.path"
        :route="child"
        :base-path="child.path"
      />
    </el-sub-menu>
    <el-menu-item v-else :index="basePath">
      {{props.route?.meta.title}}
    </el-menu-item>
</template>
  
<script setup lang="ts">
  import SidebarItem from './SideBarItem.vue';
  import CommonIcon from '@/components/commonIcon.vue';
  
  const props = defineProps({
    route: Object,
    basePath: String
  });
</script>