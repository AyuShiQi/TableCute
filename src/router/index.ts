import { createRouter, createWebHistory } from 'vue-router'

// home
const homeView  = () => import('../views/home-view/homeView.vue')
const newProjectView = () => import('@/views/home-view/childComps/newProject.vue')

// login
const loginView = () => import('@/views/login-view/loginView')

// help center
const helpCenterView = () => import('@/views/help-view/help-view.vue')
const passwordFindView = () => import('@/views/help-view/childComps/password-find.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: homeView,
      children: [
        {
          path: '/home/new-project',
          component: newProjectView
        }
      ]
    },
    {
      path: '/login',
      component: loginView
    },
    // 帮助中心
    {
      path: '/hc',
      component: helpCenterView,
      children: [
        {
          path: '/hc/password_find',
          component: passwordFindView
        }
      ]
    }
  ]
})
