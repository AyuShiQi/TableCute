export function initProjectOption (type: number) {
  return {
    projectTitle: undefined,
    type, // 条形图
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
    data: [
      ['']
    ] as (number | string)[][],
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
        ['']
      ] as any[],
      color: '#aaa',
      size: 11,
      align: 'top',
      font: 'serif' // 'Helvetica'// 'serif'
    }
  }
}

export function initProjectData () {
  return [
    ['类型', '数量'],
    ['高中', 482.3],
    ['学士', 568],
    ['硕士', 573.8],
    ['博士', 200]
  ]
}

export function handleJsonStyle (style: any) {
  style.attention.open = Boolean(style.attention.open)
  style.attention.size = Number(style.attention.size)
  style.axis.x.label = Boolean(style.axis.x.label)
  style.axis.y.label = Boolean(style.axis.y.label)
  style.axis.x.labelSize = Number(style.axis.x.labelSize)
  style.axis.y.labelSize = Number(style.axis.y.labelSize)
  style.info.sourceSize = Number(style.info.sourceSize)
  style.info.unitSize = Number(style.info.unitSize)
  style.label.open = Boolean(style.label.open)
  style.label.size = Number(style.label.size)
  style.padding.gap = Number(style.padding.gap)
  style.padding.x = Number(style.padding.x)
  style.padding.y = Number(style.padding.y)
  style.title.size = Number(style.title.size)
  style.type = Number(style.type)
  style.unitGap = Number(style.unitGap)
  style.width = Number(style.width)
  style.height = Number(style.height)

  return style
}