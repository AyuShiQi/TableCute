import { defineComponent } from "vue"
import './login-view.less'

import LoginCard from "./childComps/loginCard"

export default defineComponent({
  name: 'LoginView',
  setup(props, context) {
    return () => (
      <div class="login-view">
        <LoginCard></LoginCard>
      </div>
    )
  }
})
