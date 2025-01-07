<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { UserType } from "@/store/types/user";
import { ref, reactive } from 'vue';
import { ElForm, FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { Lock, User } from '@element-plus/icons-vue';
import login from "@/common/api/loginApi";
import { showMsg } from "@/common/ts/tool";

interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

const userStore = useUserStore();
 
//改变用户信息
const changeUserInfo = (userInfo: UserType) => {
  userStore.changeUserInfo(userInfo);
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

const onSubmit = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    const { username, password, remember } = form;
    login({username, password}).then(response => { // 登录
      const {code, data, message} = response;
      if (code === 200) {
        if (remember) {
          localStorage.setItem('token', data.token);
        }
        let userInfo: UserType = {
          name: username,
          role: data.role,
        };
        changeUserInfo(userInfo); // 写入pinia 管理用户信息
        showMsg('登录成功!', 'success');
        router.replace('/home');
      } else {
        showMsg(message, 'error');
      }
    })
  } catch (error) {
    console.error('登录失败', error);
  }
};

</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-container__title">数字化研发平台</div>
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
  </div>
</template>

<style lang="scss">
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .login-container {
      max-width: 300px;
      .login-container__title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
      }
      .login-form {
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
}
</style>