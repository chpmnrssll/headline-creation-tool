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
  <canvas id="canvas" @click="clickedCanvas" :style="{ position: 'absolute' }" :width="settings.background.width" :height="settings.background.height"></canvas>
</v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { splitLines } from '../components/splitLines.js'

export default {
  data: () => ({
    click: {},
    fontsLoaded: [],
    images: [],
    lineDash: [4, 4],
    lineDashOffset: 0,
    lineDashOffsetSpeed: 0.25,
    lineDashWidth: 1,
  }),

  computed: {
    ...mapState({
      data: state => state.data,
      settings: state => state.settings,
      selectedHeadline: state => state.data.selectedHeadline,
      selectedLayer: state => state.data.selectedLayer,
      layers: state => state.data.selectedHeadline.layers,
      headlineLoaded: state => state.data.headlineLoaded,
      refreshImages: state => state.data.refreshImages,
      refreshText: state => state.data.refreshText,
      refreshClickMask: state => state.data.refreshClickMask,
    }),
    containerStyle() {
      return {
        height: '85vh',
        overflow: 'auto',
        position: 'relative',
        width: '100%'
      }
    },
  },

  watch: {
    headlineLoaded(newValue, oldValue) {
      this.start()
    },
  },

  mounted() {
    if (this.headlineLoaded) {
      this.start()
    }
  },

  methods: {
    ...mapMutations({
      'setSelectedLayer': 'data/setSelectedLayer',
      'setRefreshImages': 'data/setRefreshImages',
      'setRefreshText': 'data/setRefreshText',
      'setRefreshClickMask': 'data/setRefreshClickMask',
      'setSize': 'data/setSize',
      'setLines': 'data/setLines',
    }),

    start() {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      this.clickMask = document.createElement('canvas')
      this.clickMask.width = this.settings.background.width
      this.clickMask.height = this.settings.background.height
      this.clickMaskContext = this.clickMask.getContext('2d')

      // document.body.append(this.clickMask)
      window.requestAnimationFrame(() => {
        this.loadImages()
          .then(this.loadText)
          .then(this.setRefreshImages(true))
          .then(this.setRefreshText(true))
          .then(this.drawLayersLoop)
      })
    },

    clickedCanvas(e) {
      let element = this.canvas
      let offsetX = 0
      let offsetY = 0

      // Compute the total offset
      if (element.offsetParent !== undefined) {
        do {
          offsetX += element.offsetLeft
          offsetY += element.offsetTop
        } while ((element = element.offsetParent))
      }

      let style = window.getComputedStyle(this.canvas)
      let stylePaddingLeft = parseInt(style.paddingLeft) || 0
      let stylePaddingTop = parseInt(style.paddingTop) || 0
      let styleBorderLeft = parseInt(style.borderLeftWidth) || 0
      let styleBorderTop = parseInt(style.borderTopWidth) || 0
      let html = document.body.parentNode
      let htmlTop = html.offsetTop
      let htmlLeft = html.offsetLeft

      // Add padding and border style widths to offset
      // Also add the offsets in case there's a position:fixed bar
      offsetX += stylePaddingLeft + styleBorderLeft
      offsetY += stylePaddingTop + styleBorderTop


      this.click = {
        x: e.pageX - offsetX,
        y: e.pageY - offsetY
      }

      this.setRefreshClickMask(true)
    },

    loadImages() {
      this.imagesLoaded = []
      this.selectedHeadline.layers.filter(layer => layer.layerType === 'image').forEach(imageLayer => {
        this.imagesLoaded.push(new Promise((resolve, reject) => {
          let image = new Image()
          image.addEventListener('load', () => {
            image.crossOrigin = "Anonymous"
            this.setSize({
              zIndex: imageLayer.zIndex,
              size: {
                width: image.width,
                height: image.height
              }
            })
            this.images.push(image)
            resolve()
          }, false)
          image.src = imageLayer.image
        }))
      })

      return Promise.all(this.imagesLoaded)
    },

    loadText() {
      return new Promise((resolve, reject) => {
        this.selectedHeadline.layers.forEach(layer => {
          if (layer.layerType === 'text') {
            let lines = splitLines(layer)
            if (!lines) {
              return
            }

            let primaryFont = layer.font.primary
            let secondaryFont = {}
            if (undefined !== layer.font.secondary) {
              secondaryFont = layer.font.secondary
            }

            let dimensions = this.getTextLayerDimensions(lines, primaryFont, secondaryFont)
            this.setSize({
              zIndex: layer.zIndex,
              size: dimensions
            })
            this.setLines({
              zIndex: layer.zIndex,
              lines: lines
            })
          }
        })
        resolve()
      })
    },

    drawLayersLoop() {
      if (this.refreshImages) {
        this.loadImages().then(() => {
          this.setRefreshImages(false)
          window.requestAnimationFrame(this.drawLayersLoop)
        })
      } else if (this.refreshText) {
        this.loadText().then(() => {
          this.setRefreshText(false)
          window.requestAnimationFrame(this.drawLayersLoop)
        })
      } else {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (this.refreshClickMask) {
        }

        this.selectedHeadline.layers.forEach(layer => {
          if (layer.layerType === 'image') {
            this.drawImageLayer(layer)
          } else if (layer.layerType === 'text') {
            this.drawTextLayer(layer)
          }
        })

        if (this.refreshClickMask) {
          // get the zIndex from the red component of color at x,y
          const zIndex = this.clickMaskContext.getImageData(this.click.x, this.click.y, 1, 1).data[0] - 1
          this.setSelectedLayer(zIndex)
          this.setRefreshClickMask(false)

          this.clickMaskContext.clearRect(0, 0, this.clickMask.width, this.clickMask.height)
        }

        window.requestAnimationFrame(this.drawLayersLoop)
      }
    },

    drawImageLayer(layer) {
      let image = this.images.find(image => image.src === layer.image)
      let anchorX = (image.width * layer.scale.x) * layer.anchor.x
      let anchorY = (image.height * layer.scale.y) * layer.anchor.y

      this.context.save()
      this.context.translate(-anchorX, -anchorY)
      this.context.translate(layer.translate.x, layer.translate.y)
      this.context.translate(anchorX, anchorY)
      this.context.rotate(layer.rotation * Math.PI / 180)
      this.context.translate(-anchorX, -anchorY)
      this.context.scale(layer.scale.x, layer.scale.y)
      this.context.drawImage(image, 0, 0, image.width, image.height)

      if (layer == this.selectedLayer) {
        this.drawMarchingAnts(0, 0, image.width, image.height)
      }

      this.context.restore()

      if (this.refreshClickMask) {
        this.clickMaskContext.save()
        this.clickMaskContext.translate(this.canvas.width / 2, this.canvas.height / 2)
        this.clickMaskContext.translate(-anchorX, -anchorY)
        this.clickMaskContext.translate(layer.translateX, layer.translateY)
        this.clickMaskContext.translate(anchorX, anchorY)
        this.clickMaskContext.rotate(layer.rotation * Math.PI / 180)
        this.clickMaskContext.translate(-anchorX, -anchorY)

        // store zIndex in red component of color
        const zIndex = layer.zIndex + 1
        this.clickMaskContext.fillStyle = `rgb(${zIndex},0,0)`
        this.clickMaskContext.fillRect(0, 0, image.width, image.height)
        this.clickMaskContext.restore()
      }
    },

    drawTextLayer(layer) {
      let primaryFont = layer.font.primary
      let secondaryFont = {}
      if (undefined !== layer.font.secondary) {
        secondaryFont = layer.font.secondary
      }

      let anchorX = layer.size.width * layer.anchor.x
      let anchorY = layer.size.height * layer.anchor.y
      let translateX = layer.translate.x
      let translateY = layer.translate.y

      this.context.save()
      this.context.translate(-anchorX, -anchorY)
      this.context.translate(translateX, translateY)
      this.context.translate(anchorX, anchorY)
      this.context.rotate(layer.rotation * Math.PI / 180)
      this.context.translate(-anchorX, -anchorY)

      this.context.save()
      layer.lines.forEach((line, index) => {
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
        if (index < layer.lines.length - 1) {
          startY += layer.lines[index + 1].height
        }
        this.context.translate(0, startY)
      })
      this.context.restore()

      if (layer == this.selectedLayer) {
        this.drawMarchingAnts(0, 0, layer.size.width, layer.size.height)
      }

      this.context.restore()

      if (this.refreshClickMask) {
        this.clickMaskContext.save()
        this.clickMaskContext.translate(-anchorX, -anchorY)
        this.clickMaskContext.translate(translateX, translateY)
        this.clickMaskContext.translate(anchorX, anchorY)
        this.clickMaskContext.rotate(layer.rotation * Math.PI / 180)
        this.clickMaskContext.translate(-anchorX, -anchorY)

        // store zIndex in red component of color
        const zIndex = layer.zIndex + 1
        this.clickMaskContext.fillStyle = `rgb(${zIndex},0,0)`
        this.clickMaskContext.fillRect(0, 0, layer.size.width, layer.size.height)
        this.clickMaskContext.restore()
      }
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
            if (secondaryFont.size > lineHeight) {
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

      return {
        width: totalWidth,
        height: totalHeight
      }
    },

    measureText(text, font) {
      this.context.textAlign = font.style.align
      this.context.font = this.getFontString(font)
      let metrics = this.context.measureText(text)
      metrics.height = font.size
      return metrics
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
