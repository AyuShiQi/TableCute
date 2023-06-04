<template>
  <div class="login-card__right__login">
    <!-- 手机验证码登录区 -->
    <vi-input
    v-show="tel"
    class="login-card__right__input"
    :maxlength="11"
    :number="tel"
    type="plain"
    color="purple"
    :prefix="['+86']"
    placeholder="请输入手机号"></vi-input>
    <vi-row justify="space-between" class="verify" v-show="tel">
    <vi-input
    class="login-card__right__input"
    :maxlength="6"
    number
    type="plain"
    color="purple"
    placeholder="请输入验证码"></vi-input>
    <vi-button type="plain">获取验证码</vi-button>
    </vi-row>
    <!-- 账号密码登录区 -->
    <vi-input
    v-show="!tel"
    class="login-card__right__input"
    :maxlength="16"
    type="plain"
    color="purple"
    placeholder="请输入账号"></vi-input>
    <vi-input
    v-show="!tel"
    class="login-card__right__input"
    :maxlength="18"
    :minlength="9"
    password
    show-password
    type="plain"
    color="purple"
    placeholder="请输入密码"></vi-input>
    <!-- 更改登录信息区 -->
    <div class="login-card__right__change-link">
      <vi-link color="green" v-show="!tel">忘记密码</vi-link>
      <vi-link @click="changeLoginMethod">{{tel? '账户密码登录' : '手机验证码登录'}}</vi-link>
    </div>
    <vi-button color="purple" class="login-card__right__submit-btn" size="middle" @click="toRegister">登录</vi-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { ViToast } from "viog-ui"
  import { toRegister } from '../../../../network/register'
  const believe = ref(false)
  const tel = ref(false)

  function changeLoginMethod () {
    ViToast.open('手机验证码登录将在后续版本上线，敬请期待~')
    // tel.value = !tel.value
  }
</script>

<style lang="less">
</style>