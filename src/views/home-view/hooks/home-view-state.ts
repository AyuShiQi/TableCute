// vue
import { ref } from 'vue'
// vue type
// 组件type
// 外部hooks
// 内部hooks
// 外部模块

export default function () {
  // 普通常量
  // DOM ref
  const menuOpen = ref(true)
  // ref
  // reactive
  // inject
  // computed
  // 事件方法
  function changeMenuOpen () {
    menuOpen.value = !menuOpen.value
  }
  // 方法
  // 普通function函数
  // provide
  // 生命周期
  return {
    menuOpen,
    changeMenuOpen
  }
}
