import { createApp } from 'vue'
import pinia from './store'
import Viog from 'viog-ui'
import diagrAmor from 'diagr-amor'
import 'viog-ui/dist/viog-ui.css'
import './assets/css/normalize.css'
import './style.less'
import App from './project-app.vue'

console.log(diagrAmor)

createApp(App)
.use(pinia)
.use(Viog)
.use(diagrAmor)
.mount('#app')