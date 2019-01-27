<template>
<v-container>
  <v-slider v-model="pattern.size" thumb-label thumb-size="12" :min="1" :max="100" label="Size"></v-slider>
  <color-picker :style="style" theme="light" :color="pattern.color" sucker-hide @changeColor="changeColor"/>
</v-container>
</template>

<script>
import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  components: {
    colorPicker
  },
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#59c7f9',
      width: '62%',
    },
    pattern: {
      size: 24,
      color: 'rgba(127, 127, 127, .5)',
    }
  }),

  methods: {
    changeColor(color) {
      const { r, g, b, a } = color.rgba
      this.pattern.color = `rgba(${r, g, b, a})`
    },
  },
}
</script>
