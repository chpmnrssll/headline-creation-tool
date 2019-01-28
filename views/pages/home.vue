<template>
<v-container :style="style">
  <v-layout row>
    <v-flex grow>
      <spriteJSCanvas :background="background" :layers="layers"></spriteJSCanvas>
    </v-flex>
    <v-flex xs4 ml-4>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="secondary" fixed-tabs>

        <v-tab ripple>Layers</v-tab>
        <v-tab-item>
          <layersTab :layers="layers" :pagination="pagination"></layersTab>
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
    layers: [
      {
        type: 'text',
        name: 'Text Layer',
        text: 'Hello World!\nSpriteJS.org',
        font: {
          family: 'Arial',
          style: 'bold',
          size: '48px',
          color: '#ffdc45',
        }
      },
      {
        type: 'image',
        name: 'Image Layer',
        url: 'https://picsum.photos/960/540/?random',
      },
    ],
    background: {
      color: '#eeeeee',
      pattern: {
        color: '#88888888',
        size: 8,
      },
    },
    pagination: {
      // descending: true,
      // sortBy: 'index',
    },
    activeTab: null,
    isDarkMode: false,
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

  components: {
    layersTab: layersTab,
    settingsTab: settingsTab,
    spriteJSCanvas: spriteJSCanvas,
  },
}
</script>

<style>

</style>
