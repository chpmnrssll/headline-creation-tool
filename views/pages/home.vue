<template>
  <v-container class="pa-0">
    <v-container>
      <template>
        <v-layout row>
          <v-flex>
            <v-card>
              <v-container v-bind:style="canvasStyle" id="canvas">
              </v-container>
            </v-card>
            <br/>
            <v-card>
              <v-text-field
              label="Background Image"
              v-model="texture"
              ></v-text-field>
              <v-text-field
              label="Text"
              v-model="text"
              ></v-text-field>
              <v-text-field
              label="Font"
              v-model="font"
              ></v-text-field>
              <v-text-field
              label="Text Color"
              v-model="color"
              ></v-text-field>
              <v-text-field
              label="Background Color"
              v-model="backgroundColor"
              ></v-text-field>
            </v-card>
          </v-flex>
        </v-layout>
      </template>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    canvasStyle: {
      height: '75vh'
    },
    text: 'Hello World !\nSpriteJS.org',
    font: 'bold 48px Arial',
    color: '#ffdc45',
    backgroundColor: '#0d47a1',
    texture: 'https://picsum.photos/200/300/?random'
  }),

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

  methods: {
    //load all users from DB, we call this often to make sure the data is up to date
    load() {
      const {Scene, Sprite, Label} = spritejs;
      this.scene = new Scene('#canvas', {viewport: ['auto', 'auto']});

      this.bglayer = this.scene.layer('bglayer');
      this.bglayer.canvas.style.backgroundColor = this.backgroundColor;

      this.bgImg = new Sprite();
      this.bgImg.attr({
        anchor: [0.5, 0.5],
        pos: ['50%', '50%'],
        textures: this.texture
      })

      this.bglayer.append(this.bgImg);

      this.fglayer = this.scene.layer('fglayer');
      // this.fglayer.canvas.style.backgroundColor = this.backgroundColor;

      this.textLabel = new Label(this.text);

      this.textLabel.attr({
        anchor: [0.5, 0.5],
        pos: ['50%', '50%'],
        font: this.font,
        color: this.color,
      });

      this.textLabel.animate([
        {scale: 1.25, rotate: -15},
        {scale: 1, rotate: 0},
        {scale: 1.25, rotate: 15},
      ], {
        duration: 3000,
        iterations: Infinity,
        direction: 'alternate',
      });

      this.fglayer.append(this.textLabel);
    },
  },

  mounted() {
    this.load();
  }
}
</script>

<style>

</style>
