<template>
  <div class="find-password-view">
    <div class="find-password-view__find-card">
      <h1 class="find-password-view__find-card__title">找回密码</h1>
      <vi-form class="find-password-view__find-card__form" @submit="handleSubmit">
        <template v-slot="{ submit }">
          <vi-form-item
          :rules="usernameRules"
          align="updown"
          label="请输入您需要找回密码的账号">
            <vi-input
            name="username"
            color="purple"
            v-model="username"></vi-input>
          </vi-form-item>
          <vi-form-item
          align="updown"
          :rules="emailRules"
          label="请输入您绑定的邮箱">
            <vi-input
            name="email"
            color="purple"
            v-model="email"></vi-input>
          </vi-form-item>
          <vi-form-item
          v-if="needSmsCode"
          align="updown"
          :rules="smscodeRules"
          label="请输入验证码">
            <vi-input
            name="smscode"
            color="purple"
            v-model="smscode"></vi-input>
          </vi-form-item>
          <vi-button
          :disabled="isWaiting"
          class="find-password-view__find-card__form__submit-btn"
          @click="submit">
          <template v-if="isWaiting">
            <div>
              <vi-loading type="round"
              style="
              transform: translateY(2px);
              --vi-loading-width: 1em;
              --vi-loading-height: 1em;
              --vi-purple-color3: #fff;"></vi-loading>
              处理中
            </div>
          </template>
          <template v-else>
            下一步
          </template>
          </vi-button>
        </template>
      </vi-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { emailRules, usernameRules, smscodeRules } from '@/regs/user'
  import { getCodeBye } from '@/network/help-center'
  import { ref } from 'vue'
  import { ViMessage } from 'viog-ui'
  const username = ref()
  const email = ref()
  const smscode = ref()
  const needSmsCode = ref(false)
  const isWaiting = ref(false)

  function handleSubmit (formMap: Map<string, string>, res: boolean, option: any) {
    if (!res) return
    if (needSmsCode.value) {
      console.log('下一步')
    } else {
      isWaiting.value = true
      getCodeBye(email.value).then(val => {
      isWaiting.value = false
      const feedbackMap = new Map<string, string>()
      // console.log(val)
      if (val.code === 500) {
        feedbackMap.set('email', '该邮箱未注册')
        option.getSubmitFeedback(feedbackMap)
      } else if (val.code === 200) {
        ViMessage.append('验证码已发送至邮箱，注意查收')
        needSmsCode.value = true
      }
    })
    }
  }
</script>

<style lang="less">
@import './css/password-find.less';
</style>