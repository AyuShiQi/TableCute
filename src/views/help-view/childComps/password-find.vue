<template>
  <div class="find-password-view">
    <div class="find-password-view__find-card">
      <h1 class="find-password-view__find-card__title">找回密码</h1>
      <div v-if="finish" class="find-password-view__find-card__finish">
        <h2>密码修改成功</h2>
        <h3>新的账号密码已经通过邮件发送给您</h3>
      </div>
      <vi-form class="find-password-view__find-card__form" @submit="handleSubmit" v-else>
        <template v-slot="{ submit }">
          <vi-form-item
          v-if="!needSmsCode"
          align="updown"
          :rules="emailRules"
          label="请输入您绑定的邮箱">
            <vi-input
            name="email"
            color="purple"
            v-model="email"></vi-input>
          </vi-form-item>
          <vi-form-item
          v-if="!needSmsCode"
          align="updown"
          :rules="[
            {
              rule(val: boolean) {
                return val
              },
              info: '请完成验证'
            }
          ]" 
          auto>
            <vi-verify-slider name="verify">向右滑动完成验证</vi-verify-slider>
          </vi-form-item>
          <!-- 验证码 -->
          <vi-form-item
          v-if="needSmsCode"
          align="updown"
          :rules="smscodeRules"
          label="请输入验证码"
          auto>
            <vi-input
            name="smscode"
            color="purple"
            :max-length="6"
            v-model="smscode"></vi-input>
          </vi-form-item>
          <!-- 修改密码 -->
          <vi-form-item
          v-if="needSmsCode"
          align="updown"
          :rules="passwordRegisterRules"
          label="请输入您要修改的密码"
          auto>
            <vi-input
            password
            name="password"
            color="purple"
            v-model="password"></vi-input>
          </vi-form-item>
          <!-- 二次修改密码 -->
          <vi-form-item
          v-if="needSmsCode"
          align="updown"
          :rules="[
            {
              rule() {
                return password === passwordAgain
              },
              info: '两次密码不一致'
            }
          ]"
          label="请再次输入您要修改的密码"
          auto>
            <vi-input
            password
            name="passwordAgain"
            color="purple"
            v-model="passwordAgain"></vi-input>
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
  import { emailRules, smscodeRules, passwordRegisterRules } from '@/regs/user'
  import { getCodeBye } from '@/network/help-center'
  import { backPassword } from '@/network/user'
  import { ref } from 'vue'
  import { ViMessage } from 'viog-ui'
  const email = ref()
  const smscode = ref()
  const password = ref()
  const passwordAgain = ref()
  const needSmsCode = ref(false)
  const isWaiting = ref(false)
  const finish = ref(false)

  function handleSubmit (formMap: Map<string, string>, res: boolean, option: any) {
    if (!res) return
    if (needSmsCode.value) {
      isWaiting.value = true
      backPassword(email.value, smscode.value, password.value).then(val => {
        isWaiting.value = false
        const feedbackMap = new Map<string, string>()
        if (val.message === '验证码错误或过期') {
          feedbackMap.set('smscode', '无效验证码')
          option.getSubmitFeedback(feedbackMap)
        } else if (val.code === 200) {
          finish.value = true
        }
      })
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