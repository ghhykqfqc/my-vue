<template>
    <el-page-header v-if="tags.length > 0" :icon="ArrowLeft" @back="handleBack">
      <template #content>
        <div class="flex gap-2">
            <el-tag
            v-for="(tag, index) in tags"
            :key="'primary-' + tag.path.split('/').pop() + '-' + index"
            closable
            type="primary"
            @click="clickTag(tag.path)"
            @close="handleClose(tag.path, $event)"
            size="large"
            class="tag-item"
            >
            {{ tag.name }}
            </el-tag>
        </div>
      </template>
    <div class="page-title"> {{ props.title }} </div>
  </el-page-header>
  <div v-else class="page-title"> {{ props.title }} </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTagsStore } from '@/store/modules/tags';
import { ArrowLeft } from '@element-plus/icons-vue';

// 获取当前路由信息
const route = useRoute()
const router = useRouter();

// 获取pinia标签存储
const store = useTagsStore();

// 计算属性获取标签列表
const tags = computed(() => store.getTags());

// 定义 clickTag 方法
const clickTag = (path: string) => {
  router.push(path);
};

// 处理标签关闭事件
const handleClose = (path: string, event: MouseEvent) => {
  event.stopPropagation(); // 阻止事件冒泡
  const index = tags.value.findIndex(tag => tag.path === path)
  tags.value.splice(index, 1)
  store.removeTag(path)
  if (tags.value.length > 0) { // 如果关闭的是最后一个标签，跳转到新的最后一个标签
    const lastTagPath = tags.value[tags.value.length - 1].path;
    router.push(lastTagPath);
  } else { // 如果标签列表为空，可以跳转到首页或其他默认页面
    router.replace('/home');
  }
}

// 处理返回事件
const handleBack = () => {
  const currentTag = route.path.split('/').pop()?.toString() || '';
  if (currentTag === 'home') {
    return;
  }
  router.go(-1);
};

// 监听路由变化，动态更新标签列表
watch(route, () => {
    const path = route.path || '';
    const name = (route.meta.title as string) || '';

    if (name && path) {
        const exists = tags.value.some(tag => tag.path === path); // 检查标签是否已存在
        if (!exists) { // 如果不存在，则添加到标签列表，并设置为 'primary' 类型
            store.addTag({ name: name, path: path, type: 'primary' })
            } else { // 如果已存在，确保它在 'primary' 标签的最后
            store.removeTag(path)
            store.addTag({ name: name, path: path, type: 'primary' })
        }
    }
}, { immediate: true })

const props = defineProps({
    title: {
      type: String,
      default: ''
    }
});


</script>

<style lang="scss">
.el-page-header__main {
  margin-top: 10px;
  padding-top: 10px;
}
.tag-item {
  margin-right: 10px;
  cursor: pointer;
}
.tag-item:nth-last-child(1) {
  margin-right: 0;
}
.tag-item:not(:last-child) {
  background-color: #fff;
}
.tag-item:hover {
  background-color: rgb(197.7, 225.9, 255);
}
.el-page-header__breadcrumb {
    margin-bottom: 10px;
}
.el-page-header__back:hover {
    color: #409EFF;
}
</style>