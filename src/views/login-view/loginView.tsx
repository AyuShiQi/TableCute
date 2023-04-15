import { defineComponent } from "vue"
import './login-view.less'

import LoginCard from "./childComps/login-card.vue"

// 暂时解决
const LoginCardX = LoginCard as any

export default defineComponent({
  name: 'LoginView',
  setup(props, context) {
    return () => (
      <div class="login-view">
        <LoginCardX></LoginCardX>
      </div>
    )
  }
})
