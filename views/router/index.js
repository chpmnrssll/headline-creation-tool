import Vue from 'vue'
import Router from 'vue-router'

import headlinesPage from '../pages/headlines.vue'
import canvasPage from '../pages/canvas.vue'

Vue.use(Router)

const router = new Router({
  root: '/',
  routes: [
    {
      path: '/',
      component: canvasPage
    },
    {
      path: '/headlines',
      component: headlinesPage
    },
    {
      path: '/headlines/:id',
      component: canvasPage
    },
  ]
})

export default router
