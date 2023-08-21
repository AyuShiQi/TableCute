<template>
  <div class="project-view">
    <!-- 头部 -->
    <project-header @update="updateCanvas" :option="chartOption.style" :project="projectData"/>
    <div class="project-view__content">
      <!-- 图表画布 -->
      <div
      class="project-view__content__canvas"
      @wheel="handleContentWheel"
      @mousedown="handleContentMousedown"
      @touchstart="handleContentMousedown"
      ref="e"
      :style="{
        transform: `translate(${canvasLeft}px, ${canvasTop}px) scale(${projectSize}%)`
      }">
        <amor-chart :option="chartOption.style" ref="chartDOM"></amor-chart>
      </div>
      <!-- 画布比例放大器 -->
      <project-size-control v-model="projectSize"/>
      <!-- 操作抽屉 -->
      <vi-drawer
      class="project-view__content__drawer"
      v-model="drawerOpen"
      :direction="drawerDirection">
        <vi-nav @change="handleNavChange">
          <vi-nav-item>数据表格</vi-nav-item>
          <vi-nav-item>图表样式</vi-nav-item>
          <vi-nav-item>画布属性</vi-nav-item>
        </vi-nav>
        <vi-table-editor v-model="chartData" v-show="navId === 0" class="project-view__content__drawer-item">
        </vi-table-editor>
        <vi-scroll class="project-view__content__drawer-item" hidden v-show="navId === 1">
          <chart-controller :option="chartOption.style"/>
        </vi-scroll>
        <vi-scroll class="project-view__content__drawer-item" hidden v-show="navId === 2">
          <canvas-controller :option="chartOption.style"/>
        </vi-scroll>
      </vi-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import projectHeader from './childComps/project-header.vue'
  import projectSizeControl from './childComps/project-size-control.vue'

  import canvasController from './childComps/canvas-controller.vue'
  import chartController from './childComps/chart-controller.vue'

  import projectAppState from './hooks/project-app-state'

  const {
    chartDOM,
    drawerOpen,
    drawerDirection,
    navId,
    projectSize,
    canvasTop,
    canvasLeft,
    // 数据部分
    projectData,
    chartData,
    chartOption,
    // 数据部分结束
    handleNavChange,
    handleContentMousedown,
    handleContentWheel,
    updateCanvas
  } = projectAppState()
</script>

<style lang="less" scoped>
.project-view {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--vi-background-color);
  flex-direction: column;
  .project-view__content {
    position: relative;
    overflow: hidden;
    width: 100%;
    flex: 1;

    .vi-collapse-type-default {
      border-top: none;
    }

    .project-view__content__canvas {
      position: absolute;
      width: 600px;
      height: 600px;
    }

    .project-view__content__drawer {
      --vi-drawer-width: 400px;
      --vi-drawer-height: 400px;
      --vi-drawer-padding: 14px;
      .project-view__content__drawer-item {
        margin-top: 8px;
        --vi-scroll-height: 100%;
        --vi-collapse-width: 100%;
        --vi-table-width: 100%;
        --vi-table-height: 340px;
      }
    }
  }
}

@media screen and (max-width: 700px){
  .project-view {
    .project-view__content {
      .project-view__content__size-control {
        left: 50%;
        margin-left: -100px;
      }
    }
  }
}
</style>