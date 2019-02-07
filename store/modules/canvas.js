const { Scene, Sprite, Label, Layer } = spritejs

export default {
  namespaced: true,

  state: {
    scene: null,
    layers: [],
  },

  getters: {
    selectedLayer(state, getters) {
      return state.layers.find(layer => layer.selected)
    },
  },

  actions: {
    newLayer(context, layerData) {
      let layer = new Layer(layerData.name)
      let content = {}

      if (layerData.layerType === 'image') {
        content = new Sprite(layerData)
      } else if (layerData.layerType === 'text') {
        content = new Label(layerData)
      }

      layer.append(content)
      context.commit('newLayer', layer)
    },
  },

  mutations: {
    newScene(state, { container, options }) {
      // clear old scene if it exists
      if (state.scene && state.scene.children) {
        state.scene.children.forEach(child => state.scene.removeChild(child))
      } else {
        state.scene = new Scene(container, options)
      }
    },

    newLayer(state, layer) {
      // let layer = new Layer(content.name, {})
      // layer.append(content)
      console.warn(layer)
      state.layers.push(layer)
    },

    clearSelectedLayer(state) {
      // Clear border, borderAnimation, and selected state for all layers
      state.layers.forEach(layer => {
        layer.selected = false
        layer.content.attr({
          border: layer.border || null
        })
        if (layer.borderAnimation) {
          layer.borderAnimation.cancel()
        }
      })
    },

    setSelectedLayer(state, zIndex) {
      // Set the layer at zIndex as selected
      state.selectedLayer = state.layers.find(layer => layer.zIndex === zIndex)
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

    updateSelectedLayerName(state, name) {
      state.selectedLayer.content.attr({ name: name })
    },
    updateSelectedLayerURL(state, url) {
      state.selectedLayer.content.attr({ textures: url })
    },
    updateSelectedLayerText(state, text) {
      state.selectedLayer.content.attr({ text: text })
    },
    updateSelectedLayerFont(state, font) {
      state.selectedLayer.content.attr({ font: font })
    },

    moveLayer(state, { zIndex, direction }) {
      const newZIndex = zIndex + direction
      let newLayer = state.layers.find(layer => layer.zIndex === newZIndex)
      let currentLayer = state.layers.find(layer => layer.zIndex === zIndex)

      if (currentLayer && newLayer) {
        currentLayer.canvas.style.zIndex = newZIndex
        currentLayer.content.attr({ zIndex: newZIndex })
        newLayer.canvas.style.zIndex = zIndex
        newLayer.content.attr({ zIndex: zIndex })
      }
    },

  },
}
