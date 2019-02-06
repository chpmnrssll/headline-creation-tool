import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'
import settings from './modules/settings'
// import spriteJS from './modules/spriteJS'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    data,
    settings,
    // spriteJS,
  },
  // strict: debug,
  strict: true,
})
