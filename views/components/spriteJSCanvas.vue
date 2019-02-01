<template>
<v-container :style="{ backgroundColor: background.color, minHeight: '75vh', overflow: 'hidden' }" id="canvas" pa-0>
  <svg width="100%" height="100%" :style="{ position: 'absolute' }">
    <pattern id="pattern" x="0" y="0" :width="background.pattern.size * 2" :height="background.pattern.size * 2" patternUnits="userSpaceOnUse">
      <rect :fill="background.pattern.color" x="0" y="0" :width="background.pattern.size" :height="background.pattern.size" />
      <rect :fill="background.pattern.color" :x="background.pattern.size" :y="background.pattern.size" :width="background.pattern.size" :height="background.pattern.size" />
    </pattern>
    <rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
</v-container>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
const {
  Scene,
  Sprite,
  Label
} = spritejs;

export default {
  props: {
    background: {
      type: Object,
    },
  },

  computed: {
    ...mapState({
      layers: state => state.layers.all
    })
  },

  watch: {
    background: {
      deep: true,
      handler: (newBackground, oldBackground) => {
        this.background = newBackground
      },
    },
  },

  methods: {
    buildLayers() {
      // const sorted = this.layers.sort((a, b) => a.zIndex - b.zIndex)

      this.layers.forEach((layer, index) => {
        let newLayer = layer
        newLayer.spriteJSLayer = this.scene.layer(layer.name)

        switch (layer.layerType) {
        case 'image':
          newLayer.content = new Sprite({
            anchor: [0.5, 0.5],
            pos: ['50%', '50%'],
            textures: layer.url
          })

          newLayer.spriteJSLayer.append(newLayer.content)
          break
        case 'text':
          newLayer.content = new Label({
            anchor: [0.5, 0.5],
            color: layer.font.color,
            font: `${layer.font.style} ${layer.font.size} ${layer.font.family}`,
            pos: ['50%', '50%'],
            text: layer.text,
            border: {
              width: 2,
              style: [10, 10],
              color: this.background.color,
            },
            rotate: layer.rotate,
            translate: layer.translate,
            scale: layer.scale,
            shadow: layer.shadow,
          })

          newLayer.content.animate([{
            dashOffset: 20
          }], {
            duration: 1000,
            iterations: Infinity,
          })

          newLayer.spriteJSLayer.append(newLayer.content)
          break
        }

        this.$store.dispatch('layers/setLayer', {
          index: index,
          layer: newLayer
        })
      })
    }
  },

  async mounted() {
    // artificial delay fixes layer positioning on start
    // await new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve()
    //   }, 500, 1)
    // })
    this.scene = new Scene('#canvas', {
      // stickmode: 'width',
      stickExtend: true,
      resolution: 'flex',
      // viewport: 'auto',
    })

    this.buildLayers()
  },
}
</script>
