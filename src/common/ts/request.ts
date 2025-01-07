import axios, {AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import isMockEnabled from '@/config/mockConfig';
import apiConfig from '@/config/apiConfig';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ResponseType<T = any> {
  code: number;
  data: T;
  message: string;
}
// 定义默认的 Axios 配置
const defaultConfig: AxiosRequestConfig = {
  baseURL: apiConfig.baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 创建 Axios 实例
const instance: AxiosInstance = axios.create(defaultConfig);

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (isMockEnabled && config.url) { // 使用 Mock 数据时替换 URL 前缀
    config.url = config.url.replace(/^\/api/, '/mock-api');
    }
    if (token) { // 添加 Authorization 头
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse<unknown> => response.data,
  (error: unknown) => Promise.reject(error)
);

// 定义 API 方法
const api = <T, R = ResponseType<T>>() => ({
    get: (url: string, config?: AxiosRequestConfig): Promise<R> =>
      instance.get<T, R>(url, config),
    post: (url: string, data?: T, config?: AxiosRequestConfig): Promise<R> =>
      instance.post<T, R>(url, data, config),
    put: (url: string, data?: T, config?: AxiosRequestConfig): Promise<R> =>
      instance.put<T, R>(url, data, config),
    delete: (url: string, config?: AxiosRequestConfig): Promise<R> =>
      instance.delete<T, R>(url, config),
});

const request = api<unknown, ResponseType>();
export default request;