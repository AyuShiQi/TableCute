<template>
  <div class="project-view">
    <!-- 头部 -->
    <project-header @update="updateCanvas" :project="chartProject"/>
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
       <amor-chart :option="chartOption" ref="chartDOM"></amor-chart>
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
        <vi-table-editor v-show="navId === 0" class="project-view__content__drawer-item">
        </vi-table-editor>
        <vi-scroll class="project-view__content__drawer-item" v-show="navId === 1">
          <chart-controller :option="chartOption" :project="chartProject"/>
        </vi-scroll>
        <vi-scroll class="project-view__content__drawer-item" v-show="navId === 2">
          <canvas-controller :option="chartOption" :project="chartProject"/>
        </vi-scroll>
      </vi-drawer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, onBeforeUnmount, reactive, watch } from 'vue'

  import projectHeader from './components/project/project-header.vue'
  import projectSizeControl from './components/project/project-size-control.vue'

  import canvasController from './components/project/canvas-controller.vue'
  import chartController from './components/project/chart-controller.vue'

  import { getToken } from '@/global/local-storage-option'
  import { useProfileStore } from './store'
  const profileStore = useProfileStore()

  const drawerOpen = ref(true)
  const navId = ref(0)
  const drawerDirection = ref('right')
  const projectSize = ref(100)
  const chartDOM = ref()
  const e = ref()

  const chartProject = reactive({
    title: undefined
  })

  const chartOption = reactive({
    type: 0, // 条形图
    width: '600',
    height: '600',
    background: 'transparent',
    unitGap: 40,
    attention: {
      color: '#888',
      size: 12,
      font: 'serif'
    },
    padding: {
      x: 8,
      y: 8,
      gap: 8
    },
    data: [
      ['类型', '数量'],
      ['高中', 482.3],
      ['学士', 568],
      ['硕士', 573.8],
      ['博士', 200]
    ],
    title: {
      content: '这里是标题',
      size: 32,
      color: '#000',
      align: 'top-left',
      font: 'serif' // 'Helvetica'// 'serif'
    },
    info: {
      unit: '单位：百万',
      unitSize: 16,
      unitColor: '#bbb',
      unitAlign: 'left',
      unitFont: 'serif', // 'Helvetica'// 'serif'
      source: '来源：百万青年人大学习网',
      sourceSize: 16,
      sourceColor: '#bbb',
      sourceAlign: 'left',
      sourceFont: 'serif' // 'Helvetica'// 'serif'
    },
    axis: {
      x: {
        type: 'line',
        label: true,
        line: 'none',
        color: '#000',
        lineColor: '#aaa',
        labelColor: '#888',
        labelSize: 12
      },
      y: {
        type: 'line', // none line arrow(带箭头的)
        label: true,
        line: 'line',
        color: '#000',
        lineColor: '#aaa',
        labelColor: '#888',
        labelSize: 12
      }
    },
    label: {
      content: [
        {
          tag: '高中',
          color: '#ffbe96'
        },
        {
          tag: '学士',
          color: '#ffff96'
        },
        {
          tag: '硕士',
          color: '#747bff'
        },
        {
          tag: '博士',
          color: '#96ffde'
        }
      ],
      color: '#aaa',
      size: 14,
      align: 'top',
      font: 'serif' // 'Helvetica'// 'serif'
    }
  })

  watch(chartOption, () => {
    console.log(chartOption)
    chartDOM.value.render()
  }, { immediate: false })

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
    // console.log(e)
    if (e.deltaY < 0) {
      projectSize.value = Math.min(500, projectSize.value + 10)
    } else {
      projectSize.value = Math.max(50, projectSize.value - 10)
    }
  }

  function updateCanvas () {
    const canvas = e.value.children[0]
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