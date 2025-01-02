<template>
    <el-result
    icon="error"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
    >
        <template #extra>
            <el-button type="primary" href="/" @click="gotoHome">Back Home</el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">
import router from '@/router';

const gotoHome = () => {
    router.push({ path: '/' });
};
</script>