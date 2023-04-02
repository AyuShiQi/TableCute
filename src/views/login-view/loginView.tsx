import { defineComponent } from "vue"
import './login-view.less'

import LoginCard from "./childComps/loginCard"

export default defineComponent({
  name: 'LoginView',
  setup(props, context) {
    const name = 'ysq'

    return () => (
      <div class="login-view">
        <LoginCard></LoginCard>
      </div>
    )
  }
})
