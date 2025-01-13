import { createApp, ref } from 'vue'
import './main.scss'
import 'element-plus/theme-chalk/el-message.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import { zhCn, en } from 'element-plus/es/locale/index';
import router from './router'
import Pinia from './store'
import './mock/index' // 引入mock数据

const app = createApp(App);

// 创建一个响应式变量来存储当前语言
const currentLocale = ref(zhCn);

// 配置 Element Plus 使用当前语言
app.use(ElementPlus, {
  locale: currentLocale.value,
});

// 提供一个全局方法用于切换语言
app.config.globalProperties.$changeLocale = (locale: 'zh-cn' | 'en') => {
  currentLocale.value = locale === 'zh-cn' ? zhCn : en;
};

app.use(router).use(Pinia).mount('#app')

