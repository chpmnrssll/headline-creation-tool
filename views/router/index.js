import Vue from 'vue'
import Router from 'vue-router'

import headlinesPage from '../pages/headlines.vue'
import homePage from '../pages/home.vue'

Vue.use(Router)

const router = new Router({
  root: '/home',
  routes: [{
      path: '/headlines',
      name: 'headlines',
      component: headlinesPage
    },
    {
      path: '/home',
      name: 'home',
      component: homePage
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
