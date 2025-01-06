// mock/login.js
import Mock from 'mockjs';
import apiConfig from '@/config/apiConfig';

// 使用 Mock 模拟登录接口
Mock.mock(`${apiConfig.baseURL}/mock-api/login`, 'post', (options) => {
  // 解析请求数据
  const data = JSON.parse(options.body);

  // 验证用户名和密码
  if (data.username === 'admin' && data.password === '111') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: 'mocked_token_for_admin',
      },
    };
  } else {
    return {
      code: 401,
      message: '用户名或密码错误，登录失败！',
    };
  }
});