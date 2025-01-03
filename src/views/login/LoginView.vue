<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { UserType } from "@/store/types/user";
import { ref, reactive } from 'vue';
import { ElForm, ElMessage, FormRules } from 'element-plus';
import type { messageType } from 'element-plus';
import { useRouter } from 'vue-router';
import { Lock, User } from '@element-plus/icons-vue';

const userStore = useUserStore();
const dialogVisible = ref(false);
 
//获取用户信息
// const getUserInfo = () => {
//   const { name, role } = userStore.user;
//   console.log('useUserStore中的user信息', name, role)
// }
 
//改变用户信息
const changeUserInfo = () => {
  let person: UserType = {
    name: "test",
    role: 0,
  };
  userStore.changeUserInfo(person);
  dialogVisible.value = false;
}

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const form = reactive<LoginForm>({
  username: '',
  password: '',
  remember: false,
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const rules = reactive<FormRules<LoginForm>>({
  username: [{ required: true, message: '用户名不能为空!', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空!', trigger: 'blur' }],
});

const router = useRouter();
const showMsg = (msg: string, type: messageType): void => {
  ElMessage({
    message: msg,
    type: type,
    duration: 1000,
  });
}

const onSubmit = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    const { username, remember } = form;
    const response = {code: 200, data:{token:'123456'}};
    if (response.code === 200) {
      if (remember) {
        localStorage.setItem('username', username);
        localStorage.setItem('token', response.data.token);
      }
      showMsg('登录成功!', 'success');
      router.replace('/home');
    } else {
      showMsg('response.message', 'error');
    }
  } catch (error) {
    console.error('登录失败', error);
  }
};

// const handleOpen = () => {
//   dialogVisible.value = true;
// }

const handleClose = () => {
  dialogVisible.value = false;
}
</script>

<template>
  <div class="login-container">
    <el-form
      name="normal_login"
      class="login-form"
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="0"
    >
      <el-form-item prop="username" class="login-form-username">
        <el-input
          v-model="form.username"
          maxlength="11"
          placeholder="请输入用户名"
          :prefix-icon="User"
        />
      </el-form-item>
      <el-form-item prop="password" class="login-form-password">
        <el-input
          v-model="form.password"
          type="password"
          maxlength="11"
          placeholder="请输入密码"
          :prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item class="login-form-checkbox">
        <el-checkbox v-model="form.remember">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item class="login-form-button">
        <el-button type="primary" native-type="submit" class="btn-login" @click.prevent="onSubmit">
          登录
        </el-button>
        <el-button class="btn-register">立即注册!</el-button>
      </el-form-item>
    </el-form>
  </div>

  <el-dialog v-model="dialogVisible" :title="'提示'" width="500" :show-close="false" :close-on-click-modal="false">
    <span>确认要修改用户信息吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="changeUserInfo">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .login-form {
        max-width: 300px;
        .el-form-item__error {
          color: #f56c6c;
          font-size: 12px;
          line-height: 1;
        }
        .btn-login {
            width: 100%;
        }
        .login-form-username, .login-form-password {
          .el-form-item__content {
            height: 50px;
          }
        }
        .btn-register {
          border: none;
          background: none;
          margin: 0;
          padding: 10px 0;
        }
    }
}
</style>