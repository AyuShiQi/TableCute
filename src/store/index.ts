import { ref, watch } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { getInfo, hasAccount as account } from '@/network/user'
import { jumpToLogin } from '@/global/router-option'
import { saveToken } from '@/global/local-storage-option'

const pinia = createPinia()

export default pinia

export const useProfileStore = defineStore('profile', () => {
  /**
   * 是否登录
   */
  const isLogin = ref(false)
  const token = ref()
  const userName = ref()
  const nickName = ref()
  const avater = ref()
  const mobile = ref()
  const email = ref()
  const hasAccount = ref(false)

  function getProfile (nowToken?: string) {
    if (nowToken) token.value = nowToken
    getInfo(token.value).then(data => {
      if (data.code === 200) {
        userName.value = data.data.userName
        nickName.value = data.data.nickname
        email.value = data.data.email
        mobile.value = data.data.mobile
        avater.value = data.data.avatar ?? 'https://s1.ax1x.com/2023/07/19/pC7Gi0s.png'
        isLogin.value = true
      } else {
        jumpToLogin()
      }
    })
    account(token.value).then(data => {
      hasAccount.value = data.code === 500 ? true : false
    })
  }

  function clearInfo () {
    token.value = undefined
    userName.value = undefined
    nickName.value = undefined
    avater.value = undefined
    mobile.value = undefined
    email.value = undefined
    hasAccount.value = false
    isLogin.value = false
    saveToken('')
  }

  watch(isLogin, (newVal: boolean) => {
    if (!newVal) jumpToLogin()
  })

  return {
    isLogin,
    token,
    userName,
    nickName,
    avater,
    mobile,
    email,
    hasAccount,
    getProfile,
    clearInfo
  }
})
