// vue
import { ref } from 'vue'
// vue type
// 组件type
// 外部hooks
// 内部hooks
// 外部模块
import { ViMessage } from 'viog-ui'
// 全局状态仓库
import { useProfileStore } from '@/store'
// 表单匹配规则
import {
  telephoneReg,
  emailReg
} from '@/regs/user';
// 网络接口
import {
  changePassword,
  updateInfo,
  getLPhoneAddSMS,
  getLPhoneUpdateSMS,
  changeMobile,
  bindMobile,
  bindEmail,
  addEmail,
  setAccount
} from '@/network/user'

export default function () {
  // 普通常量
  const profileStore = useProfileStore()

  // 账号绑定区
  const needAccount = ref(false)
  const username = ref('')
  const password = ref('')
  function bindAccountSubmit (formMap: any, res: boolean, option: any) {
    if (!res) return
    setAccount(profileStore.token, username.value, password.value).then(val => {
      if (val.code === 200) {
        ViMessage.append('账户绑定成功', 2000)
      }
    })
  }

  // 账号密码修改区
  const needPassword = ref(false)
  const oldPassword = ref('')
  const newPassword = ref('')

  function changPasswordSubmit (formMap: any, res: boolean, option: any) {
    if (!res) return
    console.log(res, profileStore.token)
    changePassword(oldPassword.value, newPassword.value, profileStore.token).then(val => {
      console.log(val)
      if (val.code === 200) {
        ViMessage.append('密码修改成功！', 2000)
        needPassword.value = false
        oldPassword.value = ''
        newPassword.value = ''
      } else {
        const feedbackMap = new Map<string, string>()
        if (val.message === '旧密码输入错误') {
          feedbackMap.set('oldpassword', val.message)
        }
        option.getSubmitFeedback(feedbackMap)
      }
    }).catch(err => {
      ViMessage.append('响应超时，请重试！', 2000)
    })
  }

  // 昵称修改区
  const needNickname = ref(false)
  const nickname = ref('')

  function changeNicknameSubmit (formMap: any, res: boolean, option: any) {
    updateInfo(profileStore.token, {
      'nickname': nickname.value
    }).then(val => {
      console.log(val)
      if (val.code === 200) {
        profileStore.nickName = nickname.value
        nickname.value = ''
        ViMessage.append('昵称修改成功！', 2000)
        needNickname.value = false
      } else {
        const feedbackMap = new Map<string, string>()
        feedbackMap.set('nickname', '非法昵称')
        option.getSubmitFeedback(feedbackMap)
      }
    }).catch(err => {
      ViMessage.append('响应超时，请重试！', 2000)
    })
    }

  // 头像修改区
  // 手机号区
  const needMobile = ref(false)
  const mobile = ref('')
  const mobileSMSCode = ref('')
  function changeMobileSubmit (formMap: any, res: boolean, option: any) {
    if (!res) return
    if (profileStore.mobile) {
      changeMobile(profileStore.token, profileStore.mobile, mobileSMSCode.value, mobile.value).then(val => {
        if (val.message === '验证码错误或者已经过期') {
          const feedbackMap = new Map<string, string>()
          feedbackMap.set('smscode', val.message)
          option.getSubmitFeedback(feedbackMap)
        } else {
          ViMessage.append('手机号绑定成功', 2000)
          profileStore.mobile = mobile.value
          mobile.value = ''
          mobileSMSCode.value = ''
          needMobile.value = false
        }
      })
    } else {
      bindMobile(profileStore.token, mobile.value, mobileSMSCode.value).then(val => {
        if (val.message === '验证码错误或过期') {
          const feedbackMap = new Map<string, string>()
          feedbackMap.set('smscode', val.message)
          option.getSubmitFeedback(feedbackMap)
        } else {
          ViMessage.append('手机号绑定成功', 2000)
          profileStore.mobile = mobile.value
          mobile.value = ''
          mobileSMSCode.value = ''
          needMobile.value = false
        }
      })
    }
  }

  function getMobileSMSCode (getSubmitFeedback: any) {
    const feedbackMap = new Map<string, string>()
    if (telephoneReg.test(mobile.value)) {
      getSubmitFeedback(feedbackMap)
      if (profileStore.mobile) {
        getLPhoneUpdateSMS(profileStore.token, mobile.value).then(val => {
          ViMessage.append('绑定手机验证码已发送', 2000)
        }).catch(err => {
          ViMessage.append('响应超时，请重试！', 2000)
        })
      } else {
      getLPhoneAddSMS(profileStore.token, mobile.value).then(val => {
          ViMessage.append('绑定手机验证码已发送', 2000)
      }).catch(err => {
          ViMessage.append('响应超时，请重试！', 2000)
      })
    }
    // 返回feedback
    } else {
      feedbackMap.set('mobile', '请输入有效的电话号码')
      getSubmitFeedback(feedbackMap)
    }
  }

  // 电子邮箱区
  const needEmail = ref(false)
  const email = ref('')
  const emailSMSCode = ref('')
  function changeEmailSubmit (formMap: any, res: boolean, option: any) {
    if (!res) return
    bindEmail(profileStore.token, email.value, emailSMSCode.value).then(val => {
      if (val.message === '验证码错误') {
        const feedbackMap = new Map<string, string>()
        feedbackMap.set('smscode', val.message)
        option.getSubmitFeedback(feedbackMap)
      } else {
        ViMessage.append('邮箱绑定成功', 2000)
        profileStore.email = email.value
        email.value = ''
        emailSMSCode.value = ''
        needEmail.value = false
      }
    })
  }

  function getEmailSMSCode (getSubmitFeedback: any) {
    const feedbackMap = new Map<string, string>()
    if (emailReg.test(email.value)) {
      getSubmitFeedback(feedbackMap)
      addEmail(profileStore.token, email.value).then(val => {
        ViMessage.append('绑定邮箱验证码已发送', 2000)
      }).catch(err => {
        ViMessage.append('响应超时，请重试！', 2000)
      })
    // 返回feedback
    } else {
      feedbackMap.set('email', '请输入有效的邮箱')
      getSubmitFeedback(feedbackMap)
    }
  }

  function dropAccount () {
    console.log('ok')
    profileStore.clearInfo()
  }

  return {
    profileStore,
    // 账号绑定区
    needAccount,
    username,
    password,
    bindAccountSubmit,
    // 账号密码修改区
    needPassword,
    oldPassword,
    newPassword,
    changPasswordSubmit,
    // 昵称修改区
    needNickname,
    nickname,
    changeNicknameSubmit,
    // 头像修改区
    // 手机号区
    needMobile,
    mobile,
    mobileSMSCode,
    changeMobileSubmit,
    getMobileSMSCode,
    // 电子邮箱区
    needEmail,
    email,
    emailSMSCode,
    changeEmailSubmit,
    getEmailSMSCode,
    // 账户注销
    dropAccount
  }
}
