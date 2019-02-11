<template>
<v-container :style="containerStyle" pa-0>
  <svg :style="{ position: 'absolute' }" :width="settings.background.width" :height="settings.background.height">
    <pattern id="pattern" x="0" y="0" :width="settings.background.blockSize * 2" :height="settings.background.blockSize * 2" patternUnits="userSpaceOnUse">
      <rect :fill="settings.background.color1" x="0" y="0" :width="settings.background.blockSize" :height="settings.background.blockSize" />
      <rect :fill="settings.background.color1" :x="settings.background.blockSize" :y="settings.background.blockSize" :width="settings.background.blockSize" :height="settings.background.blockSize" />
    </pattern>
    <rect id="rect" :fill="settings.background.color2" x="0" y="0" width="100%" height="100%" />
    <rect id="rect" fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
  <canvas id="canvas" :style="{ position: 'absolute' }" :width="settings.background.width" :height="settings.background.height"></canvas>
</v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data: () => {
    return {
      fontsLoaded: [],
      images: [],
      scene: {},
      lineDash: [4, 4],
      lineDashOffset: 0,
      lineDashOffsetSpeed: 0.25,
      lineDashWidth: 1,
    }
  },

  computed: {
    ...mapState({
      data: state => state.data,
      settings: state => state.settings,
      selectedHeadline: state => state.data.selectedHeadline,
      selectedLayer: state => state.data.selectedLayer,
      layers: state => state.data.selectedHeadline.layers,
      headlineLoaded: state => state.data.headlineLoaded,
      refreshImages: state => state.data.refreshImages,
    }),
    containerStyle() {
      return {
        // height: '100%',
        // maxHeight: '90vh',
        height: '85vh',
        overflow: 'auto',
        position: 'relative',
        width: '100%'
      }
    },
  },

  watch: {
    headlineLoaded(newValue, oldValue) {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      window.requestAnimationFrame(() => {
        this.loadImages().then(this.drawLayersLoop)
      })
    },
  },

  methods: {
    ...mapMutations({
      'setRefreshImages': 'data/setRefreshImages'
    }),

    loadImages() {
      this.imagesLoaded = []
      this.selectedHeadline.layers.filter(layer => layer.layerType === 'image').forEach(imageLayer => {
        this.imagesLoaded.push(new Promise((resolve, reject) => {
          let image = new Image()
          image.addEventListener('load', () => {
            this.images.push(image)
            resolve()
          }, false)
          image.src = imageLayer.image
        }))
      })

      return Promise.all(this.imagesLoaded)
    },


    drawLayersLoop() {
      if (!this.refreshImages) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.selectedHeadline.layers.forEach(layerData => {
          if (layerData.layerType === 'image') {
            this.drawImageLayer(layerData)
          } else if (layerData.layerType === 'text') {
            this.drawTextLayer(layerData)
          }
        })

        window.requestAnimationFrame(this.drawLayersLoop)
      } else {
        this.loadImages().then(() => {
          this.setRefreshImages(false)
          window.requestAnimationFrame(this.drawLayersLoop)
        })
      }
    },

    drawImageLayer(layerData) {
      let image = this.images.find(image => image.src === layerData.image)
      let anchorX = (image.width * layerData.scale.x) * layerData.anchor.x
      let anchorY = (image.height * layerData.scale.y) * layerData.anchor.y
      let centerX = this.canvas.width / 2
      let centerY = this.canvas.height / 2

      this.context.save()
      this.context.translate(centerX, centerY)
      this.context.translate(-anchorX, -anchorY)
      this.context.translate(layerData.translate.x, layerData.translate.y)
      this.context.translate(anchorX, anchorY)
      this.context.rotate(layerData.rotation * Math.PI / 180)
      this.context.translate(-anchorX, -anchorY)
      this.context.scale(layerData.scale.x, layerData.scale.y)
      this.context.drawImage(image, 0, 0, image.width, image.height)

      if (layerData == this.selectedLayer) {
        this.drawMarchingAnts(0, 0, image.width, image.height)
      }

      this.context.restore()
    },

    drawTextLayer(layerData) {
      let splitLines = this.splitUpLines(layerData)
      if (!splitLines) {
        return
      }

      let primaryFont = layerData.font.primary
      let secondaryFont = {}
      if (undefined !== layerData.font.secondary) {
        secondaryFont = layerData.font.secondary
      }

      let dimensions = this.getTextLayerDimensions(splitLines, primaryFont, secondaryFont)

      let anchorX = dimensions.width * layerData.anchor.x
      let anchorY = dimensions.height * layerData.anchor.y
      let centerX = this.canvas.width / 2
      let centerY = this.canvas.height / 2
      let translateX = layerData.translate.x
      let translateY = layerData.translate.y

      this.context.save()
      this.context.translate(centerX, centerY)
      this.context.translate(-anchorX, -anchorY)
      this.context.translate(translateX, translateY)
      this.context.translate(anchorX, anchorY)
      this.context.rotate(layerData.rotation * Math.PI / 180)
      this.context.translate(-anchorX, -anchorY)

      this.context.save()
      splitLines.forEach((line, index) => {
        let startX = 0
        let startY = 0

        if (index < 1) {
          this.context.translate(0, line.height)
        }

        line.forEach(string => {
          let font = string.font === 'primary' ? primaryFont : secondaryFont
          this.drawText(string.text, font, startX, 0)
          startX += string.width
        })
        if (index <  splitLines.length-1) {
          startY += splitLines[index+1].height
        }
        this.context.translate(0, startY)
      })
      this.context.restore()

      if (layerData == this.selectedLayer) {
        this.drawMarchingAnts(0, 0, dimensions.width, dimensions.height)
      }

      this.context.restore()
    },

    drawMarchingAnts(x, y, width, height) {
      this.context.setLineDash(this.lineDash)
      this.context.lineWidth = this.lineDashWidth
      this.context.lineDashOffset = this.lineDashOffset
      this.context.strokeStyle = 'rgba(0,0,0,0.75)'
      this.context.strokeRect(x, y, width, height)
      this.context.lineDashOffset = this.lineDashOffset + this.lineDash[0]
      this.context.strokeStyle = 'rgba(255,255,255,0.75)'
      this.context.strokeRect(x, y, width, height)

      this.lineDashOffset += this.lineDashOffsetSpeed
      if (this.lineDashOffset > 16) {
        this.lineDashOffset = 0
      }
    },

    // find the width & height for all the lines
    getTextLayerDimensions(lines, primaryFont, secondaryFont) {
      let totalWidth = 0
      let totalHeight = 0

      lines.forEach(line => {
        let lineWidth = 0
        let lineHeight = 0

        line.forEach(string => {
          if (string.font === 'primary') {
            let metrics = this.measureText(string.text, primaryFont)
            string.width = metrics.width
            string.height = metrics.height
            if (primaryFont.size > lineHeight) {
              lineHeight = primaryFont.size
            }
          } else {
            let metrics = this.measureText(string.text, secondaryFont)
            string.width = metrics.width
            string.height = metrics.height
            if (lineHeight = secondaryFont.size) {
              lineHeight = secondaryFont.size
            }
          }
          lineWidth += string.width
          line.width = lineWidth
          line.height = lineHeight
        })

        if (lineWidth > totalWidth) {
          totalWidth = lineWidth
        }
        totalHeight += lineHeight
      })

      return { width: totalWidth, height: totalHeight }
    },

    splitUpLines(layerData) {
      let splitLines = []
      let lines = this.splitNewLines(layerData.text)

      lines.forEach(line => {
        splitLines.push(this.splitHandlebars(line))
      })

      return splitLines
    },

    splitNewLines(text) {
      let newLines = text.split('<br/>')
      if (newLines.length <= 1) {
        newLines = text.split('\n')
      }

      return newLines
    },

    splitHandlebars(text) {
      let handlebars = []
      let leftHandle = text.split('{{')

      leftHandle.forEach(string1 => {
        let rightHandle = string1.split('}}')
        if (rightHandle.length <= 1) {
          handlebars.push({ text: string1, font: 'primary' })
        } else {
          rightHandle.forEach((string2, index) => {
            if(string2 !== '') {
              if (index % 2 === 0) {
                handlebars.push({ text: string2, font: 'secondary' })
              } else {
                handlebars.push({ text: string2, font: 'primary' })
              }
            }
          })
        }
      })

      return handlebars
    },

    measureText(text, font) {
      this.context.textAlign = font.style.align
      this.context.font = this.getFontString(font)
      let metrics = this.context.measureText(text)
      metrics.height = font.size
      return metrics
    },

    drawText(text, font, x, y) {
      this.context.shadowBlur = font.shadow.blur
      this.context.shadowColor = font.shadow.color
      this.context.shadowOffsetX = font.shadow.offset.x
      this.context.shadowOffsetY = font.shadow.offset.y
      this.context.textAlign = font.style.align
      this.context.font = this.getFontString(font)
      this.context.fillStyle = font.color
      this.context.fillText(text, x, y)
    },

    getFontString(font) {
      let style = ''
      if (font.style.bold) {
        style += 'bold '
      }
      if (font.style.italic) {
        style += 'italic '
      }
      if (!this.fontsLoaded.includes(font.family)) {
        let link = document.createElement('link')
        let firstScript = document.getElementsByTagName('script')[0]
        link.rel = "stylesheet"
        link.href = `https://fonts.googleapis.com/css?family=${font.family}`
        firstScript.parentNode.insertBefore(link, firstScript)
        this.fontsLoaded.push(font.family)
      }
      return `${style}${font.size}px ${font.family.split(':')[0].replace('+', ' ')}`
    },

  },
}
</script>
