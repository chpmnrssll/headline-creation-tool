import Vue from 'vue'
import Vuex from 'vuex'
import layers from './modules/layers'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    layers,
    settings
  },
  strict: debug,
})
