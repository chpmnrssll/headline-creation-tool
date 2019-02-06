<template>
<v-container>
  <v-layout row>
    <v-flex>
      <spriteJSCanvas></spriteJSCanvas>
    </v-flex>

    <v-flex xs4 ml-4>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="secondary">
        <v-tab :headlineLoaded="headlineLoaded" ripple>Layers</v-tab>
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
import layersTab from '../components/layersTab'
import settingsTab from '../components/settingsTab'
import spriteJSCanvas from '../components/spriteJSCanvas'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    activeTab: null,
    isDarkMode: false,
  }),

  computed: {
    ...mapState({
      settings: state => state.settings,
      headlineLoaded: state => state.data.headlineLoaded
    }),
    canvasStyle() {
      return {
        backgroundColor: this.settings.background.color,
        minHeight: '75vh',
        overflow: 'hidden'
      }
    },
  },

  components: {
    layersTab: layersTab,
    settingsTab: settingsTab,
    spriteJSCanvas: spriteJSCanvas
  },

  methods: {
    ...mapActions({
      defaultHeadline: 'data/defaultHeadline',
      loadHeadlines: 'data/loadHeadlines',
    }),
    ...mapMutations({
      setHeadlineLoaded: 'data/setHeadlineLoaded'
    }),
  },

  mounted() {
    this.defaultHeadline().then(() => {
      this.setHeadlineLoaded(true)
    })
  },

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

}
</script>
