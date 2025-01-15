<template>
  <el-row>
    <el-col :span="6">
      <el-statistic :value="outputValueArray[0]">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            任务数量
            <el-icon style="margin-left: 4px" :size="12">
              <Top />
            </el-icon>
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic :value="outputValueArray[1]">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            调度次数
            <el-icon style="margin-left: 4px" :size="12">
              <Top />
            </el-icon>
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic :value="outputValueArray[2]">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            执行器数量
            <el-icon style="margin-left: 4px" :size="12">
              <Bottom />
            </el-icon>
          </div>
        </template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="调度日志数量" :value="outputValueArray[3]">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <ChatLineRound />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Bottom, Top } from '@element-plus/icons-vue'

const initNumArray = ref([0, 0, 0, 0]);
const outputValueArray = useTransition(initNumArray, {
  duration: 1000,
});
initNumArray.value = [268500, 138, 172000, 562];
</script>

<style lang="scss">
.el-col {
  text-align: center;
}
.el-statistic__head {
  font-size: 14px;
  color: #303133;
  .el-icon {
    color: #409eff;
  }
}
</style>