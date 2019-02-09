import { http } from "../../views/config/http"
import mockHeadline from './mockHeadline'

export default {
  namespaced: true,

  state: {
    headlines: [],
    headlineLoaded: false,
    refreshImages: false,
    selectedHeadline: {},
    selectedLayer: {},
  },

  actions: {
    loadHeadlines(context) {
      http.get('headlines').then(response => {
        return new Promise((resolve, reject) => {
          context.commit('setHeadlines', response.data.headlines)
          resolve()
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
    },

    defaultHeadline(context) {
      return new Promise((resolve, reject) => {
        context.commit('setHeadlines', [mockHeadline])
        context.commit('setSelectedHeadline', mockHeadline.name)
        context.commit('setSelectedLayer', mockHeadline.layers.length - 1)
        resolve()
      })
    },
  },

  mutations: {
    setHeadlines(state, headlines) {
      headlines.forEach(headline => {
        headline.layers.forEach(layer => {
          if (layer.font) {
            if (undefined === layer.font.secondary) {
              layer.font.secondary = layer.font.primary
            }
          }
        })
      })
      state.headlines = headlines
    },

    setSelectedHeadline(state, name) {
      // Clear selected state for all headlines
      state.headlines.forEach(headline => headline.selected = false)

      // Set the headline with 'name' as selected
      state.selectedHeadline = state.headlines.find(headline => headline.name === name)
      state.selectedHeadline.selected = true
    },

    setSelectedHeadlineName(state, name) {
      state.selectedHeadline.name = name
    },

    setHeadlineLoaded(state, value) {
      state.headlineLoaded = value
    },

    setRefreshImages(state, value) {
      state.refreshImages = value
    },

    setSelectedLayer(state, zIndex) {
      // Clear selected state for all layers
      state.selectedHeadline.layers.forEach(layer => layer.selected = false)

      // Set the layer at zIndex as selected
      state.selectedLayer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      if(state.selectedLayer) {
        state.selectedLayer.selected = true
      }
      state.selectedHeadline.layers.sort((a, b) => a.zIndex - b.zIndex)
    },

    setSelectedLayerName(state, name) {
      state.selectedLayer.name = name
    },

    addLayer(state, newLayer) {
      state.selectedHeadline.layers.push({
        ...newLayer,
        zIndex: state.selectedHeadline.layers.length
      })
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

    setImage(state, image) {
      state.selectedLayer.image = image
      state.refreshImages = true
    },

    setText(state, text) {
      state.selectedLayer.text = text
    },

    setPrimaryFontSize(state, size) {
      state.selectedLayer.font.primary.size = size
    },
    setPrimaryFontFamily(state, family) {
      state.selectedLayer.font.primary.family = family
    },
    setPrimaryFontBold(state, value) {
      state.selectedLayer.font.primary.style.bold = value
    },
    setPrimaryFontItalic(state, value) {
      state.selectedLayer.font.primary.style.italic = value
    },
    setPrimaryFontUnderline(state, value) {
      state.selectedLayer.font.primary.style.underline = value
    },
    setPrimaryFontColor(state, event) {
      state.selectedLayer.font.primary.color = event.target.value
    },
    setPrimaryFontAlign(state, value) {
      state.selectedLayer.font.primary.style.align = value
    },

    setSecondaryFontSize(state, size) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.size = size
    },
    setSecondaryFontFamily(state, family) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.family = family
    },
    setSecondaryFontBold(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.bold = value
    },
    setSecondaryFontItalic(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.italic = value
    },
    setSecondaryFontUnderline(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.underline = value
    },
    setSecondaryFontColor(state, event) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.color = event.target.value
    },
    setSecondaryFontAlign(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.align = value
    }
  }
}
