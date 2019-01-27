import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import './stylus/main.styl'

Vue.use(Vuetify, {
  theme: {
    primary: '#9933cc', //Main color
    primaryText: '#FFFFFF', //Color for text on primary
    secondary: '#bb99cc', //Color for active nav
    lightText: '#000000' //Dark Text for light Backgrounds
  }
})

//Create the App with the router
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
