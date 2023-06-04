import { createRouter, createWebHistory } from 'vue-router'

// home
const homeView  = () => import('../views/home-view/homeView.vue')
const newProjectView = () => import('../views/home-view/childComps/newProject.vue')


const loginView = () => import('../views/login-view/loginView')

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
        }
      ]
    },
    {
      path: '/login',
      component: loginView
    }
  ]
})
