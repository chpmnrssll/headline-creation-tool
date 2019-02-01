import Vue from 'vue'
import Vuex from 'vuex'
import layers from './modules/layers'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    layers
  },
  strict: debug,
})
