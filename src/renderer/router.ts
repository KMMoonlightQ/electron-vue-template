import * as VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./App.vue')
  }
]

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
})
