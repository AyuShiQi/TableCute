// vue
import { reactive, watch } from 'vue'
// vue type
import type { Ref } from 'vue'
// 组件type
// 外部hooks
// 内部hooks
// 外部模块

export default function (chartDOM: Ref) {
  // 普通常量
  // DOM ref
  // ref
  // reactive
  /**
   * 图表数据
   */
  const chartData = reactive([
    ['类型', '数量'],
    ['高中', 482.3],
    ['学士', 568],
    ['硕士', 573.8],
    ['博士', 200]
  ])
  /**
   * 图表配置项
   */
  const chartOption = reactive({
    projectTitle: undefined,
    type: 0, // 条形图
    width: '600',
    height: '600',
    background: 'transparent',
    unitGap: 40,
    attention: {
      open: false,
      color: '#888',
      size: 12,
      font: 'serif'
    },
    padding: {
      x: 8,
      y: 8,
      gap: 8
    },
    data: [] as (number | string)[][],
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
      open: true,
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
      size: 11,
      align: 'top',
      font: 'serif' // 'Helvetica'// 'serif'
    }
  })
  // inject
  // computed
  // watch
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
    console.log(originLabel)
  }, { immediate: true })
  // 事件方法
  // 方法
  // 普通function函数
  // provide
  // 生命周期
  return {
    chartData,
    chartOption
  }
}
