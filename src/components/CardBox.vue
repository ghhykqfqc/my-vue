<template>
    <el-card class="card-box" shadow="hover">
      <div class="card-left"><CommonIcon :name="props.iconName" :size="'50px'" color="inherit"/></div>
      <div class="card-right">
        <div class="card-right__title">{{props.title}}</div>
        <div class="card-right__content">{{props.content}}</div>
      </div>
    </el-card>
</template>

<script lang="ts" setup>
import CommonIcon from '@/components/tools/CommonIcon.vue';

const props = defineProps({
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: 'settings'
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
    justify-content: center;
    .card-left {
      line-height: 50px;
      color: $icon-color;
      margin-right: 5px;
    }
    .card-right {
      text-align: left;
      .card-right__title {
        max-width: 75px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>