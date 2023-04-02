import { createApp } from 'vue'
import Router from './router'
import './assets/css/normalize.css'
import './style.css'
import App from './App'

createApp(App)
.use(Router)
.mount('#app')
