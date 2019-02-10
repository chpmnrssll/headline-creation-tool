export default {
  namespaced: true,

  state: {
    background: {
      blockSize: 6,
      color1: '#cccccc',
      color2: '#eeeeee',
      width: 800,
      height: 600,
    },
  },

  mutations: {
    setBackgroundColor1(state, color) {
      state.background.color1 = color
    },
    setBackgroundColor2(state, color) {
      state.background.color2 = color
    },
    setBackgroundWidth(state, width) {
      state.background.width = width
    },
    setBackgroundHeight(state, height) {
      state.background.height = height
    },
    setBackgroundSize(state, size) {
      state.background.blockSize = size
    },
  },

  // actions: {
  // },
}
