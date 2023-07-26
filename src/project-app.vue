<template>
  <div class="project-view">
    <!-- 头部 -->
    <project-header @update="updateCanvas"/>
    <div class="project-view__content"
    @mousedown="handleContentMousedown"
    @touchstart="handleContentMousedown">
      <!-- 图表画布 -->
      <div
      class="project-view__content__canvas"
      @wheel="handleContentWheel"
      ref="e"
      :style="{
        transform: `translate(${canvasLeft}px, ${canvasTop}px) scale(${projectSize}%)`
      }"></div>
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
        <vi-table-editor v-show="navId === 0" class="project-view__content__drawer-item">

        </vi-table-editor>
        <vi-scroll class="project-view__content__drawer-item" v-show="navId === 1">
          <vi-collapse-group accordion>
            <vi-collapse title="坐标系"></vi-collapse>
            <vi-collapse title="字体"></vi-collapse>
            <vi-collapse title="颜色"></vi-collapse>
            <vi-collapse title="标签"></vi-collapse>
            <vi-collapse title="附加信息"></vi-collapse>
            <vi-collapse title="边框"></vi-collapse>
          </vi-collapse-group>
        </vi-scroll>
        <vi-scroll class="project-view__content__drawer-item" v-show="navId === 2">
          <vi-collapse-group accordion>
            <vi-collapse title="画布大小"></vi-collapse>
            <vi-collapse title="项目名称"></vi-collapse>
            <vi-collapse title="项目属性"></vi-collapse>
            <vi-collapse title="修改列表"></vi-collapse>
          </vi-collapse-group>
        </vi-scroll>
      </vi-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import * as echarts from 'echarts'
  import { onMounted, ref, onBeforeUnmount } from 'vue'

  import projectHeader from './components/project/project-header.vue'
  import projectSizeControl from './components/project/project-size-control.vue'

  import { getToken } from '@/global/local-storage-option'
  import { useProfileStore } from './store'
  const profileStore = useProfileStore()

  const drawerOpen = ref(true)
  const navId = ref(0)
  const drawerDirection = ref('right')
  const projectSize = ref(100)
  const e = ref()

  function handleResize (e: any) {
    if (e.target.innerWidth <= 700) {
      drawerDirection.value = 'bottom'
    } else {
      drawerDirection.value = 'right'
    }
  }

  function handleNavChange (id: number) {
    navId.value = id
  }

  // 这一部分掌管图表拖动
  const draging = ref(false)
  const canvasTop = ref(80)
  const canvasLeft = ref(80)
  let prex = 0
  let prey = 0
  function handleContentMousedown (e: any) {
    if (draging.value) return
    e.stopPropagation()
    draging.value = true
    if (e.x) {
      prex = e.x
      prey = e.y
    } else {
      prex = e.touches[0].pageX
      prey = e.touches[0].pageY
    }
  }

  function handleMousemove (e: any) {
    if (!draging.value) return
    e.stopPropagation()
    e.preventDefault()
    if (e.x) {
      canvasTop.value += (e.y - prey)
      canvasLeft.value += (e.x - prex)
      prey = e.y
      prex = e.x
    } else {
      const {pageX, pageY} = e.touches[0]
      canvasTop.value += (pageY - prey)
      canvasLeft.value += (pageX - prex)
      prey = pageY
      prex = pageX
    }
  }

  function handleMouseup (e: any) {
    if (!draging.value) return
    e.stopPropagation()
    draging.value = false
  }

  function handleContentWheel (e: any) {
    if (e.zrDelta > 0) {
      projectSize.value = Math.min(500, projectSize.value + 10)
    } else {
      projectSize.value = Math.max(50, projectSize.value - 10)
    }
  }

  function updateCanvas () {
    const canvas = e.value.children[0].children[0]
    var link = document.createElement("a");
    var imgData = canvas.toDataURL();
    var strDataURI = imgData.substr(22, imgData.length);
    var blob = dataURLtoBlob(imgData);
    var objurl = URL.createObjectURL(blob);
    link.download = "tablecute-test.png";
    link.href = objurl;
    link.click();
    
 	  function  dataURLtoBlob(dataurl: string) {
    	var arr = dataurl.split(',')
      var mime = (arr as any)[0].match(/:(.*?);/)[1],
      	bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    	while(n--){
     		 u8arr[n] = bstr.charCodeAt(n);
    	}
    	return new Blob([u8arr], {type:mime});
  	}
  }

  onMounted(() => {
    drawerDirection.value = innerWidth <= 700 ? 'bottom' : 'right'
    profileStore.getProfile(getToken() as string)
    // window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMousemove, { passive: false })
    window.addEventListener('touchmove', handleMousemove, { passive: false })
    window.addEventListener('mouseup', handleMouseup)
    window.addEventListener('touchend', handleMouseup)
    window.addEventListener('mouseleave', handleMouseup)
    const myE = echarts.init(e.value)

    myE.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  })

  onBeforeUnmount(() => {
    // window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMousemove)
    window.removeEventListener('touchmove', handleMousemove)
    window.removeEventListener('mouseup', handleMouseup)
    window.removeEventListener('touchend', handleMouseup)
    window.removeEventListener('mouseleave', handleMouseup)
  })
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