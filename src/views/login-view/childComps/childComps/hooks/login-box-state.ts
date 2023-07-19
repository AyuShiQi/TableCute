// vue
import { ref } from 'vue'
// vue type
// 组件type
// 外部hooks
// 内部hooks
import limitSmscodeState from './limit-smscode-state'
// 外部模块
import { jumpToHome, jumpToFinPassword } from '@/global/router-option'
import { ViToast, ViMessage } from 'viog-ui'
import { telephoneReg } from '@/regs/user'
// 网络接口
import { toLogin } from '@/network/user'
import { toGetSMCode, telLogin } from "@/network/passport"
// 仓库
import { useProfileStore } from '@/store'

export default function () {
  const limitSmscode = limitSmscodeState()
  // 普通常量
  // DOM ref
  // ref
  /**
   * 是否处于手机验证码登录端
   */
  const tel = ref(false)
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
  /**
   * 登录中提示
   */
  const isLoging = ref(false)
  /**
   * 手机号码前缀选择
   */
  const telPrefix = ref()
  // reactive
  /**
   * profile仓库
   */
  const profileStore = useProfileStore()
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
    if (isLoging.value) return
    submit()
  }
  /**
   * 处理向后端提交数据，vi-form组件的提交事件
   * @param formMap 收集表单数据集
   * @param res 规则匹配结果
   * @param option 包括规则匹配详细结果集 resMap 与 反馈数据信息函数 getSubmitFeedback
   */
  function handleSubmit (formMap: Map<string, any>, res: boolean, option: any) {
    // console.log(res)
    // console.log(formMap)
    // console.log(tel.value, !res)
    if (!res) return
    isLoging.value = true
    if (!tel.value) {
      // 这里是账户密码登录
      toLogin(username.value, password.value).then(val => {
        isLoging.value = false
        // console.log(val)
        const feedbackMap = new Map<string, string>()
        // 登录成功，跳转去首页
        if (val.code === 200) {
          ViMessage.append('登录成功！为您跳转至首页', 2000)
          profileStore.getProfile(`Bearer ${val.data.tokenValue}`)
          // 这一步还要进行token获取信息
          jumpToHome(val.data.tokenName, val.data.tokenValue)
        // 表示验证码错误
        } else if (val.message === '用户不存在') {
          feedbackMap.set('username', val.message)
          option.getSubmitFeedback(feedbackMap)
        } else if (val.message === '密码错误') {
          feedbackMap.set('password', val.message)
          option.getSubmitFeedback(feedbackMap)
        }
      })
    } else {
      // 这里是手机验证码登录
      toDoLogin().then((val) => {
        isLoging.value = false
        // console.log(val)
        const feedbackMap = new Map<string, string>()
        // 登录成功，跳转去首页
        if (val.code === 200) {
          ViMessage.append('登录成功！为您跳转至首页', 2000)
          // profileStore.isLogin = val.data.isLogin
          profileStore.getProfile(`Bearer ${val.data.tokenValue}`)
          // 这一步还要进行token获取信息
          jumpToHome(val.data.tokenName, val.data.tokenValue)
        // 表示验证码错误
        } else if (val.code === 506) {
          feedbackMap.set('smscode', '验证码错误')
          option.getSubmitFeedback(feedbackMap)
        }
      })
    }
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
        // console.log(val)
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

  /**
   * 找回密码处理
   */
  function handleFindPassword () {
    jumpToFinPassword()
  }
  // 方法
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
    isLoging,
    telPrefix,
    changeLoginMethod,
    handleSubmit,
    handleClick,
    handleFindPassword,
    getSMCode
  }
}
