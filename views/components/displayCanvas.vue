<template>
<v-container id="canvas" :style="style" pa-0>
  <svg width="100%" height="100%" :style="{ position: 'absolute' }">
    <pattern id="pattern" x="0" y="0" :width="settings.background.pattern.size * 2" :height="settings.background.pattern.size * 2" patternUnits="userSpaceOnUse">
      <rect :fill="settings.background.pattern.color" x="0" y="0" :width="settings.background.pattern.size" :height="settings.background.pattern.size" />
      <rect :fill="settings.background.pattern.color" :x="settings.background.pattern.size" :y="settings.background.pattern.size" :width="settings.background.pattern.size" :height="settings.background.pattern.size" />
    </pattern>
    <rect id="rect" fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
</v-container>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => {
    return {
      scene: {},
      images: [],
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
    style() {
      return {
        backgroundColor: this.settings.background.color,
        minHeight: '75vh',
        overflow: 'hidden',
        position: 'relative',
      }
    },
  },

  watch: {
    headlineLoaded(newValue, oldValue) {
      this.canvas = document.createElement('canvas')
      this.canvas.style.position = 'absolute'
      this.canvas.width = rect.width.baseVal.value
      this.canvas.height = rect.height.baseVal.value
      this.context = this.canvas.getContext('2d')
      document.getElementById('canvas').append(this.canvas)
      setTimeout(() => {
        this.loadImages().then(this.drawLayers)
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

    drawLayers() {
      if (!this.refreshImages) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.selectedHeadline.layers.forEach(layerData => {
          if (layerData.layerType === 'image') {
            let image = this.images.find(image => image.src === layerData.image)
            let x = image.width * layerData.anchor.x
            let y = image.height * layerData.anchor.y
            this.context.save()
            this.context.translate((this.canvas.width / 2) - x, (this.canvas.height / 2) - y)
            this.context.drawImage(image, 0, 0, image.width, image.height)
            this.context.restore()
          } else if (layerData.layerType === 'text') {
            let splitStrings = this.splitText(layerData.text)

            if (splitStrings) {
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
            }
          }
        })

        window.requestAnimationFrame(this.drawLayers)
      } else {
        this.loadImages().then(() => {
          this.setRefreshImages(false)
          window.requestAnimationFrame(this.drawLayers)
        })
      }
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
      return `${style} ${font.size}px ${font.family}`
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

    splitText(text) {
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
  },
}
</script>
