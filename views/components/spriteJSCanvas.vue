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
import { mapGetters, mapState } from 'vuex'
const { Group, Label, Layer, Scene, Sprite } = spritejs;

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
      headlineLoaded: state => state.data.headlineLoaded
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

      document.getElementById('canvas').append(this.canvas)
      this.context = this.canvas.getContext('2d')
      this.loadLayers()
    },
  },

  methods: {
    loadLayers() {
      this.imagesLoaded = []
      this.imageLayers = this.selectedHeadline.layers.filter(layer => layer.layerType === 'image')
      this.imageLayers.forEach(imageLayer => {
        this.imagesLoaded.push(new Promise((resolve, reject) => {
          let image = new Image()
          image.addEventListener('load', () => {
            this.images.push(image)
            resolve()
          }, false)
          image.src = imageLayer.textures
        }))
      })
      Promise.all(this.imagesLoaded).then(this.drawLayers)
    },

    drawLayers() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.selectedHeadline.layers.forEach(layerData => {
        if (layerData.layerType === 'image') {
          this.context.save()
          let image = this.images.find(image => image.src === layerData.textures)
          let x = image.width * layerData.anchor[0]
          let y = image.height * layerData.anchor[1]
          this.context.translate((this.canvas.width/2)-x, (this.canvas.height/2)-y)
          this.context.drawImage(image, 0, 0, image.width, image.height)
          this.context.restore()
        } else if (layerData.layerType === 'text') {
          this.context.save()

          let primaryFont = `${layerData.font.primary.style} ${layerData.font.primary.size}px ${layerData.font.primary.family}`
          let secondaryFont = primaryFont
          if (layerData.font.secondary) {
            secondaryFont = `${layerData.font.secondary.style} ${layerData.font.secondary.size}px ${layerData.font.secondary.family}`
          }

          this.context.shadowBlur = layerData.shadow.blur
          this.context.shadowColor = layerData.shadow.color
          this.context.shadowOffsetX = layerData.shadow.offset[0]
          this.context.shadowOffsetY = layerData.shadow.offset[1]

          let splits = this.splitText(layerData.text)

          if (splits) {
            let pri1 = this.measureText(splits[0], primaryFont)
            let sec1 = this.measureText(splits[1], secondaryFont)
            let pri2 = this.measureText(splits[2], primaryFont)
            let totalWidth = pri1+sec1+pri2

            let x = totalWidth * layerData.anchor[0]
            let y = layerData.font.primary.size * layerData.anchor[1]

            this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
            this.context.translate(layerData.translate[0], layerData.translate[1])
            this.context.translate(-x, y)
            this.context.rotate(layerData.rotate * Math.PI / 180)
            // this.context.fillText(layerData.text, 0, 0)
            this.drawText(splits[0], primaryFont, layerData.font.primary.color, 0, 0)
            this.drawText(splits[1], secondaryFont, layerData.font.secondary.color, pri1, 0)
            this.drawText(splits[2], primaryFont, layerData.font.primary.color, pri1+sec1, 0)
          } else {
            let x = -this.measureText(layerData.text, primaryFont) * layerData.anchor[0]
            let y = layerData.font.primary.size * layerData.anchor[1]

            this.context.translate(this.canvas.width / 2, this.canvas.height / 2)
            this.context.translate(layerData.translate[0], layerData.translate[1])
            this.context.translate(x, y)
            this.context.rotate(layerData.rotate * Math.PI / 180)
            this.drawText(layerData.text, primaryFont, layerData.font.primary.color, 0, 0)
          }
          this.context.restore()
        }
      })
      window.requestAnimationFrame(this.drawLayers)
    },

    splitText(text) {
      let startPiece = text.split('{{')
      if (startPiece.length > 1) {
        let middlePiece = startPiece[1].split('}}')
        let endPiece = middlePiece[1]
        return [startPiece[0], middlePiece[0], middlePiece[1]]
      }
    },

    measureText(text, font) {
      this.context.font = font
      return this.context.measureText(text).width
    },

    drawText(text, font, fillStyle, x, y) {
      this.context.font = font
      this.context.fillStyle = fillStyle
      this.context.fillText(text, x, y)
    }
  },
}
</script>
