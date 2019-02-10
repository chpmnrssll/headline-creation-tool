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
        overflow: 'scroll',
        position: 'relative',
        width: '100%'
      }
    },
  },

  watch: {
    headlineLoaded(newValue, oldValue) {
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d')
      setTimeout(() => {
        this.loadImages().then(this.drawLayersLoop)
      }, 1000, 1)
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
      let x = image.width * layerData.anchor.x
      let y = image.height * layerData.anchor.y
      this.context.save()
      this.context.translate((this.canvas.width / 2) - x, (this.canvas.height / 2) - y)
      this.context.drawImage(image, 0, 0, image.width, image.height)
      this.context.restore()
    },

    drawTextLayer(layerData) {
      let splitStrings = this.splitHandlebars(layerData.text)

      if (!splitStrings) {
        return
      }

      let primaryFont = layerData.font.primary
      let secondaryFont = primaryFont
      if (undefined !== layerData.font.secondary) {
        secondaryFont = layerData.font.secondary
      }

      let totalWidth = 0
      splitStrings.forEach(string => {
        if (string.font === 'primary') {
          string.width = this.measureText(string.text, primaryFont)
        } else {
          string.width = this.measureText(string.text, secondaryFont)
        }
        totalWidth += string.width
      })

      let x = totalWidth * layerData.anchor.x
      let y = layerData.font.primary.size * layerData.anchor.y
      if (layerData.font.secondary && layerData.font.primary.size < layerData.font.secondary.size) {
        y = layerData.font.secondary.size * layerData.anchor.y
      }

      this.context.save()
      this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
      this.context.translate(-x, y)
      this.context.translate(layerData.translate.x, layerData.translate.y)
      this.context.rotate(layerData.rotate * Math.PI / 180)

      let runningWidth = 0
      splitStrings.forEach((string, index) => {
        let font = string.font === 'primary' ? primaryFont : secondaryFont
        this.drawText(string.text, font, runningWidth, 0)
        runningWidth += string.width
      })

      this.context.restore()
    },

    splitHandlebars(text) {
      let output = []
      let firstSplit = text.split('{{')

      firstSplit.forEach(string1 => {
        let nextSplit = string1.split('}}')
        if (nextSplit.length <= 1) {
          output.push({ text: string1, font: 'primary' })
        } else {
          nextSplit.forEach((string2, index) => {
            if(string2 !== '') {
              if (index % 2 === 0) {
                output.push({ text: string2, font: 'secondary' })
              } else {
                output.push({ text: string2, font: 'primary' })
              }
            }
          })
        }
      })

      return output
    },

    getFontString(font) {
      let style = ''
      if (font.style.bold) {
        style += 'bold '
      }
      if (font.style.italic) {
        style += 'italic '
      }
      // if (font.style.underline) {
      //   style += 'underline '
      // }
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

    measureText(text, font) {
      this.context.textAlign = font.style.align
      this.context.font = this.getFontString(font)
      let metrics = this.context.measureText(text)
      return metrics.width
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

  },
}
</script>
