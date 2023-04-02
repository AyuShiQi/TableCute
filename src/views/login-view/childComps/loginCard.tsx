import { defineComponent } from "vue"
import './css/login-card.less'


export default defineComponent({
  name: 'LoginCard',
  setup(props, context) {
    const name = 'ysq'

    return () => (
      <div class="login-card">
        <div class="login-card__left"></div>
        <div class="login-card__right">
            <h1 class="login-card__right__nav">
                <span>登录</span>
                <span>注册</span>
            </h1>
        </div>
      </div>
    )
  }
})