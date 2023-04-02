import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home-view/homeView'

const loginView = () => import('../views/login-view/loginView')

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: homeView
    },
    {
      path: '/login',
      component: loginView
    }
  ]
})
