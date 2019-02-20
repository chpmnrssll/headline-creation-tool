<template>
<v-app :dark="isDarkMode">
  <v-navigation-drawer app enable-resize-watcher clipped temporary persistent :mini-variant="miniVariant" v-model="drawer" width="200" class="primary">
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-tooltip right>
            <v-btn slot="activator" color="primary" @click.stop="miniVariant = !miniVariant" icon>
              <v-icon class="primaryText--text" v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <span v-html="miniVariant ? 'Expand Drawer' : 'Collapse Drawer'"></span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile href="/#/" :class="getNavClass('/#/')">
        <v-list-tile-action>
          <v-icon class="primaryText--text">color_lens</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primaryText--text">Canvas</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="saveHeadline" :disabled="isHeadlinesPage">
        <v-list-tile-action>
          <v-btn slot="activator" color="primary" icon :disabled="isHeadlinesPage">
            <v-icon class="primaryText--text">save</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-if="!isHeadlinesPage" class="primaryText--text">Save Headline</v-list-tile-title>
          <v-list-tile-title v-else>Save Headline</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile href="/#/headlines" :class="getNavClass('/#/headlines')">
        <v-list-tile-action>
          <v-icon class="primaryText--text">folder</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primaryText--text">Headlines</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

    </v-list>
  </v-navigation-drawer>

  <v-toolbar class="elevation-0" fixed app clipped-left>
    <v-tooltip bottom>
      <v-toolbar-side-icon slot="activator" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span>Open Drawer</span>
    </v-tooltip>
    <v-tooltip bottom v-if="!isHeadlinesPage">
      <v-text-field v-if="selectedHeadline" slot="activator" :value="selectedHeadline.name" @input="setSelectedHeadlineName" class="my-0 py-0" :style="{ maxHeight: '32px' }"></v-text-field>
      <span>Current Headline Name</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <v-btn @click="isDarkMode = !isDarkMode" icon>
      <v-icon color="amber lighten-4" v-if="!isDarkMode"> brightness_5 </v-icon>
      <v-icon color="indigo lighten-4" v-else> brightness_3 </v-icon>
    </v-btn>
  </v-toolbar>

  <v-content class="pt-6">
    <v-fade-transition mode="out-in">
      <router-view @alert="alert"></router-view>
    </v-fade-transition>
  </v-content>

  <v-snackbar bottom :value="alertOpen" :color="alertSuccess ? 'success' : 'error'">
    {{ alertString }}
  </v-snackbar>
</v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { http } from './config/http'

export default {
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: false,
    temporary: true,
    miniVariant: false,
    right: true,
    rightDrawer: false,
    saveDialog: false,
    alertOpen: false,
    alertString: '',
    alertSuccess: false,
    isDarkMode: false,
  }),

  computed: {
    ...mapState({
      selectedHeadline: state => state.data.selectedHeadline,
    }),
    isHeadlinesPage() {
      return this.$route.path === '/headlines'
    }
  },

  watch: {
    isDarkMode() {
      if (!this.isDarkMode) { //NOT dark mode
        this.$vuetify.theme = {
          primary: '#0d5173', //Main color
          primaryText: '#FFFFFF', //Color for text on primary
          secondary: '#269dd9', //Color for active nav
          lightText: '#000000'
        }
      } else { //Dark mode
        this.$vuetify.theme = {
          primary: '#424242', //Main color
          primaryText: '#FFFFFF', //Color for text on primary
          secondary: '#0d5173', //Color for active nav
          lightText: '#FFFFFF'
        }
      }
    }
  },

  methods: {
    ...mapMutations({
      'setSelectedHeadlineName': 'data/setSelectedHeadlineName',
    }),

    alert(success, callName, resource) {
      this.alertOpen = false
      this.alertString = callName + ' ' + resource
      if (success) {
        this.alertSuccess = true
        this.alertString += ' was successful.'
      } else {
        this.alertSuccess = false
        this.alertString += ' has failed.'
      }
      this.alertOpen = true
    },

    saveHeadline() {
      this.drawer = false
      http.put("/headlines/" + this.selectedHeadline._id, this.selectedHeadline)
        .then(response => {
          this.alert(true, 'Save', 'Headline')
        }).catch(e => {
          this.alert(false, 'Save', 'Headline')
        })
    },

    getNavClass(href) {
      if (this.$route.fullPath == href.substring(2)) {
        return 'secondary primaryText--text'
      } else {
        return 'primary primaryText--text'
      }
    }
  }

};
</script>
