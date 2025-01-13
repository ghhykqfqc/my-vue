<template>
    <el-card class="card-box" shadow="hover">
      <div class="card-left"><icon-menu /></div>
      <div class="card-right">
        <div class="card-right__title">{{props.title}}</div>
        <div class="card-right__content">{{props.content}}</div>
      </div>
    </el-card>
</template>

<script lang="ts" setup>
import { Menu as IconMenu } from '@element-plus/icons-vue'

const props = defineProps({
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: ''
    }
  });
</script>

<style lang="scss">
.card-box {
  margin: 0 10px;
  border-radius: 10px;
  .el-card__body {
    display: flex;
    padding: 20px 10px;
    .card-left {
      width: 50px;
      height: 50px;
      color: $icon-color;
    }
  }
}
</style>