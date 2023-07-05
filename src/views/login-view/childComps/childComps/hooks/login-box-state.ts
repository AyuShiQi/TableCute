// vue
import { ref } from 'vue'
// vue type
// 组件type
// 外部hooks
// 内部hooks
import limitSmscodeState from './limit-smscode-state'
// 外部模块
import router from "@/router"
import { ViToast } from 'viog-ui'
import { telephoneReg } from '@/regs/user'
// 网络接口
import { toLogin } from '@/network/user'
import { toGetSMCode, telLogin } from "@/network/passport"

export default function () {
  const limitSmscode = limitSmscodeState()
  // 普通常量
  // DOM ref
  // ref
  /**
   * 是否处于手机验证码登录端
   */
  const tel = ref(true)
  // 以下是表单接收数据
  /**
   * 账号表单值
   */
  const username = ref()
  /**
   * 密码表单值
   */
  const password = ref()
  /**
   * 手机号表单值
   */
  const loginTel = ref()
  /**
   * 手机验证码表单值
   */
  const telCode = ref()
  // reactive
  // inject
  // computed
  // 事件方法
  /**
   * 切换登录方式处理函数
   */
  function changeLoginMethod () {
    tel.value = !tel.value
  }
  /**
   * 处理登录按钮点击
   * @param submit vi-form组件中用于触发submit的函数
   */
  function handleClick (submit: () => void) {
    submit()
  }
  /**
   * 处理向后端提交数据，vi-form组件的提交事件
   * @param formMap 收集表单数据集
   * @param res 规则匹配结果
   * @param option 包括规则匹配详细结果集 resMap 与 反馈数据信息函数 getSubmitFeedback
   */
  function handleSubmit (formMap: Map<string, any>, res: boolean, option: any) {
    console.log(res)
    console.log(formMap)
    if (!res) return
    if (!tel.value) toLogin(username.value, password.value).then(val => console.log(val))
    else toDoLogin().then((val) => {
      const feedbackMap = new Map<string, string>()
      // 登录成功，跳转去首页
      if (val.code === 200) {
        // 这一步还要进行token获取信息
        jumpToHome(val.data.token)
      // 表示验证码错误
      } else if (val.code === 506) {
        feedbackMap.set('smscode', '验证码错误')
        option.getSubmitFeedback(feedbackMap)
      }
    })
  }

  /**
   * 点击获取验证码处理函数
   * @param getSubmitFeedback 反馈数据信息函数
   */
  function getSMCode (getSubmitFeedback: (infoMap: any) => void) {
    const feedbackMap = new Map<string, string>()
    if (!telephoneReg.test(loginTel.value)) {
      feedbackMap.set('telephone', '请输入有效的电话号码')
    } else {
      // 发送验证码
      toGetSMCode(loginTel.value)
      .then((val: any) => {
        console.log(val)
        if (val.code === 505) {
          ViToast.open(val.message)
        }
      })
      // 开启60秒访问机制
      limitSmscode.openSmsCodeWait()
    }
    getSubmitFeedback(feedbackMap)
  }

  /**
   * 账号密码登录
   * @returns 接口then
   */
  function toDoLogin () {
    return telLogin(loginTel.value, telCode.value)
  }
  // 方法
  /**
   * 保存token并跳转到首页
   */
  function jumpToHome (token: string) {
    // 保存token
    router.push({ path: '/' })
  }
  // 普通function函数
  // provide
  // 生命周期
  return {
    ...limitSmscode,
    tel,
    username,
    password,
    loginTel,
    telCode,
    changeLoginMethod,
    handleSubmit,
    handleClick,
    getSMCode
  }
}
