<template>
    <div class="login-card">
        <div class="login-card__left">
          <div class="login-card_left_background"></div>
          <LoginImg class="login-card_left_img"></LoginImg>
        </div>
        <div class="login-card__right">
          <div class="login-card__right__top">
            <!-- 注册登录状态改变 -->
            <p class="login-card__right__register-link">
              <span>{{ isLogin ? '没有' : '已有' }}账号？</span>
              <vi-bubble
              dark
              direction="left"
              style="--vi-bubble-width: 236px;">
                <vi-link color="purple" @click="changeState">
                  前往{{ isLogin ? '注册' : '登录' }}
                </vi-link>
                <template v-slot:content>
                  手机号获取验证码可直接注册登录
                </template>
              </vi-bubble>
            </p>
            <div class="login-card__right__title">
              <h1>你好，</h1>
              <h1>欢迎使用图酷</h1>
            </div>
            <login-box v-if="isLogin"></login-box>
            <register-box v-else></register-box>
            <div class="login-card__right__attention">
              登录/注册即同意
              <vi-link color="green" size="small">《用户条例》</vi-link>
            </div>
          </div>
          <div class="login-card__right__else-login">
              <p class="login-card__right__else-login__title">
                <span class="login-card__right__else-login__line"></span>
                <span class="login-card__right__else-login__text">快速登录</span>
                <span class="login-card__right__else-login__line"></span>
              </p>
              <div class="login-card__right__else-login__link">
                <svg @click="gotoWeChat" width="20px" class="login-card__right__else-login__link__icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"/>
                  <path d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"/>
                </svg>
              </div>
          </div>
        </div>
      </div>
</template>

<script lang="ts" setup>
  import { ref, provide } from "vue"
  import LoginImg from "./login-img.vue"
  import { ViToast } from "viog-ui"

  import loginBox from './childComps/login-box.vue'
  import registerBox from "./childComps/register-box.vue"

  const isLogin = ref(true)

  function gotoWeChat () {
    ViToast.open('微信登录将在后续版本上线，敬请期待~')
  }

  function changeState () {
    isLogin.value = !isLogin.value
  }

  function toLogin () {
    isLogin.value = true
  }

  provide('login-card-to-login', toLogin)
</script>

<style lang="less">
  @import './css/login-card.less';
</style>
