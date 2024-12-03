import { createApp } from 'vue'
import './main.scss'
import App from './App.vue'
import router from './router'
import Pinia from './store'

createApp(App).use(router).use(Pinia).mount('#app')
