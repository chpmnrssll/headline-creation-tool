export default {
  namespaced: true,

  state: {
    all: [],
    scene: {},
    selectedHeadline: {},
    selectedLayer: {}
  },

  mutations: {
    setSelectedLayer(state, zIndex) {
      // Clear border, borderAnimation, and selected state for all layers
      state.all.forEach(layer => {
        layer.selected = false
        layer.content.attr({
          border: layer.border || null
        })
        if (layer.borderAnimation) {
          layer.borderAnimation.cancel()
        }
      })

      // Set the layer at zIndex as selected
      state.selectedLayer = state.all.find(layer => layer.zIndex === zIndex)
      state.selectedLayer.selected = true
      state.selectedLayer.content.attr({
        border: {
          width: 4,
          style: [10, 10],
          color: '#eeeeee'
        }
      })

      // Animate border dashOffset
      state.selectedLayer.borderAnimation = state.selectedLayer.content.animate([{
        dashOffset: 20
      }], {
        duration: 1000,
        iterations: Infinity,
      })
    },

    setSelectedHeadline(state, headline) {
      state.selectedHeadline = headline
    },

    setScene(state, scene) {
      state.scene = scene
    },

    clearScene(state) {
      if (state.scene.children) {
        state.scene.children.forEach(child => {
          state.scene.removeChild(child)
        })
      }
    },

    updateLayerName(state, name) {
      let layer = state.all.find(layer => layer.selected)
      layer.content.attr({
        name: name
      })
      layer.name = name
    },

    updateLayerURL(state, url) {
      let layer = state.all.find(layer => layer.selected)
      layer.content.attr({
        textures: url
      })
      layer.url = url
    },

    updateLayerText(state, text) {
      let layer = state.all.find(layer => layer.selected)
      layer.content.attr({
        text: text
      })
      layer.text = text
    },

    updateLayerFontSize(state, size) {
      let layer = state.all.find(layer => layer.selected)
      layer.font.size = size
      layer.content.attr({
        font: `${layer.font.style} ${layer.font.size}px ${layer.font.family}`
      })
    },

    updateLayerFontFamily(state, family) {
      let layer = state.all.find(layer => layer.selected)
      layer.font.family = family
      layer.content.attr({
        font: `${layer.font.style} ${layer.font.size}px ${layer.font.family}`
      })
    },

    moveLayer(state, {
      zIndex,
      direction
    }) {
      const newZIndex = zIndex + direction
      let newLayer = state.all.find(layer => layer.zIndex === newZIndex)
      let currentLayer = state.all.find(layer => layer.zIndex === zIndex)

      if (currentLayer && newLayer) {
        currentLayer.spriteJSLayer.canvas.style.zIndex = newZIndex
        currentLayer.zIndex = newZIndex
        newLayer.spriteJSLayer.canvas.style.zIndex = zIndex
        newLayer.zIndex = zIndex
      }
    },

    setLayer(state, {
      index,
      layer
    }) {
      // layer.spriteJSLayer.canvas.style.zIndex = layer.zIndex
      state.all[index] = layer
    },

    setLayers(state, layers) {
      state.all = layers
    },
  },

  actions: {
    setLayer(context, {
      index,
      layer
    }) {
      context.commit('setLayer', {
        index: index,
        layer: layer
      })
    },

    loadMockLayers(context, payload) {
      context.commit('setLayers', mockLayers)
    },
  },
}

const mockLayers = [{
    layerType: 'image',
    name: 'Random 960x540 Image',
    url: 'https://picsum.photos/960/540/?random',
    zIndex: 0,
  },
  {
    layerType: 'text',
    name: 'Big Text',
    text: 'Headline Creation Tool',
    rotate: -5,
    translate: [0, -50],
    zIndex: 1,
    font: {
      family: 'Luckiest Guy',
      style: '',
      size: '80px',
      color: '#ffdc45',
    },
    shadow: {
      blur: 15,
      color: '#000',
      offset: [4, 8],
    },
  },
  {
    layerType: 'text',
    name: 'Little Text',
    text: 'Now with 99% More Canvas',
    rotate: -3,
    translate: [0, 25],
    zIndex: 2,
    font: {
      family: 'Permanent Marker',
      style: 'bold',
      size: '48px',
      color: '#bb99cc',
    },
    shadow: {
      blur: 5,
      color: '#000',
      offset: [2, 2],
    },
  },
]
