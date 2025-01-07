<template>
  <el-dialog 
    :model-value="visible"
    :title="title"
    :width="width"
    :show-close="false"
    :close-on-click-modal="false"
    :class-name="className"
    @update:modelValue="handleUpdateVisible">
    <span>{{props.content}}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
  
<script setup>
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '500'
    },
    className: {
      type: String,
      default: ''
    }
  });

  const emit = defineEmits(['update:modelValue' , 'close', 'confirm']);
  // 处理 visiable 的更新
  const handleUpdateVisible = (value) => {
    emit('update:modelValue', value);
  };

  // 处理关闭事件
  const handleClose = () => {
    emit('close');
    emit('update:modelValue', false);
  };

  // 处理确认事件
  const handleConfirm = () => {
    emit('confirm');
    emit('update:modelValue', false);
  };
</script>