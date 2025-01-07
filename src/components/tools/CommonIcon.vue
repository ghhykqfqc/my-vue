<template>
    <i 
      :class="['iconfont', `icon-${props.name}`, props.className]"
      :style="{ fontSize: props.size, color: props.color }"
    ></i>
</template>
  
<script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: '1em'
    },
    color: {
      type: String,
      default: '#000'
    },
    className: {
      type: String,
      default: ''
    }
  });
</script>