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
        <vi-avater>
          <vi-icon type="wode"></vi-icon>
        </vi-avater>
      </div>
    </vi-header>
    <!-- 菜单区 -->
    <div class="home-content">
      <div class="home-content__menu-content">
        <div class="home-content__menu-nav">
          <svg class="list-menu"
          @click="changeMenuOpen"
          viewBox="0 0 1024 1024"
          version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M918.507 443.947H104.64c-37.547 0-68.16 30.72-68.16 68.16 0 37.546 30.72 68.16 68.16 68.16h813.867c37.546 0 68.16-30.72 68.16-68.16s-30.72-68.16-68.16-68.16z m-0.32 306.88H104.32c-37.547 0-68.16 30.72-68.16 68.16 0 37.546 30.72 68.16 68.16 68.16h813.867c37.546 0 68.16-30.72 68.16-68.16 0-37.547-30.614-68.16-68.16-68.16z m1.066-610.667H105.387c-37.547 0-68.16 30.72-68.16 68.16 0 37.547 30.72 68.16 68.16 68.16h813.866c37.547 0 68.16-30.72 68.16-68.16 0-37.547-30.72-68.16-68.16-68.16z"/>
          </svg>
        </div>
        <vi-menu
        v-show="menuOpen"
        class="home-content__menu"
        :defaultId="1"
        router>
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
          <vi-menu-item to="/login">
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
  </div>
</template>

<script lang="ts" setup>
  import router from '../../router';
  import myProjectState from './hooks/home-view-state'
  const { menuOpen, changeMenuOpen } = myProjectState()
</script>

<style lang="less">
@import './css/home-view.less';
</style>