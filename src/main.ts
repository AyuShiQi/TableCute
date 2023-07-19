import { createApp } from 'vue'
import pinia from './store'
import Router from './router'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import './assets/css/normalize.css'
import './style.less'
import App from './App'



createApp(App)
.use(pinia)
.use(Router)
.use(Viog)
.mount('#app')
