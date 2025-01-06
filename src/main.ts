import { createApp } from 'vue'
import './main.scss'
import 'element-plus/theme-chalk/el-message.css'
import App from './App.vue'
import router from './router'
import Pinia from './store'
import './mock/index' // 引入mock数据

createApp(App).use(router).use(Pinia).mount('#app')
