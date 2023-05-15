<template>
  <div class="home-page">
    <vi-header class="home-header">
      <vi-link class="home-header__logo" href="javascript:;">
        <img src="../../../public/logo.png" alt="logo">
      </vi-link>
      <div class="home-header__right">
        <vi-nav class="home-header__nav" trigger="hover">
          <vi-link class="home-header__nav-item" href="javascript:;">首页</vi-link>
          <vi-link class="home-header__nav-item" href="javascript:;">交流社区</vi-link>
          <vi-link class="home-header__nav-item" href="javascript:;">模板中心</vi-link>
        </vi-nav>
        <vi-avater>
          <vi-icon type="wode"></vi-icon>
        </vi-avater>
      </div>
    </vi-header>
    <div class="home-content">
      <vi-menu :defaultId="1" router>
      <vi-menu-item to="/home/new-project">
        <template v-slot:prefix>
          <vi-icon type="tianjia"></vi-icon>
        </template>
        新的制作
      </vi-menu-item>
      <vi-divider></vi-divider>
      <vi-menu-group title="我的制作" scalable option>
        <vi-menu-item>图表</vi-menu-item>
        <vi-menu-item>数据</vi-menu-item>
        <vi-menu-item>回收站</vi-menu-item>
      </vi-menu-group>
      <vi-divider></vi-divider>
      <vi-menu-group title="模板中心">
        <vi-menu-item>发现模板</vi-menu-item>
        <vi-menu-item>我的收藏</vi-menu-item>
        <vi-menu-item>我的分享</vi-menu-item>
      </vi-menu-group>
      <vi-divider></vi-divider>
      <vi-menu-item>
        <template v-slot:prefix>
          <vi-icon type="shezhi"></vi-icon>
        </template>
        设置
      </vi-menu-item>
      </vi-menu>
      <div class="home-content__main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '../../router';
  function toLogin() {
    router.push('/login')
  }
</script>

<style lang="less">
@import './css/home-view.less';
</style>