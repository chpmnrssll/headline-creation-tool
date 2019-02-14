<template>
<v-container row fluid class="pa-0">
  <v-layout v-bind="layout">
    <v-flex v-if="layout.row" ml-5 mr-2>
      <layerCanvas></layerCanvas>
    </v-flex>

    <v-flex v-if="layout.column">
      <layerCanvas></layerCanvas>
    </v-flex>

    <v-flex v-if="layout.row" xs4 ml-2 mr-5>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="secondary">
        <v-tab :headlineLoaded="headlineLoaded" ripple>Layers</v-tab>
        <v-tab-item>
          <tabLayers></tabLayers>
        </v-tab-item>
        <v-tab ripple>Settings</v-tab>
        <v-tab-item>
          <tabSettings></tabSettings>
        </v-tab-item>
      </v-tabs>
    </v-flex>

    <v-flex v-if="layout.column" xs4>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="secondary">
        <v-tab :headlineLoaded="headlineLoaded" ripple>Layers</v-tab>
        <v-tab-item>
          <tabLayers></tabLayers>
        </v-tab-item>
        <v-tab ripple>Settings</v-tab>
        <v-tab-item>
          <tabSettings></tabSettings>
        </v-tab-item>
      </v-tabs>
    </v-flex>

  </v-layout>
</v-container>
</template>

<script>
import layerCanvas from '../components/layerCanvas'
import tabLayers from '../components/tabLayers'
import tabSettings from '../components/tabSettings'
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
    layout() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return { row: true }
      } else {
        return { column: true }
      }
    },
  },

  components: {
    tabLayers: tabLayers,
    tabSettings: tabSettings,
    layerCanvas: layerCanvas
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
