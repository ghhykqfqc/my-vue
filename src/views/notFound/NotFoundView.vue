<template>
    <el-result
    icon="error"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
    >
        <template #extra>
            <el-button type="primary" href="/" @click="gotoLogin">Back To Login</el-button>
        </template>
    </el-result>
</template>

<script setup lang="ts">
import router from '@/router';

const gotoLogin = () => {
    router.replace({ path: '/' });
};
</script>