import { http } from "../../views/config/http"
import mockHeadline from './mockHeadline'

export default {
  namespaced: true,

  state: {
    headlines: [],
    headlineLoaded: false,
    refreshImages: false,
    refreshText: false,
    refreshClickMask: false,
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

    setFont({commit, state}, {desc, key, value}) {
      return new Promise((resolve, reject) => {
        if (!state.selectedLayer.font[desc]) {
          state.selectedLayer.font[desc] = {}
        }
        commit(`setFont${key}`, {desc, value})
        resolve()
      })
    }
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

    setHeadlineLoaded(state, value) {
      state.headlineLoaded = value
    },

    setRefreshImages(state, value) {
      state.refreshImages = value
    },

    setRefreshText(state, value) {
      state.refreshText = value
    },

    setRefreshClickMask(state, value) {
      state.refreshClickMask = value
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

    setWidth(state, {zIndex, width}) {
      let layer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      layer.width = width
    },
    setHeight(state, {zIndex, height}) {
      let layer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      layer.height = height
    },
    setSize(state, {zIndex, size}) {
      let layer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      layer.size = size
    },
    setLines(state, {zIndex, lines}) {
      let layer = state.selectedHeadline.layers.find(layer => layer.zIndex === zIndex)
      layer.lines = lines
    },

    // selectedLayer mutations
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
    setImage(state, image) {
      state.selectedLayer.image = image
      state.refreshImages = true
    },
    setText(state, text) {
      state.selectedLayer.text = text
      state.refreshText = true
    },
    setTranslateX(state, value) {
      state.selectedLayer.translate.x = value
    },
    setTranslateY(state, value) {
      state.selectedLayer.translate.y = value
    },
    setRotation(state, value) {
      state.selectedLayer.rotation = value
    },
    setScaleX(state, value) {
      state.selectedLayer.scale.x = value
    },
    setScaleY(state, value) {
      state.selectedLayer.scale.y = value
    },

    setFontSize(state, {desc, value}) {
      state.selectedLayer.font[desc].size = value
    },
    setFontLineHeight(state, {desc, value}) {
      state.selectedLayer.font[desc].lineHeight = value
    },
    setFontFamily(state, {desc, value}) {
      state.selectedLayer.font[desc].family = value
    },
    setFontBold(state, {desc, value}) {
      state.selectedLayer.font[desc].style.bold = value
    },
    setFontItalic(state, {desc, value}) {
      state.selectedLayer.font[desc].style.italic = value
    },
    setFontUnderline(state, {desc, value}) {
      state.selectedLayer.font[desc].style.underline = value
    },
    setFontColor(state, {desc, value}) {
      state.selectedLayer.font[desc].color = value
    },
    setFontShadowColor(state, {desc, value}) {
      state.selectedLayer.font[desc].shadow.color = value
    },
    setFontAlign(state, {desc, value}) {
      state.selectedLayer.font[desc].style.align = value
    },
    setFontShadowBlur(state, {desc, value}) {
      state.selectedLayer.font[desc].shadow.blur = value
    },
    setFontShadowOffsetX(state, {desc, value}) {
      state.selectedLayer.font[desc].shadow.offset.x = value
    },
    setFontShadowOffsetY(state, {desc, value}) {
      state.selectedLayer.font[desc].shadow.offset.y = value
    },
  }
}
