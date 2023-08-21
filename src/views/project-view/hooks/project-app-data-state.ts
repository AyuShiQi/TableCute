// vue
import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue'
// vue type
import type { Ref } from 'vue'
// 组件type
// 外部hooks
// 内部hooks
// 外部模块
import qs from 'qs'
import { ViMessage } from 'viog-ui'
import { useRouter } from 'vue-router'
import { useProjectStore, useProfileStore } from '@/store'
import { handleJsonStyle } from '@/global/project-option'
import { updateProj } from '@/network/tab'
import type { TuProject } from '@/network/interface/tab'

export default function (chartDOM: Ref) {
  const projectStore = useProjectStore()
  const profileStore = useProfileStore()
  const router = useRouter()
  // console.log(router.currentRoute.value)
  const tempProject = qs.parse(router.currentRoute.value.query.info as string)
  // console.log(router.currentRoute)
  // 普通常量
  // DOM ref
  // ref
  const isUpdating = ref(false)
  // reactive
  const projectData = reactive({
    createTime: tempProject.createTime as string,
    id: tempProject.id as unknown as number,
    type: tempProject.type as unknown as number,
    updateTime: tempProject.updateTime as string,
    userId: tempProject.userId as unknown as number,
  } as Omit<TuProject, 'json1' | 'json2'>)
  // console.log(JSON.parse(JSON.stringify(tempProject.json2)))
  /**
   * 图表数据
   */
  const chartData = reactive(tempProject.json1 as any[])
  /**
   * 图表配置项
   */
  const chartOption = reactive({
    style: handleJsonStyle(tempProject.json2) as any
  })

  /**
   * 暂时处理图表变换bug，变化高度时若不进行控制处理可能会导致程序卡死
   */
  watch(chartOption, () => {
    if (Number(chartOption.style.height) <= 10) chartOption.style.height = '10'
    // console.log(chartOption.style)
    if (chartDOM.value) chartDOM.value.render()
  }, { immediate: false })
  /**
   * 监听data变化并改变配置项中label渲染
   */
  watch(chartData, () => {
    const {
      data: originData,
      label: {
        content: originLabel
      }
    } = chartOption.style
    console.log(chartOption.style)
    originData.length = 0
    originLabel.length = 0
    if (chartData[0]) {
      originData.push([...chartData[0]])
    }
    for (let i = 1; i < chartData.length; i++) {
      if (chartData[i][0] === undefined) break 
      originData.push([])
      // 此处添加origin颜色变化
      originLabel.push({
        tag: String(chartData[i][0]),
        color: '#aaa'
      })
      originData[i][0] = chartData[i][0]
      let curData = 0
      for (let j = 1; j < chartData[i].length; j++) {
        const cur = Number(chartData[i][j])
        if (!Number.isNaN(cur)) {
          curData += cur
        }
      }
      originData[i][1] = curData
    }
    // console.log(originLabel)
  }, { immediate: true })
  
  // watch(projectStore.projectList, () => {
  //   let flag = false
  //   // console.log(projectStore.projectList.list)
  //   for (const project of projectStore.projectList.list) {
  //     if (project.id === projectId) {
  //       projectData.id = projectId
  //       projectData.updateTime = project.updateTime
  //       projectData.createTime = project.createTime
  //       projectData.url = project.url
  //       projectData.userId = project.userId
  //       // data
  //       chartData.length = 0
  //       chartData.push(...project.json1)
  //       chartOption.style = project.json2
  //       flag = true
  //       break
  //     } 
  //   }
  
  //   if (!flag) {
  //     ViMessage.append('该项目不存在', 2000)
  //     router.back()
  //   }
  // }, { immediate: false })
  // 事件方法
  function updateCanvas () {
    isUpdating.value = true
    updateProj(projectData.id, chartData, chartOption.style, profileStore.token).then(val => {
      if (val.code === 200) {
        projectStore.updateProjectList(profileStore.token).then(val => {
          isUpdating.value = false
          ViMessage.append('保存成功！', 2000)
          router.replace({
            path: '/project',
            query: {
              'project_id': projectData.id,
              info: qs.stringify({
                json1: chartData,
                json2: chartOption.style,
                ...projectData
              })
            }
          })
        })
      }
    })
  }
  // 方法
  function unloadUpdate (e: Event) {
    e.preventDefault()
    updateProj(projectData.id, chartData, chartOption.style, profileStore.token).then(val => {
      if (val.code === 200) {
        projectStore.updateProjectList(profileStore.token).then(val => {
          isUpdating.value = false
          ViMessage.append('自动为您保存', 2000)
          router.replace({
            path: '/project',
            query: {
              'project_id': projectData.id,
              info: qs.stringify({
                json1: chartData,
                json2: chartOption.style,
                ...projectData
              })
            }
          })
        })
      }
    })
    return ""
  }
  // 普通function函数
  // provide
  // 生命周期
  onMounted(() => {
    window.addEventListener('beforeunload', unloadUpdate)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', unloadUpdate)
  })
  return {
    isUpdating,
    projectData,
    chartData,
    chartOption,
    updateCanvas
  }
}
