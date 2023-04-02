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
            <div class="login-card__right__input">
              <vi-form-item label="手机号" dark>
                <vi-input class="login-card__right__input__item" type="plain" dark width="80%"></vi-input>
              </vi-form-item>
              <vi-input class="login-card__right__input__item" type="plain" dark width="80%"></vi-input>
            </div>
            <vi-button color="spurple" class="login-card__right__submit-btn">登录</vi-button>
            <div class="login-card__right__else-login">
            </div>
        </div>
      </div>
    )
  }
})