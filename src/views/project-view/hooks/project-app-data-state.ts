// vue
import { onMounted, onUpdated, reactive, watch } from 'vue'
// vue type
import type { Ref } from 'vue'
// 组件type
// 外部hooks
// 内部hooks
// 外部模块
import { ViMessage } from 'viog-ui'
import { useRouter } from 'vue-router'
import { useProjectStore, useProfileStore } from '@/store'
import { initProjectData, initProjectOption } from '@/global/project-option'
import type { TuProject } from '@/network/interface/tab'

export default function (chartDOM: Ref) {
  const projectStore = useProjectStore()
  const profileStore = useProfileStore()
  const router = useRouter()
  const projectId = Number(router.currentRoute.value.query['project_id'])

  // console.log(router.currentRoute)
  // 普通常量
  // DOM ref
  // ref
  // reactive
  const projectData = reactive({} as Omit<TuProject, 'json1' | 'json2'>)
  /**
   * 图表数据
   */
  const chartData = reactive(initProjectData())
  /**
   * 图表配置项
   */
  const chartOption = reactive(initProjectOption(0))

  init()
  /**
   * 暂时处理图表变换bug，变化高度时若不进行控制处理可能会导致程序卡死
   */
  watch(chartOption, () => {
    if (Number(chartOption.height) <= 10) chartOption.height = '10'
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
    } = chartOption
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
  
  watch(projectStore.projectList, () => {
    let flag = false
    // console.log(projectStore.projectList.list)
    for (const project of projectStore.projectList.list) {
      if (project.id === projectId) {
        projectData.id = projectId
        projectData.updateTime = project.updateTime
        projectData.createTime = project.createTime
        projectData.url = project.url
        projectData.userId = project.userId
        // data
        chartData.length = 0
        chartData.push(...project.json1)
        for (const name in project.json2) {
          type ChartOption = typeof chartOption
          const curName: keyof ChartOption = name as never
          // 这个位置最大栈问题
          // chartOption[curName] = project.json2[name] as never
        }
        flag = true
        break
      } 
    }
  
    if (!flag) {
      ViMessage.append('该项目不存在', 2000)
      router.back()
    }
  })
  // 事件方法
  // 方法
  // 普通function函数
  function init () {
    let flag = false
    // console.log(projectStore.projectList.list)
    for (const project of projectStore.projectList.list) {
      if (project.id === projectId) {
        projectData.id = projectId
        projectData.updateTime = project.updateTime
        projectData.createTime = project.createTime
        projectData.url = project.url
        projectData.userId = project.userId
        // data
        chartData.length = 0
        chartData.push(...project.json1)
        // style
        for (const name in project.json2) {
          type ChartOption = typeof chartOption
          const curName: keyof ChartOption = name as never
          chartOption[curName] = project.json2[name] as never
        }
        flag = true
        break
      } 
    }
  }
  // provide
  // 生命周期
  return {
    projectData,
    chartData,
    chartOption
  }
}
