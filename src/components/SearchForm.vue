<template>
  <el-form :inline="true" class="demo-form-inline">
    <el-form-item label="Id">
      <el-input v-model="form.Id" placeholder="Id" clearable />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="form.Id" placeholder="描述" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="form.status"
        placeholder="状态"
        clearable
      >
        <el-option label="已中断" value="0" />
        <el-option label="执行中" value="1" />
        <el-option label="已结束" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="调度时段">
    <el-col :span="8">
      <el-date-picker
        v-model="form.rangeDate1"
        type="date"
        placeholder="开始日期"
        style="width: 100%"
      />
    </el-col>
    <el-col :span="1" class="text-center">
      <span class="text-gray-500">-</span>
    </el-col>
    <el-col :span="8">
      <el-date-picker
        v-model="form.rangeDate2"
        type="date"
        placeholder="结束日期"
        style="width: 100%"
      />
    </el-col>
  </el-form-item>
    <el-form-item>
      <el-button @click="resetForm"><el-icon><RefreshLeft/></el-icon>重置</el-button>
      <el-button type="primary" @click="onSubmit"><el-icon><Search/></el-icon>查询</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
  import { reactive } from 'vue'
  import { Search, RefreshLeft } from '@element-plus/icons-vue'
  
  const form = reactive({
    Id: '',
    desc: '',
    status: '',
    rangeDate1: '',
    rangeDate2: ''
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }

  const resetForm = () => {
    console.log('resetForm!')
  }
</script>
  
<style lang="scss">
  .demo-form-inline {
    background-color: #fff;
    padding: 18px 10px 0 10px;
    border-radius: 10px;
    .el-form-item__label {
      min-width: 68px;
    }
  }
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }
  
  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }
</style>