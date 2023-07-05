<template>
  <!-- 手机验证码登录区 -->
  <vi-form @submit="handleSubmit" class="login-card__right__login">
    <template v-slot="{ submit, getSubmitFeedback }">
      <!-- 手机号 -->
      <vi-form-item v-if="tel"
      :rules="telephoneRules">
        <vi-input
        v-model="loginTel"
        class="login-card__right__input"
        :maxlength="11"
        :number="tel"
        type="plain"
        color="purple"
        name="telephone"
        placeholder="请输入手机号">
          <template v-slot:prefix>
            <vi-select style="--vi-select-list-width: 140px; --vi-select-list-gap: 2px;" choose-type="plain">
              <vi-option-group title="热门地区">
                <vi-option value="86" selected>
                  +86
                  <template v-slot:suf>
                    中国大陆
                  </template>
                </vi-option>
              </vi-option-group>
            </vi-select>
          </template>
        </vi-input>
      </vi-form-item>
      <!-- 验证码 -->
      <vi-form-item v-if="tel"
      class="verify"
      :rules="smscodeRules">
        <vi-input
        v-model="telCode"
        class="login-card__right__input"
        :maxlength="6"
        number
        type="plain"
        color="purple"
        name="smscode"
        placeholder="请输入验证码"></vi-input>
        <vi-button
        class="login-card__right__smscode-btn"
        type="plain"
        :disabled="smsTime !== '0s'"
        @click="getSMCode(getSubmitFeedback)">
          {{ smsTime === '0s' ? '获取验证码' : smsTime}}
        </vi-button>
      </vi-form-item>
      <!-- 账号密码登录区 -->
      <!-- 账号 -->
      <vi-form-item v-if="!tel"
      :rules="usernameRules">
        <vi-input
        v-model="username"
        class="login-card__right__input"
        :maxlength="16"
        type="plain"
        color="purple"
        name="username"
        placeholder="请输入账号"></vi-input>
      </vi-form-item>
      <!-- 密码 -->
      <vi-form-item v-if="!tel"
      :rules="passwordRules">
        <vi-input
        v-model="password"
        class="login-card__right__input"
        :maxlength="18"
        :minlength="9"
        password
        show-password
        type="plain"
        color="purple"
        name="password"
        placeholder="请输入密码"></vi-input>
      </vi-form-item>
      <!-- 更改登录信息区 -->
      <div class="login-card__right__change-link">
        <vi-link color="green" v-show="!tel">忘记密码</vi-link>
        <vi-link @click="changeLoginMethod">{{tel? '账户密码登录' : '手机验证码登录'}}</vi-link>
      </div>
      <vi-button color="purple" class="login-card__right__submit-btn" size="middle" @click="handleClick(submit)">登录</vi-button>
    </template>
  </vi-form>
</template>

<script lang="ts" setup>
  import { telephoneRules, smscodeRules, usernameRules, passwordRules } from '@/regs/user'
  import loginBoxState from './hooks/login-box-state'
  const {
    smsTime,
    tel,
    username,
    password,
    loginTel,
    telCode,
    changeLoginMethod,
    handleSubmit,
    handleClick,
    getSMCode
  } = loginBoxState()
</script>

<style lang="less">
</style>