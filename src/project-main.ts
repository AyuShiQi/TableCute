import { createApp } from 'vue'
import pinia from './store'
import Viog from 'viog-ui'
import 'viog-ui/dist/viog-ui.css'
import './assets/css/normalize.css'
import './style.less'
import App from './project-app.vue'



createApp(App)
.use(pinia)
.use(Viog)
.mount('#app')