<template>
<v-container :style="style" id="canvas" pa-0>
  <svg width="100%" height="100%" :style="{ position: 'absolute' }">
    <pattern id="pattern" x="0" y="0" :width="settings.background.pattern.size * 2" :height="settings.background.pattern.size * 2" patternUnits="userSpaceOnUse">
      <rect :fill="settings.background.pattern.color" x="0" y="0" :width="settings.background.pattern.size" :height="settings.background.pattern.size" />
      <rect :fill="settings.background.pattern.color" :x="settings.background.pattern.size" :y="settings.background.pattern.size" :width="settings.background.pattern.size" :height="settings.background.pattern.size" />
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
  computed: {
    ...mapState({
      layers: state => state.layers.all,
      settings: state => state.settings
    }),
    style() {
      return {
        backgroundColor: this.settings.background.color,
        minHeight: '75vh',
        overflow: 'hidden'
      }
    }
  },

  watch: {
    layers: {
      deep: true,
      handler: function (newValue, oldValue) {
        this.buildLayers()
        this.$router.push('home')
      }
    }
  },

  methods: {
    buildLayers() {
      Array.from(this.layers).forEach((layer, index) => {
        layer.spriteJSLayer = this.scene.layer(layer.name, {
          zIndex: layer.zIndex
        })

        switch (layer.layerType) {
        case 'image':
          layer.content = new Sprite({
            anchor: [0.5, 0.5],
            pos: ['50%', '50%'],
            textures: layer.url,
            zIndex: layer.zIndex
          })
          break
        case 'text':
          layer.content = new Label({
            anchor: [0.5, 0.5],
            color: layer.font.color,
            font: `${layer.font.style} ${layer.font.size} ${layer.font.family}`,
            pos: ['50%', '50%'],
            rotate: layer.rotate,
            scale: layer.scale,
            shadow: layer.shadow,
            text: layer.text,
            translate: layer.translate,
            zIndex: layer.zIndex
          })

          break
        }

        layer.spriteJSLayer.append(layer.content)
        this.$store.dispatch('layers/setLayer', {
          index: index,
          layer: layer
        })
      })
    }
  },

  async mounted() {
    this.scene = new Scene('#canvas', {
      // stickmode: 'width',
      stickExtend: true,
      resolution: 'flex',
      // viewport: 'auto',
    })

    this.buildLayers()

    // artificial delay fixes layer positioning on start
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.$store.commit('layers/setSelectedLayer', this.layers.length - 1)
        resolve()
      }, 500, 1)
    })
  },
}
</script>
