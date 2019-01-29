<template>
<v-container :style="{ height: '100%', backgroundColor: background.color }" id="canvas" pa-0>
  <svg width="100%" height="100%">
    <pattern id="pattern" x="0" y="0" :width="background.pattern.size * 2" :height="background.pattern.size * 2" patternUnits="userSpaceOnUse">
      <rect :fill="background.pattern.color" x="0" y="0" :width="background.pattern.size" :height="background.pattern.size" />
      <rect :fill="background.pattern.color" :x="background.pattern.size" :y="background.pattern.size" :width="background.pattern.size" :height="background.pattern.size" />
    </pattern>
    <rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
</v-container>
</template>

<script>
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
    layers: {
      type: Array,
    }
  },

  watch: {
    layers: {
      deep: true,
      handler: (newLayers, oldLayers) => {
        newLayers.forEach(layer => {
          layer.spriteJSLayer.canvas.style.zIndex = layer.zIndex
        })
      },
    }
  },

  methods: {
    drawLayers() {
      this.layers.sort((a, b) => {
        return a.zIndex - b.zIndex
      }).map((layer, index) => {
        layer.spriteJSLayer = this.scene.layer(layer.name)

        switch (layer.type) {
        case 'image':
          layer.image = new Sprite({
            anchor: [0.5, 0.5],
            pos: ['50%', '50%'],
            textures: layer.url
          })
          layer.spriteJSLayer.append(layer.image)
          break;
        case 'text':
          layer.label = new Label({
            anchor: [0.5, 0.5],
            color: layer.font.color,
            font: `${layer.font.style} ${layer.font.size} ${layer.font.family}`,
            pos: ['50%', '50%'],
            text: layer.text,
          });
          layer.spriteJSLayer.append(layer.label)
          break;
        }
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
      viewport: 'auto',
    })

    this.drawLayers()
  },
}
</script>
