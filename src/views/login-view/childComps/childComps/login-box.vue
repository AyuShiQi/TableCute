<template>
  <!-- 手机验证码登录区 -->
  <vi-form @submit="handleSubmit" class="login-card__right__login">
    <template v-slot="{ submit, getSubmitFeedback }">
      <!-- 手机号 -->
      <vi-form-item v-show="tel"
      :rules="tel ? telephoneRules : undefined">
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
            <vi-select
            v-model="telPrefix"
            style="--vi-select-list-width: 140px; --vi-select-list-gap: 2px;--vi-select-width: 4em;"
            choose-type="plain"
            once>
              <vi-option-group title="热门地区">
                <vi-option value="86" selected>
                  +86
                  <template v-slot:suf>
                    中国大陆
                  </template>
                </vi-option>
              </vi-option-group>
              <vi-option-group title="Z">
                <vi-option value="86">
                  +86
                  <template v-slot:suf>
                    中国大陆
                  </template>
                </vi-option>
                <vi-option value="886">
                  +886
                  <template v-slot:suf>
                    中国台湾
                  </template>
                </vi-option>
              </vi-option-group>
            </vi-select>
          </template>
        </vi-input>
      </vi-form-item>
      <!-- 验证码 -->
      <vi-form-item v-show="tel"
      class="verify"
      :rules="tel ? smscodeRules : undefined">
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
          <div>
            <template v-if="smsTime === '0s'">
              获取验证码
            </template>
            <template v-else>
              <vi-loading type="round"
              style="
              transform: translateY(2px);
              --vi-loading-width: 1em;
              --vi-loading-height: 1em;
              --vi-purple-color3: var(--vi-background-color-deep);"></vi-loading>
              {{ smsTime }}
            </template>
          </div>
        </vi-button>
      </vi-form-item>
      <!-- 账号密码登录区 -->
      <!-- 账号 -->
      <vi-form-item v-show="!tel"
      :rules="!tel ? usernameRules : undefined">
        <vi-input
        v-model="username"
        class="login-card__right__input"
        :maxlength="10"
        :minlength="4"
        type="plain"
        color="purple"
        name="username"
        placeholder="请输入账号"></vi-input>
      </vi-form-item>
      <!-- 密码 -->
      <vi-form-item v-show="!tel"
      :rules="!tel ? passwordRules : undefined">
        <vi-input
        v-model="password"
        class="login-card__right__input"
        :maxlength="16"
        :minlength="8"
        password
        show-password
        type="plain"
        color="purple"
        name="password"
        placeholder="请输入密码"></vi-input>
      </vi-form-item>
      <!-- 更改登录信息区 -->
      <div class="login-card__right__change-link">
          <vi-link color="green" v-show="!tel" @click="handleFindPassword">忘记密码</vi-link>
        <vi-link @click="changeLoginMethod">{{tel? '账户密码登录' : '手机验证码登录'}}</vi-link>
      </div>
      <vi-button
      color="purple"
      class="login-card__right__submit-btn"
      size="middle"
      @click="handleClick(submit)">
        <div>
          <template v-if="isLoging">
            <vi-loading type="round"
            style="
            transform: translateY(2px);
            --vi-loading-width: 1em;
            --vi-loading-height: 1em;
            --vi-purple-color3: #fff;"></vi-loading>
            登录中
          </template>
          <template v-else>
            登录
          </template>
        </div>
      </vi-button>
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
    isLoging,
    telPrefix,
    changeLoginMethod,
    handleSubmit,
    handleClick,
    handleFindPassword,
    getSMCode
  } = loginBoxState()
</script>

<style lang="less">
</style>