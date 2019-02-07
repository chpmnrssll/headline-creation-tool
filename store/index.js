import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'
import settings from './modules/settings'
// import canvas from './modules/canvas'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    data,
    settings,
    // canvas,
  },
  // strict: debug,
  strict: true,
})
