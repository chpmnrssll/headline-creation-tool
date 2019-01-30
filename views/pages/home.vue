<template>
<v-container :style="style">
  <v-layout row>
    <v-flex>
      <spriteJSCanvas :background="background" :layers="layers"></spriteJSCanvas>
    </v-flex>
    <v-flex xs4 ml-4>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="secondary">

        <v-tab ripple>Layers</v-tab>
        <v-tab-item>
          <layersTab :layers="layers" @update:layer="updateLayer" @update:text="updateText"></layersTab>
        </v-tab-item>

        <v-tab ripple>Settings</v-tab>
        <v-tab-item>
          <settingsTab :background="background"></settingsTab>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import layersTab from '../components/layersTab'
import settingsTab from '../components/settingsTab'
import spriteJSCanvas from '../components/spriteJSCanvas'

export default {
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
    activeTab: null,
    isDarkMode: false,
    background: {
      color: '#eeeeee',
      pattern: {
        color: '#88888888',
        size: 8,
      },
      width: null,
      height: null,
    },
    layers: [{
        layerType: 'image',
        name: 'Random 960x540 Image',
        url: 'https://picsum.photos/960/540/?random',
        zIndex: 0,
      },
      {
        layerType: 'text',
        name: 'Little Text',
        text: 'Now with 99% More Canvas',
        font: {
          family: 'Calibri',
          style: 'bold',
          size: '48px',
          color: '#bb99cc',
        },
        shadow: {
          blur: 5,
          color: '#000',
          offset: [2, 2],
        },
        rotate: -5,
        translate: [0, 75],
        zIndex: 2,
      },
      {
        layerType: 'text',
        name: 'Big Text',
        text: 'Headline\nCreation Tool',
        font: {
          family: 'Arial',
          style: 'bold',
          size: '128px',
          color: '#ffdc45',
        },
        shadow: {
          blur: 15,
          color: '#000',
          offset: [4, 8],
        },
        rotate: -5,
        translate: [0, -75],
        zIndex: 1,
      },
    ],
  }),

  watch: {
    isDarkMode() {
      // this.$emit('change-theme-mode')
      if (!this.isDarkMode) { //NOT dark mode
        this.$vuetify.theme = {
          primary: '#9933cc', //Main color
          primaryText: '#FFFFFF', //Color for text on primary
          secondary: '#bb99cc', //Color for active nav
          lightText: '#000000'
        }
      } else { //Dark mode
        this.$vuetify.theme = {
          primary: '#424242', //Main color
          primaryText: '#FFFFFF', //Color for text on primary
          secondary: '#9933cc', //Color for active nav
          lightText: '#FFFFFF'
        }
      }
    }
  },

  methods: {
    updateLayer({
      index,
      z
    }) {
      this.$set(this.layers[index], 'zIndex', z)
    },
    updateText({
      zIndex,
      text
    }) {
      console.log(`updateText(${zIndex}, ${text})`)
      this.$set(this.layers.filter(layer => layer.zIndex === zIndex)[0], 'zIndex', z)
    },
  },

  components: {
    layersTab: layersTab,
    settingsTab: settingsTab,
    spriteJSCanvas: spriteJSCanvas,
  },
}
</script>

<style>

</style>
