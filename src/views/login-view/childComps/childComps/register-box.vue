<template>
  <div class="login-card__right__login">
    <!-- 账号密码登录区 -->
    <vi-input
    class="login-card__right__input"
    :maxlength="16"
    type="plain"
    color="purple"
    placeholder="请输入账号"></vi-input>
    <vi-input
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
    <vi-link>无法注册？点击此处</vi-link>
    </div>
    <vi-button color="green" class="login-card__right__submit-btn" size="middle">注册</vi-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue"
  import { ViToast } from "viog-ui"
</script>

<style lang="less">
</style>