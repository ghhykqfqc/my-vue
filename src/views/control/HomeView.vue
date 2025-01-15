<script setup lang="ts">
import CardBox from '@/components/CardBox.vue';
import DataStatistic from '@/components/DataStatistic.vue';
import PageHeader from '@/components/PageHeader.vue';
</script>

<template>
  <!-- <div class="page-title">首页</div> -->
  <PageHeader :title="'首页'"/>
  <el-row class="content-title row-gap"><span class="content-title-bar"></span>数据统计</el-row>
  <DataStatistic/>
  <el-row class="content-title row-gap"><span class="content-title-bar"></span>快速访问</el-row>
  <el-row>
    <el-col :span="6">
      <CardBox :title="'任务状态'" :content="'任务状态表格总览'" :iconName="'taskStatus'"/>
    </el-col>
    <el-col :span="6">
      <CardBox :title="'批次状态'" :content="'批次状态表格总览'" :iconName="'batchStatus'"/>
    </el-col>
    <el-col :span="6">
      <CardBox :title="'流程属性'" :content="'流程属性表格总览'" :iconName="'flowAttr'"/>
    </el-col>
    <el-col :span="6">
      <CardBox :title="'调度日志'" :content="'调度日志表格总览'" :iconName="'log'"/>
    </el-col>
  </el-row>
</template>

<style scoped>
.row-gap {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>