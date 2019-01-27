<template>
<v-container :style="style" id="canvas" pa-0>
  <svg width="100%" height="100%">
    <pattern id="pattern" x="0" y="0" :width="pattern.size" :height="pattern.size" patternUnits="userSpaceOnUse">
      <rect :fill="pattern.color" x="0" y="0" :width="pattern.size/2" :height="pattern.size/2" />
      <rect :fill="pattern.color" :x="pattern.size/2" :y="pattern.size/2" :width="pattern.size/2" :height="pattern.size/2" />
    </pattern>
    <rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
  </svg>
</v-container>
</template>

<script>
export default {
  data: () => ({
    style: {
      height: '75vh',
      backgroundColor: '#eee'
    },
    pattern: {
      color: '#88888888',
      size: 16,
    },
    text: 'Hello World !\nSpriteJS.org',
    font: 'bold 48px Arial',
    color: '#ffdc45',
    backgroundColor: '#aaa',
    texture: 'https://picsum.photos/600/300/?random'
  }),

  // props: {
  //   pattern: {
  //     type: Object
  //   }
  // },

  watch: {
    text: function (newText, oldText) {
      this.textLabel.attr({
        text: newText
      })
    },
    font: function (newFont, oldFont) {
      this.textLabel.attr({
        font: newFont
      })
    },
    color: function (newColor, oldColor) {
      this.textLabel.attr({
        color: newColor
      })
    },
    backgroundColor: function (newColor, oldColor) {
      this.bglayer.canvas.style.backgroundColor = newColor
    },
    texture: function (newImg, oldImg) {
      this.bgImg.attr({
        textures: newImg
      })
    }
  },

  // methods: {
  //   load() {
  //   }
  // },

  mounted() {
    const {
      Scene,
      Sprite,
      Label
    } = spritejs;

    this.scene = new Scene('#canvas', {
      // resolution: ['auto', 'auto'],
      // stickmode: 'width',
      stickExtend: true,
      viewport: ['auto', 'auto'],
    });

    this.bglayer = this.scene.layer('bglayer');
    // this.bglayer.canvas.style.backgroundColor = this.backgroundColor;

    this.bgImg = new Sprite({
      anchor: [0.5, 0.5],
      pos: ['50%', '50%'],
      textures: this.texture
    });

    this.bglayer.append(this.bgImg);

    this.fglayer = this.scene.layer('fglayer');

    this.textLabel = new Label({
      anchor: [0.5, 0.5],
      color: this.color,
      font: this.font,
      pos: ['50%', '50%'],
      text: this.text
    });

    this.textLabel.animate([{
      scale: 1.5,
      rotate: -15
    }, {
      scale: 1,
      rotate: 0
    }, {
      scale: 1.5,
      rotate: 15
    }, ], {
      duration: 6000,
      iterations: Infinity,
      direction: 'alternate',
    });

    this.fglayer.append(this.textLabel);
  },
}
</script>
