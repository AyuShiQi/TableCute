import { defineComponent } from "vue"
import './css/login-card.less'


export default defineComponent({
  name: 'LoginCard',
  setup(props, context) {
    const name = 'ysq'

    return () => (
      <div class="login-card">
        <div class="login-card__left">
          <div class="login-card_left_background"></div>
          
        </div>
        <div class="login-card__right">
            <p class="login-card__right__register-link">
              <span>没有账号？</span>
              <vi-link color="purple">前往注册</vi-link>
            </p>
            <div class="login-card__right__title">
              <h1>你好，</h1>
              <h1>欢迎登录图酷</h1>
            </div>
            <div class="login-card__right__input">
              <vi-input class="login-card__right__input__item" type="plain" color="purple" placeholder="手机号"></vi-input>
              <vi-input class="login-card__right__input__item" type="plain" color="purple" placeholder="密码"></vi-input>
            </div>
            <div class="login-card__right__change-link">
              <a href="javascript:;">切换为账户密码登录</a>
            </div>
            <vi-button color="purple" class="login-card__right__submit-btn" size="middle">登录</vi-button>
            <div class="login-card__right__attention">
              <vi-radio color="dark" size="small">我已阅读<a href="jacascript;:">注意事项</a>并同意所有条例</vi-radio>
            </div>
            <div class="login-card__right__else-login">
              <p class="login-card__right__else-login__title">
                <span class="login-card__right__else-login__line"></span>
                <span class="login-card__right__else-login__text">快速登录</span>
                <span class="login-card__right__else-login__line"></span>
              </p>
              {/* <div class="login-card__right__else-login__link">
                <svg class="login-card__right__else-login__link__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#28c445" d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"  /><path fill="#28c445" d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"/>
                </svg>
              </div> */}
            </div>
        </div>
      </div>
    )
  }
})