export default {
  namespaced: true,

  state: {
    all: [],
    selectedLayer: {}
  },

  mutations: {
    setSelectedLayer(state, zIndex) {
      state.all.forEach(layer => layer.selected = false)
      state.selectedLayer = state.all.find(layer => layer.zIndex === zIndex)
      state.selectedLayer.selected = true
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
      layer.content.text = text
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

    moveLayer(state, { zIndex, direction }) {
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

    setLayer(state, { index, layer }) {
      state.all[index] = layer
    },

    setLayers(state, layers) {
      state.all = layers
    },
  },

  actions: {
    setLayer(context, { index, layer }) {
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
