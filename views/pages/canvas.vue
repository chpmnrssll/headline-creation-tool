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
import { mapActions, mapMutations, mapState } from 'vuex'
import layerCanvas from '../components/layerCanvas'
import tabSettings from '../components/tabSettings'
import tabLayers from '../components/tabLayers'

export default {
  data: () => ({
    activeTab: null,
    isDarkMode: false,
  }),

  computed: {
    ...mapState({
      settings: state => state.settings,
      headlineLoaded: state => state.data.headlineLoaded,
      selectedHeadline: state => state.data.selectedHeadline,
    }),
    layout() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        return {
          row: true
        }
      } else {
        return {
          column: true
        }
      }
    },
  },

  components: {
    layerCanvas: layerCanvas,
    tabSettings: tabSettings,
    tabLayers: tabLayers,
  },

  methods: {
    ...mapActions({
      'defaultHeadline': 'data/defaultHeadline',
      'loadHeadlines': 'data/loadHeadlines',
      'loadHeadline': 'data/loadHeadline'
    }),
    ...mapMutations({
      'setHeadlineLoaded': 'data/setHeadlineLoaded',
      'setSelectedHeadline': 'data/setSelectedHeadline'
    }),
  },

  mounted() {
    if (this.$route.params.id) {
      this.loadHeadline(this.$route.params.id)
        .then(() => {
          this.setSelectedHeadline(this.$route.params.id)
          this.setHeadlineLoaded(true)
        })
    } else {
      this.$router.push('/headlines')
    }
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
