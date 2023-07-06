// vue
// vue type
// 组件type
// 外部hooks
// 内部hooks
// 外部模块
import router from "@/router"

export function jumpToHome (tokenName: string, token: string) {
  // 保存token
  localStorage.setItem('tableCuteSatoken', `Bearer ${token}`)
  router.push({ path: '/home/new-project' })
}

export function jumpToLogin () {
  router.push({ path: '/login' })
}

export function jumpToFinPassword () {
  router.push({ path: '/hc/password_find'})
}