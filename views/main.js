require("babel-polyfill");

import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import router from './router'
import store from '../store'
import './stylus/main.styl'


Vue.use(Vuetify, {
  theme: {
    primary: '#0d5173', //Main color
    primaryText: '#FFFFFF', //Color for text on primary
    secondary: '#269dd9', //Color for active nav
    lightText: '#000000' //Dark Text for light Backgrounds
  }
})

//Create the App with the router
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
