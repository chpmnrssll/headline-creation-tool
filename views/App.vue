<template>
<v-app :dark="isDarkMode">
  <v-navigation-drawer persistent :mini-variant="miniVariant" :clipped="clipped" :temporary="temporary" v-model="drawer" enable-resize-watcher app width="200" class="primary">
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

      <v-list-tile @click="saveHeadline = true">
        <v-list-tile-action>
          <v-btn slot="activator" color="primary" icon>
            <v-icon class="primaryText--text">save</v-icon>
          </v-btn>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primaryText--text">Save Headline</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile href="/#/home" :class="getNavClass('/#/home')">
        <v-list-tile-action>
          <v-icon class="primaryText--text">color_lens</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="primaryText--text">Canvas</v-list-tile-title>
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

  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  <!-- <v-toolbar class="primary primaryText--text" fixed app :clipped-left="clipped">
    <v-toolbar-side-icon class="primaryText--text" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title> {{ title }} </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="isDarkMode = !isDarkMode" icon>
      <v-icon class="primaryText--text" v-if="!isDarkMode"> brightness_5 </v-icon>
      <v-icon class="primaryText--text" v-else> brightness_3 </v-icon>
    </v-btn>
  </v-toolbar> -->

  <v-content>
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
export default {
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: false,
    temporary: true,
    miniVariant: false,
    right: true,
    rightDrawer: false,
    title: "Headline Creation Tool",
    alertOpen: false,
    alertString: '',
    alertSuccess: false,
    isDarkMode: false,
  }),

  watch: {
    isDarkMode() {
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
