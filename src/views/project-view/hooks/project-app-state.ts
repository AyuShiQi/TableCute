// vue
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
// vue type
// 组件type
// 外部hooks
// 内部hooks
import projectAppDataState from './project-app-data-state'
// 外部模块
import { getToken } from '@/global/local-storage-option'
import { useProfileStore } from '@/store'

export default function () {
  const profileStore = useProfileStore()
  // 普通常量
  /**
   * 用于图标拖动，分别代表上一轮的鼠标所处位置
   */
  let prex = 0
  let prey = 0
  // DOM ref
  /**
   * amorChart DOM
   */
  const chartDOM = ref()
  // ref
  /**
   * 控制抽屉开闭
   */
  const drawerOpen = ref(true)
  /**
   * 抽屉方向
   */
  const drawerDirection = ref('right')
  /**
   * 抽屉页导航页数
   */
  const navId = ref(0)
  /**
   * 图表缩放倍数
   */
  const projectSize = ref(100)
  /**
   * 是否进行拖动
   */
  const draging = ref(false)
  /**
   * 画布固定top
   */
  const canvasTop = ref(80)
  /**
   * 画布固定left
   */
  const canvasLeft = ref(80)
  // reactive
  // inject
  // computed
  // watch
  // 事件方法
  /**
   * 处理导航页变化
   * @param id 目前变换id
   */
  function handleNavChange (id: number) {
    navId.value = id
  }
  /**
   * 处理移动图表画布位置鼠标按下开始移动
   * @param e 鼠标事件
   */
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

  /**
   * 处理移动图表画布位置鼠标移动
   * @param e 鼠标事件
   * @returns 
   */
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

  /**
   * 处理移动图表画布位置鼠标提起结束
   * @param e 鼠标事件
   * @returns 
   */
  function handleMouseup (e: any) {
    if (!draging.value) return
    e.stopPropagation()
    draging.value = false
  }
  /**
   * 处理图表上滚轮缩放
   * @param e 鼠标滚轮事件
   */
  function handleContentWheel (e: any) {
    // console.log(e)
    if (e.deltaY < 0) {
      projectSize.value = Math.min(500, projectSize.value + 10)
    } else {
      projectSize.value = Math.max(30, projectSize.value - 10)
    }
  }
  // 方法
  // 普通function函数
  /**
   * 下载图表
   */
  function updateCanvas () {
    const canvas = chartDOM.value.el.children[0]
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
  // provide
  // 生命周期
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

  // 这里是数据处理暴露
  const { 
    chartData,
    chartOption
  } = projectAppDataState(chartDOM)

  return {
    chartDOM,
    drawerOpen,
    drawerDirection,
    navId,
    projectSize,
    draging,
    canvasTop,
    canvasLeft,
    chartData,
    chartOption,
    handleNavChange,
    handleContentMousedown,
    handleContentWheel,
    updateCanvas
  }
}
