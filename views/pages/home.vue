<template>
<v-container :style="style">
  <v-layout row>
    <v-flex>
      <spriteJSCanvas></spriteJSCanvas>
    </v-flex>
    <v-flex xs4 ml-4>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="secondary">
        <v-tab ripple>Layers</v-tab>
        <v-tab-item>
          <layersTab></layersTab>
        </v-tab-item>
        <v-tab ripple>Settings</v-tab>
        <v-tab-item>
          <settingsTab></settingsTab>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {
  mapState,
  mapActions
}
from 'vuex'
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
  }),

  computed: mapState({
    layers: state => state.layers
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

  created() {
    this.$store.dispatch('layers/loadMockLayers')
  },

  components: {
    layersTab: layersTab,
    settingsTab: settingsTab,
    spriteJSCanvas: spriteJSCanvas,
  },
}
</script>
