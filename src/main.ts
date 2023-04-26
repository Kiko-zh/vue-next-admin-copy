import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { i18n } from '/@/i18n/index'
import other from '/@/utils/other'
import { directive } from '/@/directive'

import ElementPlus from 'element-plus'
import './theme/index.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

directive(app)
other.elSvg(app)

app.use(pinia).use(router).use(ElementPlus).use(i18n).mount('#app')
