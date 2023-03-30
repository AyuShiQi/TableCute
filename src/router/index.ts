import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home-view/homeView'

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
    }
  ]
})
