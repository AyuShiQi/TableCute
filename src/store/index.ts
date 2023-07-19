import { ref } from 'vue'
import { createPinia, defineStore } from 'pinia'
import { getInfo } from '@/network/user'
import { jumpToLogin } from '@/global/router-option'

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

  function getProfile (nowToken?: string) {
    if (nowToken) token.value = nowToken
    getInfo(token.value).then(data => {
      if (data.code === 200) {
        userName.value = data.data.userName
        nickName.value = data.data.nickname
        email.value = data.data.email
        mobile.value = data.data.mobile
        avater.value = data.data.avatar
        isLogin.value = true
      } else {
        jumpToLogin()
      }
    })
  }

  return {
    isLogin,
    token,
    userName,
    nickName,
    avater,
    mobile,
    email,
    getProfile
  }
})
