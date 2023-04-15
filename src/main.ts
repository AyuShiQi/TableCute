import { createApp } from 'vue'
import Router from './router'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import './assets/css/normalize.css'
import './style.less'
import App from './App'

createApp(App)
.use(Router)
.use(Viog)
.mount('#app')
