import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { i18n } from '/@/i18n/index'

import ElementPlus from 'element-plus'
import './theme/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(pinia).use(router).use(ElementPlus).use(i18n).mount('#app')
