<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-container-left">
        <img src="@/assets/login.png" alt="login" />
      </div>
      <div class="login-container-right">
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
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { UserType } from "@/store/types/user";
import { ref, reactive, onMounted } from 'vue';
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

// 自动登录函数
const autoLogin = async () => {
  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  if (token && userInfo) { // 假设 token 和 userInfo存在即有效，可根据需求调用接口验证 token
    const userInfoObj = JSON.parse(userInfo);
    form.username = userInfoObj.name;
    form.remember = true;
    form.password = '123456'; // 默认自动登录密码为 123456 其实仅显示所用
    userStore.changeUserInfo(userInfoObj); // 更新 Pinia 中的用户信息
    showMsg('自动登录成功!', 'success');
    setTimeout(() => {
      router.replace('/home');
    }, 1000);
  } else {
    showMsg('自动登录失败，请手动登录!', 'error');
  }
};

// 组件挂载时检查 token
onMounted(() => {
  const remember = localStorage.getItem('remember');
  if (remember === 'true') {
    autoLogin();
  }
});

const onSubmit = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    const { username, password, remember } = form;
    login({username, password}).then(response => { // 登录
      const {code, data, message} = response;
      if (code === 200) {
        const userInfo: UserType = {
          name: username,
          role: data.role,
        };
        if (remember) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          localStorage.setItem('remember', 'true');
        }
        userStore.changeUserInfo(userInfo); // 写入pinia 管理用户信息
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

<style lang="scss">
.login-page{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: aliceblue;
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #ebeef5;
    border-radius: 16px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 50px;
    .login-container-left {
        width: 375px;
        img {
            width: 100%;
        }
    }
    .login-container-right {
        min-width: 275px;
        max-width: 300px;
        .login-container__title {
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .login-form {
            .el-input__wrapper {
              font-size: 16px;
            }
            .login-form-checkbox {
              .el-checkbox {
                color: #333;
              }
              .el-checkbox:hover {
                color: $border-color-hover;
                .el-checkbox__inner {
                  border-color: $border-color-hover;
                }
              }
              .el-checkbox__label {
                font-size: 16px;
              }
              .el-checkbox__inner {
                border-color: #333;
              }
              .el-checkbox__input.is-checked .el-checkbox__inner {
                border-color: $border-color-hover;
              }
            }
            .el-form-item__error {
              color: #f56c6c;
              font-size: 14px;
            }
            .btn-login {
                width: 100%;
            }
            .login-form-username, .login-form-password {
              .el-form-item__content {
                height: 60px;
              }
            }
            .btn-register {
              border: none;
              background: none;
              margin: 0;
              padding: 10px 0;
              color: #333;
              font-size: 16px;
            }
            .btn-register:hover {
              color: $border-color-hover;
            }
        }
    }
  }
}
</style>