import Vue from 'vue'
import Router from 'vue-router'

import headlinesPage from '../pages/headlines.vue'
import homePage from '../pages/home.vue'

Vue.use(Router)

const router = new Router({
  root: '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/headlines',
      name: 'headlines',
      component: headlinesPage
    },
  ]
})

export default router
