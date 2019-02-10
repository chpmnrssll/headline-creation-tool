<template>
<v-container row fluid class="pa-0">
  <v-layout v-bind="layout">
    <v-flex ml-5 mr-2>
      <displayCanvas></displayCanvas>
    </v-flex>

    <v-flex xs4 ml-2 mr-5>
      <v-tabs v-model="activeTab" :style="{ height: '85vh'}" color="primary" dark slider-color="secondary">
        <v-tab :headlineLoaded="headlineLoaded" ripple>Layers</v-tab>
        <v-tab-item>
          <layersTab :style="{height: '77.5vh', overflowY: 'auto'}"></layersTab>
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
import displayCanvas from '../components/displayCanvas'
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
    layersTab: layersTab,
    settingsTab: settingsTab,
    displayCanvas: displayCanvas
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
