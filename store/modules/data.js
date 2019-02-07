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
      http.get("headlines").then(response => {
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
        context.commit('headlines', [mockHeadline])
        context.commit('setSelectedHeadline', mockHeadline.name)
        context.commit('setSelectedLayer', mockHeadline.layers.length - 1)
        resolve()
      })
    },
  },

  mutations: {
    headlines(state, headlines) {
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
      if(state.selectedLayer) {
        state.selectedLayer.selected = true
      }
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

    addLayer(state, newLayer) {
      state.selectedHeadline.layers.push({
        ...newLayer,
        anchor: {
          x: 0.5,
          y: 0.5
        },
        font: {
          primary: {
            color: '#000',
            family: 'Arial',
            shadow: {
              blur: 0,
              color: '#000',
              offset: {
                x: 0,
                y: 0
              },
            },
            size: 16,
            style: {
              bold: false,
              italic: false,
              underline: false
            },
          },
          secondary: {
            color: '#000',
            family: 'Arial',
            shadow: {
              blur: 0,
              color: '#000',
              offset: {
                x: 0,
                y: 0
              },
            },
            size: 16,
            style: {
              bold: false,
              italic: false,
              underline: false
            },
          }
        },
        image: '',
        rotate: -5,
        text: '',
        translate: {
          x: 0,
          y: 0
        },
        zIndex: state.selectedHeadline.layers.length,
      })
    },

    setRefreshImages(state, value) {
      state.refreshImages = value
    },

    updateSelectedHeadlineName(state, name) {
      state.selectedHeadline.name = name
    },
    updateLayerName(state, name) {
      state.selectedLayer.name = name
    },
    updateLayerImage(state, image) {
      state.selectedLayer.image = image
      state.refreshImages = true
    },
    updateLayerText(state, text) {
      state.selectedLayer.text = text
    },

    updateLayerPrimaryFontColor(state, e) {
      state.selectedLayer.font.primary.color = e.target.value
    },
    updateLayerPrimaryFontFamily(state, family) {
      state.selectedLayer.font.primary.family = family
    },
    updateLayerPrimaryFontSize(state, size) {
      state.selectedLayer.font.primary.size = size
    },
    setLayerPrimaryFontBold(state, value) {
      state.selectedLayer.font.primary.style.bold = value
    },
    setLayerPrimaryFontItalic(state, value) {
      state.selectedLayer.font.primary.style.italic = value
    },
    setLayerPrimaryFontUnderline(state, value) {
      state.selectedLayer.font.primary.style.underline = value
    },
    setLayerPrimaryFontAlign(state, value) {
      state.selectedLayer.font.primary.style.align = value
    },

    updateLayerSecondaryFontColor(state, e) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.color = e.target.value
    },
    updateLayerSecondaryFontFamily(state, family) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.family = family
    },
    updateLayerSecondaryFontSize(state, size) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.size = size
    },
    setLayerSecondaryFontBold(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.bold = value
    },
    setLayerSecondaryFontItalic(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.italic = value
    },
    setLayerSecondaryFontUnderline(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.underline = value
    },
    setLayerSecondaryFontAlign(state, value) {
      if (!state.selectedLayer.font.secondary) {
        state.selectedLayer.font.secondary = {}
      }
      state.selectedLayer.font.secondary.style.align = value
    },
  },
}

// const mockHeadline = {
//   name: 'mock headline',
//   layers: [{
//       anchor: {
//         x: 0.5,
//         y: 0.5
//       },
//       layerType: 'image',
//       name: 'Random Image',
//       image: 'https://picsum.photos/640/280/?random',
//       zIndex: 0,
//     },
//
//     {
//       anchor: {
//         x: 0.5,
//         y: 0.5
//       },
//       font: {
//         primary: {
//           color: '#ffdc45',
//           family: 'Luckiest Guy',
//           shadow: {
//             blur: 12,
//             color: '#000',
//             offset: {
//               x: 2,
//               y: 4
//             },
//           },
//           size: 52,
//           style: {
//             bold: false,
//             italic: false,
//             underline: false
//           },
//         }
//       },
//       layerType: 'text',
//       name: 'Big Text',
//       rotate: -5,
//       text: 'Headline Creation Tool',
//       translate: {
//         x: 0,
//         y: -60
//       },
//       zIndex: 2,
//     },
//
//     {
//       anchor: {
//         x: 0.5,
//         y: 0.5
//       },
//       font: {
//         primary: {
//           color: '#bb99cc',
//           family: 'Permanent Marker',
//           shadow: {
//             blur: 4,
//             color: '#000',
//             offset: {
//               x: 2,
//               y: 2
//             },
//           },
//           size: 24,
//           style: {
//             bold: false,
//             italic: false,
//             underline: false
//           },
//         },
//         secondary: {
//           color: '#99ccbb',
//           family: 'Luckiest Guy',
//           shadow: {
//             blur: 10,
//             color: '#000',
//             offset: {
//               x: 2,
//               y: 4
//             },
//           },
//           size: 64,
//           style: {
//             bold: true,
//             italic: false,
//             underline: false
//           },
//         }
//       },
//       layerType: 'text',
//       name: 'Little Text',
//       rotate: -3,
//       text: 'Now with {{99%}} More {{Canvas!!!}}',
//       translate: {
//         x: 0,
//         y: 75
//       },
//       zIndex: 1,
//     }
//   ]
// }
