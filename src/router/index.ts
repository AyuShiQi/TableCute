import { createRouter, createWebHistory } from 'vue-router'


const homeView  = () => import('../views/home-view/homeView.vue')
const loginView = () => import('../views/login-view/loginView')

const newProjectView = () => import('../views/home-view/homeView.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
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
    }
  ]
})
