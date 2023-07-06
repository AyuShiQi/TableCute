<template>
  <vi-form class="login-card__right__login" @submit="handleSubmit">
    <template v-slot="{ submit }">
      <vi-form-item :rules="usernameRegisterRules" auto>
        <!-- 账号密码登录区 -->
        <vi-input
        v-model="registerAccount"
        class="login-card__right__input"
        :maxlength="10"
        :minlength="4"
        type="plain"
        color="green"
        placeholder="请输入账号"
        name="username"></vi-input>
      </vi-form-item>
      <vi-form-item :rules="passwordRegisterRules" auto>
        <vi-input
        class="login-card__right__input"
        v-model="registerPassword"
        :maxlength="16"
        :minlength="8"
        password
        show-password
        type="plain"
        color="green"
        placeholder="请输入密码"
        name="password"></vi-input>
      </vi-form-item>
      <!-- 更改登录信息区 -->
      <div class="login-card__right__change-link">
      <vi-link>无法注册？点击此处</vi-link>
      </div>
      <vi-button color="green" class="login-card__right__submit-btn" @click="register(submit)">
        <div>
          <template v-if="isRegistering">
            <vi-loading type="round"
            style="
            transform: translateY(2px);
            --vi-loading-width: 1em;
            --vi-loading-height: 1em;
            --vi-purple-color3: #fff;"></vi-loading>
            注册中
          </template>
          <template v-else>
            注册
          </template>
        </div>
      </vi-button>
    </template>
  </vi-form>
</template>

<script lang="ts" setup>
  import { toRegister } from '@/network/user'
  import { usernameRegisterRules, passwordRegisterRules } from '@/regs/user'
  import { ref, inject } from "vue"
  import { ViMessage } from 'viog-ui'
  const toLogin = inject('login-card-to-login') as () => void

  const registerAccount = ref()
  const registerPassword = ref()
  const isRegistering = ref(false)

  function register (submit: () => void) {
    if (isRegistering.value) return
    if (submit) submit()
  }

  function handleSubmit (formMap: Map<string, number>, res: boolean, option: any) {
    const feedbackMap = new Map<string, string>()
    const { getSubmitFeedback } = option
    if (res) {
      isRegistering.value = true
      toRegister(registerAccount.value, registerPassword.value, 'aaaaaaaaaa', '123@qq.com').then((val) => {
        isRegistering.value = false
        // console.log(val)
        if (val.code === 500) {
          feedbackMap.set('username', val.message)
          getSubmitFeedback(feedbackMap)
        } else if(val.code === 200) {
          ViMessage.append('注册成功！为您跳转至登录界面', 2000)
          if (toLogin) toLogin()
        }
      })
    }
  }
</script>

<style lang="less">
</style>