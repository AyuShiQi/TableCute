import { createRouter, createWebHistory } from 'vue-router'

// home
const homeView  = () => import('../views/home-view/homeView.vue')
const newProjectView = () => import('@/views/home-view/childComps/newProject.vue')
const myProjectView = () => import('@/views/home-view/childComps/myProject.vue')
const templateCenterView = () => import('@/views/home-view/childComps/templateCenter.vue')
const profileView = () => import('@/views/home-view/childComps/profile.vue')

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
      redirect: '/home/new-project'
    },
    {
      path: '/home',
      component: homeView,
      children: [
        {
          path: '/home/new-project',
          component: newProjectView
        },
        {
          path: '/home/my-project',
          component: myProjectView
        },
        {
          path: '/home/tc',
          component: templateCenterView
        },
        {
          path: '/home/profile',
          component: profileView
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
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/not-found-view/not-found-view.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    }
  ]
})
