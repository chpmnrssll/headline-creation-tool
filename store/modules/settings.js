export default {
  namespaced: true,

  state: {
    background: {
      color: '#aaaaaa',
      height: null,
      pattern: {
        color: '#88888888',
        size: 8,
      },
      width: null,
    },
  },

  mutations: {
    setBackgroundColor(state, color) {
      state.background.color = color
    },
    setBackgroundWidth(state, width) {
      state.background.width = width
    },
    setBackgroundHeight(state, height) {
      state.background.height = height
    },
    setBackgroundSize(state, size) {
      state.background.pattern.size = size
    },
  },

  // actions: {
  // },
}
