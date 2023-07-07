<template>
  <div class="help-center-view">
    <div class="help-center-view__header">
      <div class="help-center-view__header__logo">
        <img src="~@/assets/logo.png" alt="图酷logo">
      </div>
      <h1>图酷帮助中心</h1>
      <div class="help-center-view__header__nav">
        <vi-link class="nav-item" target="_blank" href="http://182.43.52.124:9200">返回首页</vi-link>
        <vi-link class="nav-item">关于我们</vi-link>
      </div>
    </div>
    <!-- <div class="help-center-view__nav">
      <vi-breadcrumb>
        <vi-breadcrumb-item to="/">首页</vi-breadcrumb-item>
        <vi-breadcrumb-item>帮助中心</vi-breadcrumb-item>
      </vi-breadcrumb>
    </div> -->
    <div class="help-center-view__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="less">
  @import './css/help-center.less';
</style>