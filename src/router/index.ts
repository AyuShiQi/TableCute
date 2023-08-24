import { createRouter, createWebHistory } from 'vue-router'

// home
const homeView  = () => import('@/views/home-view/homeView.vue')
const newProjectView = () => import('@/views/home-view/childComps/newProject.vue')
const myProjectView = () => import('@/views/home-view/childComps/myProject.vue')
const templateCenterView = () => import('@/views/home-view/childComps/templateCenter.vue')
const profileView = () => import('@/views/home-view/childComps/profile.vue')
// my-project
const myProjectAllView = () => import('@/views/home-view/childComps/my-project/all-project.vue')
const myProjectTableView = () => import('@/views/home-view/childComps/my-project/table-project.vue')
const myProjectChartView = () => import('@/views/home-view/childComps/my-project/chart-project.vue')
const myProjectRecycleView = () => import('@/views/home-view/childComps/my-project/recycle-project.vue')

// login
const loginView = () => import('@/views/login-view/loginView')

// help center
const helpCenterView = () => import('@/views/help-view/help-view.vue')
const passwordFindView = () => import('@/views/help-view/childComps/password-find.vue')

// project
const projectView = () => import('@/views/project-view/project-view.vue')
// table
const tableView = () => import('@/views/table-view/table-view.vue')

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
          component: myProjectView,
          children: [
            {
              path: '/home/my-project/all',
              component: myProjectAllView
            },
            {
              path: '/home/my-project/table',
              component: myProjectTableView
            },
            {
              path: '/home/my-project/chart',
              component: myProjectChartView
            },
            {
              path: '/home/my-project/recycle',
              component: myProjectRecycleView
            }
          ]
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
    // 制作中心
    {
      path: '/project',
      name: 'project',
      component: projectView
    },
    {
      path: '/table',
      component: tableView
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
