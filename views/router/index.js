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
      // name: 'canvas',
      component: canvasPage
    },
    {
      path: '/headlines',
      // name: 'headlines',
      component: headlinesPage
    },
    {
      path: '/headlines/:id',
      // name: 'headlines',
      component: canvasPage
    },
  ]
})

export default router
