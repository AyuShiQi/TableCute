<template>
  <div class="home-page">
    <vi-header class="home-header">
      <router-link to="/home/new-project" class="home-header__logo">
        <img src="../../../public/logo.png" alt="logo"/>
      </router-link>
      <div class="home-header__right">
        <vi-nav class="home-header__nav" trigger="hover">
          <vi-link class="home-header__nav-item" href="javascript:;">首页</vi-link>
          <vi-link class="home-header__nav-item" href="javascript:;">交流社区</vi-link>
          <vi-link class="home-header__nav-item" href="javascript:;">模板中心</vi-link>
        </vi-nav>
        <!-- 头像显示区 -->
        <vi-avater :src="profileStore.avater" style="background-color: transparent;"></vi-avater>
      </div>
    </vi-header>
    <!-- 菜单区 -->
    <div class="home-content">
      <div class="home-content__menu-content">
        <vi-menu
        v-show="menuOpen"
        class="home-content__menu"
        router>
          <vi-menu-item to="/home/new-project">
            <template v-slot:prefix>
              <vi-icon type="tianjia"></vi-icon>
            </template>
            新的制作
          </vi-menu-item>
          <vi-divider></vi-divider>
          <vi-menu-group title="我的制作" scalable option to="/home/my-project">
            <vi-menu-item>图表</vi-menu-item>
            <vi-menu-item>数据</vi-menu-item>
            <vi-menu-item>回收站</vi-menu-item>
          </vi-menu-group>
          <vi-divider></vi-divider>
          <vi-menu-group title="模板中心">
            <vi-menu-item to="/home/tc/ft">发现模板</vi-menu-item>
            <vi-menu-item to="/home/tc/mc">我的收藏</vi-menu-item>
            <vi-menu-item to="/home/tc/ms">我的分享</vi-menu-item>
          </vi-menu-group>
          <vi-divider></vi-divider>
          <vi-menu-item to="/home/profile">
            <template v-slot:prefix>
              <vi-icon type="shezhi"></vi-icon>
            </template>
            设置
          </vi-menu-item>
        </vi-menu>
      </div>
      <!-- 内容区 -->
      <div class="home-content__main-content">
        <router-view></router-view>
      </div>
    </div>
    <!-- 手机版目录区 -->
    <vi-tabbar class="home-tabbar">
      <vi-tabbar-item to="/home/new-project">
        <template v-slot:icon>
          <vi-icon type="shouye"></vi-icon>
        </template>
        首页
      </vi-tabbar-item>
      <vi-tabbar-item to="/home/my-project">
        <template v-slot:icon>
          <vi-icon type="wenjianjia"></vi-icon>
        </template>
        项目
      </vi-tabbar-item>
      <!-- 新建按钮 -->
      <div class="home-tabbar__new-btn">
        <svg xmlns="http://www.w3.org/2000/svg"
        class="home-tabbar__new-btn__add"
        viewBox="0 0 20 20"
        version="1.1">
          <path d="M10 18 L10 2 M2 10 L18 10"/>
        </svg>
      </div>
      <vi-tabbar-item to="/home/tc">
        <template v-slot:icon>
          <vi-icon type="qushi"></vi-icon>
        </template>
        模板
      </vi-tabbar-item>
      <vi-tabbar-item to="/home/profile">
        <template v-slot:icon>
          <vi-icon type="shezhi"></vi-icon>
        </template>
        设置
      </vi-tabbar-item>
    </vi-tabbar>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import myProjectState from './hooks/home-view-state'
  import { useProfileStore } from '@/store'
  import { jumpToLogin } from '@/global/router-option'
  import { getToken } from '@/global/local-storage-option'
  const { menuOpen } = myProjectState()
  const profileStore = useProfileStore()


  onMounted(() => {
    // 跳转到登录页面
    if (!profileStore.isLogin) {
      // 寻找token
      const token = getToken()
      if (token) {
        profileStore.getProfile(token)
      } else jumpToLogin()
    }
  })
</script>

<style lang="less">
@import './css/home-view.less';
</style>