import { http } from "../../views/config/http.js"

export default {
  namespaced: true,

  state: {
    headlines: [],
    headlineLoaded: false,
    selectedHeadline: {},
    selectedLayer: {},
    // selectedLayerFont: '',
  },

  getters: {
    getSpriteJSFont: (state, getters) => (name) => {
      let layer = getters.selectedHeadline.layers.find(layer => layer.name = name)
      return `${getters.selectedLayer.font.style} ${getters.selectedLayer.font.size}px ${getters.selectedLayer.font.family}`
    },
    getSpriteJSLayer: (state, getters) => (name) => {
      return {
        ...getters.selectedHeadline.layers.find(layer => layer.name = name),
        font: getters.getSpriteJSFont(name)
      }
    }
  },

  actions: {

    loadHeadlines(context) {
      http
        .get("headlines")
        .then(response => {
          return new Promise((resolve, reject) => {
            context.commit('headlines', response.data.headlines)
            resolve()
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    defaultHeadline(context) {
      return new Promise((resolve, reject) => {
        context.commit('headlines', [ mockHeadline ])
        context.commit('setSelectedHeadline', mockHeadline.name)
        context.commit('setSelectedLayer', mockHeadline.layers.length - 1)
        resolve()
      })
    },
  },

  mutations: {
    headlines(state, headlines) {
      state.headlines = headlines
    },

    setHeadlineLoaded(state, value) {
      state.headlineLoaded = value
    },

    setSelectedHeadline(state, name) {
      // Clear selected state for all headlines
      state.headlines.forEach(headline => headline.selected = false)

      // Set the headline with 'name' as selected
      state.selectedHeadline = state.headlines.find(headline => headline.name === name)
      state.selectedHeadline.selected = true
    },

    setSelectedLayer(state, zIndex) {
      // Clear selected state for all layers
      state.selectedHeadline.layers.forEach(layer => layer.selected = false)

      // Set the layer at zIndex as selected
      state.selectedLayer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      state.selectedLayer.selected = true
      state.selectedHeadline.layers.sort((a, b) => a.zIndex - b.zIndex)
    },

    moveLayer(state, { zIndex, direction }) {
      const newZIndex = zIndex + direction
      let oldLayer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      let newLayer = state.selectedHeadline.layers.find(layer => layer.zIndex === newZIndex)
      if (oldLayer && newLayer) {
        oldLayer.zIndex = newZIndex
        newLayer.zIndex = zIndex
      }
    },

    removeLayer(state, zIndex) {
      state.selectedHeadline.layers = state.selectedHeadline.layers.filter(layer => layer.zIndex !== zIndex)
    },

    updateSelectedHeadlineName(state, name) {
      state.selectedHeadline.name = name
    },
    updateSelectedLayerName(state, name) {
      state.selectedLayer.name = name
    },
    updateSelectedLayerTextures(state, textures) {
      state.selectedLayer.textures = textures
    },
    updateSelectedLayerText(state, text) {
      state.selectedLayer.text = text
    },
    updateSelectedLayerPrimaryFontColor(state, e) {
      state.selectedLayer.font.primary.color = e.target.value
    },
    updateSelectedLayerPrimaryFontFamily(state, family) {
      state.selectedLayer.font.primary.family = family
    },
    updateSelectedLayerPrimaryFontSize(state, size) {
      state.selectedLayer.font.primary.size = size
    },
    updateSelectedLayerSecondaryFontColor(state, e) {
      state.selectedLayer.font.secondary.color = e.target.value
    },
    updateSelectedLayerSecondaryFontFamily(state, family) {
      state.selectedLayer.font.secondary.family = family
    },
    updateSelectedLayerSecondaryFontSize(state, size) {
      state.selectedLayer.font.secondary.size = size
    },
  },
}

const mockHeadline = {
  name: 'mock headline',
  layers: [{
    anchor: [0.5, 0.5],
    layerType: 'image',
    name: 'Random 960x540 Image',
    pos: ['50%', '50%'],
    textures: 'https://picsum.photos/640/280/?random',
    zIndex: 0,
  },
  {
    anchor: [0.5, 0.5],
    font: {
      primary: {
        color: '#ffdc45',
        family: 'Luckiest Guy',
        style: '',
        size: 48,
      }
    },
    layerType: 'text',
    name: 'Big Text',
    pos: ['50%', '50%'],
    rotate: -5,
    shadow: {
      blur: 15,
      color: '#000',
      offset: [4, 8],
    },
    text: 'Headline Creation Tool',
    translate: [0, -50],
    zIndex: 1,
  },
  {
    anchor: [0.5, 0.5],
    font: {
      primary: {
        color: '#bb99cc',
        family: 'Permanent Marker',
        style: '',
        size: 32,
      },
      secondary: {
        color: '#99ccbb',
        family: 'Luckiest Guy',
        style: 'bold',
        size: 64,
      }
    },
    layerType: 'text',
    name: 'Little Text',
    pos: ['50%', '50%'],
    rotate: -3,
    shadow: {
      blur: 5,
      color: '#000',
      offset: [2, 2],
    },
    text: 'Now with {{99%}} More Canvas',
    translate: [0, 25],
    zIndex: 2,
  }]
}
