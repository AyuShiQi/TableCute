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
  // ref
  /**
   * 用于60秒验证机制值表示
   */
  const smsTime = ref('0s')
  // reactive
  // inject
  // computed
  // 事件方法
  // 方法
  /**
   * 开启验证码60秒访问机制
   */
  const openSmsCodeWait = (function () {
    let timer: NodeJS.Timer | undefined = undefined
      return () => {
        if (timer) return
        let nowTime = 60
        smsTime.value = `${nowTime}s`
        timer = setInterval(() => {
        nowTime--
        if (nowTime === -1) {
            clearInterval(timer)
            timer = undefined
        } else smsTime.value = `${nowTime}s`
      }, 1000)
    }
  }())
  // 普通function函数
  // provide
  // 生命周期
  return {
    smsTime,
    openSmsCodeWait
  }
}
