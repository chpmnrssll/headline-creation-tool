<template>
<v-container id="canvasContainer" :style="containerStyle" pa-0>
  <svg :style="{ position: 'absolute' }" :width="settings.background.width" :height="settings.background.height">
    <pattern id="pattern" x="0" y="0" :width="settings.background.blockSize * 2" :height="settings.background.blockSize * 2" patternUnits="userSpaceOnUse">
      <rect :fill="settings.background.color1" x="0" y="0" :width="settings.background.blockSize" :height="settings.background.blockSize" />
      <rect :fill="settings.background.color1" :x="settings.background.blockSize" :y="settings.background.blockSize" :width="settings.background.blockSize" :height="settings.background.blockSize" />
    </pattern>
    <rect id="rect" :fill="settings.background.color2" x="0" y="0" width="100%" height="100%" />
    <rect id="rect" fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
  <canvas id="canvas" @click="canvasClick" :style="{ position: 'absolute' }" :width="settings.background.width" :height="settings.background.height"></canvas>
</v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { splitLines } from '../components/splitLines.js'
import FontFaceObserver from 'fontfaceobserver'

export default {
  data: () => ({
    click: {},
    imageCache: [],
    lineDash: [4, 4],
    lineDashOffset: 0,
    lineDashOffsetSpeed: 0.5,
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
    canvasContainer() {
      return document.getElementById('canvasContainer')
    },
    canvas() {
      return document.getElementById('canvas')
    },
    context() {
      return this.canvas.getContext('2d')
    },
    imageLayers() {
      if (this.selectedHeadline && this.selectedHeadline.layers) {
        return this.selectedHeadline.layers.filter(layer => layer.layerType === 'image')
      }
      return null
    },
    textLayers() {
      if (this.selectedHeadline && this.selectedHeadline.layers) {
        return this.selectedHeadline.layers.filter(layer => layer.layerType === 'text')
      }
      return null
    }
  },


  watch: {
    selectedHeadline(newValue, oldValue) {
      // console.log(newValue)
      this.start()
    },
  },


  mounted() {
    this.clickMask = document.createElement('canvas')
    this.clickMask.width = this.settings.background.width
    this.clickMask.height = this.settings.background.height
    this.clickMaskContext = this.clickMask.getContext('2d')

    // if (this.selectedHeadline) {
    //   console.log('loaded from mounted');
    //   this.start()
    // }
  },


  methods: {
    ...mapMutations({
      'setSelectedLayer': 'data/setSelectedLayer',
      'setRefreshImages': 'data/setRefreshImages',
      'setRefreshFonts': 'data/setRefreshFonts',
      'setRefreshText': 'data/setRefreshText',
      'setRefreshClickMask': 'data/setRefreshClickMask',
      'setHeadlineLoaded': 'data/setHeadlineLoaded',
      'setLines': 'data/setLines',
      'setSize': 'data/setSize',
      'setNew': 'data/setNew',
    }),


    start() {
      // this.clickMask.style.border = '1px solid black'
      // document.body.append(this.clickMask)
      this.loadImages()
        .then(this.loadFonts)
        .then(this.loadText)
        .then(() => {
          // console.log('loadedAll');
          this.setRefreshImages(true)
          this.setRefreshText(true)
        })
        .then(this.drawLoop)
    },


    canvasClick(event) {
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
      offsetX += stylePaddingLeft + styleBorderLeft - this.canvasContainer.scrollLeft
      offsetY += stylePaddingTop + styleBorderTop - this.canvasContainer.scrollTop

      this.click = {
        x: event.pageX - offsetX,
        y: event.pageY - offsetY
      }

      this.setRefreshClickMask(true)
    },


    loadImages() {
      this.imagesLoaded = []
      this.imageLayers.forEach(layer => {
        this.imagesLoaded.push(new Promise((resolve, reject) => {
          let image = new Image()
          image.addEventListener('load', () => {
            image.crossOrigin = "Anonymous"
            this.setSize({
              zIndex: layer.zIndex,
              size: {
                width: image.width,
                height: image.height
              }
            })
            this.imageCache.push(image)
            if (layer.new) {
              this.setNew({ zIndex: layer.zIndex, value: false })
            }
            resolve()
          }, false)
          image.src = layer.image
        }))
      })

      return Promise.all(this.imagesLoaded)
    },


    loadFonts() {
      return new Promise((resolve, reject) => {
        let fontNames = []
        let observers = []

        this.textLayers.forEach(layer => {
          if (!fontNames.includes(layer.font.primary.family)) {
            fontNames.push(layer.font.primary.family)
            let observer = new FontFaceObserver(layer.font.primary.family)
            observers.push(observer.load())
          }
          if (!fontNames.includes(layer.font.secondary.family)) {
            fontNames.push(layer.font.secondary.family)
            let observer = new FontFaceObserver(layer.font.secondary.family)
            observers.push(observer.load())
          }
        })

        Promise.all(observers).then(resolve)
      })
    },


    loadText() {
      return new Promise((resolve, reject) => {
        this.textLayers.forEach(layer => {
          let lines = splitLines(layer)

          if (lines) {
            this.setLines({
              zIndex: layer.zIndex,
              lines: lines
            })
            this.setSize({
              zIndex: layer.zIndex,
              size: this.getTextLayerDimensions(layer, lines)
            })
          }

          if (layer.new) {
            this.setNew({ zIndex: layer.zIndex, value: false })
          }
        })

        resolve()
      })
    },


    drawLoop() {
      if (this.refreshImages) {
        this.loadImages().then(() => {
          this.setRefreshImages(false)
          window.requestAnimationFrame(this.drawLoop)
        })
        return
      }

      if (this.refreshFonts) {
        this.loadFonts().then(() => {
          this.setRefreshFonts(false)
          window.requestAnimationFrame(this.drawLoop)
        })
      }

      if (this.refreshText) {
        this.loadText().then(() => {
          this.setRefreshText(false)
          window.requestAnimationFrame(this.drawLoop)
        })
        return
      }

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.selectedHeadline.layers.forEach(layer => {
        if (layer.new) {
          this.setRefreshImages(true)
          this.setRefreshFonts(true)
          this.setRefreshText(true)
        } else {
          switch (layer.layerType) {
            case 'image':
              this.drawImageLayer(layer)
              break
            case 'text':
              this.drawTextLayer(layer)
              break
          }
        }
      })

      if (this.refreshClickMask) {
        // get the zIndex from the red component-1 of color at mouse position
        const zIndex = this.clickMaskContext.getImageData(this.click.x, this.click.y, 1, 1).data[0]-1
        this.setSelectedLayer(zIndex)

        window.requestAnimationFrame(() => {
          // clear the clickMask for next time on the next frame
          this.clickMaskContext.clearRect(0, 0, this.clickMask.width, this.clickMask.height)
          this.setRefreshClickMask(false)
        })
      }

      window.requestAnimationFrame(this.drawLoop)
    },


    drawImageLayer(layer) {
      let image = this.imageCache.find(image => image.src === layer.image)
      let anchorX = (image.width * layer.scale.x) * layer.anchor.x
      let anchorY = (image.height * layer.scale.y) * layer.anchor.y

      this.context.save()
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
        this.clickMaskContext.translate(layer.translate.x, layer.translate.y)
        this.clickMaskContext.translate(anchorX, anchorY)
        this.clickMaskContext.rotate(layer.rotation * Math.PI / 180)
        this.clickMaskContext.translate(-anchorX, -anchorY)
        this.clickMaskContext.scale(layer.scale.x, layer.scale.y)

        // store zIndex+1 in red component of color
        this.clickMaskContext.fillStyle = `rgb(${layer.zIndex+1}, 0, 0)`
        this.clickMaskContext.fillRect(0, 0, image.width, image.height)
        this.clickMaskContext.restore()
      }
    },


    drawTextLayer(layer) {
      let anchorX = layer.size.width * layer.anchor.x
      let anchorY = layer.size.height * layer.anchor.y
      let translateX = layer.translate.x
      let translateY = layer.translate.y

      this.context.save()
      this.context.translate(translateX, translateY)
      this.context.translate(anchorX, anchorY)
      this.context.rotate(layer.rotation * Math.PI / 180)
      this.context.translate(-anchorX, -anchorY)

      this.context.save()
      layer.lines.forEach((line, index) => {
        let xOffset = 0
        let yOffset = 0

        if (index < 1) {
          this.context.translate(0, line.height)
        }

        line.forEach(string => {
          let font = string.font === 'primary' ? layer.font.primary : layer.font.secondary
          this.drawText(string.text, font, xOffset, 0)
          xOffset += string.width
        })

        if (index < layer.lines.length - 1) {
          yOffset += layer.lines[index + 1].height
        }

        this.context.translate(0, yOffset)
      })
      this.context.restore()

      if (layer === this.selectedLayer) {
        this.drawMarchingAnts(0, 0, layer.size.width, layer.size.height)
      }
      this.context.restore()

      if (this.refreshClickMask) {
        this.clickMaskContext.save()
        this.clickMaskContext.translate(translateX, translateY)
        this.clickMaskContext.translate(anchorX, anchorY)
        this.clickMaskContext.rotate(layer.rotation * Math.PI / 180)
        this.clickMaskContext.translate(-anchorX, -anchorY)

        // store zIndex+1 in red component of color
        const zIndex = layer.zIndex+1
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
      this.context.strokeStyle = 'rgba(0, 0, 0, 0.75)'
      this.context.strokeRect(x, y, width, height)
      this.context.lineDashOffset = this.lineDashOffset + this.lineDash[0]
      this.context.strokeStyle = 'rgba(255, 255, 255, 0.75)'
      this.context.strokeRect(x, y, width, height)

      this.lineDashOffset += this.lineDashOffsetSpeed
      if (this.lineDashOffset > 16) {
        this.lineDashOffset = 0
      }
    },


    // find the width & height for all the lines
    getTextLayerDimensions(layer, lines) {
      let totalWidth = 0
      let totalHeight = 0

      lines.forEach(line => {
        let currentLineWidth = 0
        let currentLineHeight = 0

        line.forEach(string => {
          if (string.font === 'primary') {
            let metrics = this.measureText(string.text, layer.font.primary)
            string.width = metrics.width
            string.height = metrics.height
            if (layer.font.primary.size > currentLineHeight) {
              currentLineHeight = layer.font.primary.size
            }
          } else {
            let metrics = this.measureText(string.text, layer.font.secondary)
            string.width = metrics.width
            string.height = metrics.height
            if (layer.font.secondary.size > currentLineHeight) {
              currentLineHeight = layer.font.secondary.size
            }
          }

          currentLineWidth += string.width
        })

        line.width = currentLineWidth
        line.height = currentLineHeight

        if (currentLineWidth > totalWidth) {
          totalWidth = currentLineWidth
        }

        totalHeight += currentLineHeight
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
      return `${style}${font.size}px ${font.family}`
    }

  }
}
</script>
