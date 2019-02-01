<template>
<v-container class="pa-0">
  <v-card class="pa-4">
    <v-layout align-center justify-center column>
      <v-text-field v-model="background.width" label="Canvas Width"></v-text-field>
      <v-text-field v-model="background.height" label="Canvas Height"></v-text-field>
      <v-slider v-model="background.pattern.size" thumb-label :min="1" :max="100" label="Background Size"></v-slider>
      <label :style="labelStyle">Background Color</label>
      <!-- <color-picker :style="pickerStyle" theme="light" :color="background.color" sucker-hide @changeColor="changeColor" /> -->
    </v-layout>
  </v-card>
</v-container>
</template>

<script>
// import colorPicker from '@caohenghu/vue-colorpicker'

export default {
  components: {
    // colorPicker
  },

  data: () => ({
    labelStyle: {
      color: 'rgba(0, 0, 0, .54)',
      fontSize: '18px',
    },
    pickerStyle: {
      width: '218px',
    },
  }),

  props: {
    background: {
      type: Object,
    }
  },

  methods: {
    changeColor(color) {
      this.background.color = color.rgba.toHexString()
    },
  },
}
</script>
