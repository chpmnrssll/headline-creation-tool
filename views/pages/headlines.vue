<template>
<v-container class="pa-0">
  <v-container>
    <template>
      <v-layout row>
        <v-flex>
          <v-card>
            <!-- Begin Toolbar -->
            <v-toolbar class="primary primaryText--text">
              <v-toolbar-title> Headlines </v-toolbar-title>
              <v-spacer></v-spacer>

              <!-- Add Dialog Button -->
              <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                <v-btn class="primaryText--text" icon slot="activator">
                  <v-icon> control_point </v-icon>
                </v-btn>

                <!-- Add Dialog -->
                <dialogAddHeadline @closeAdd="addDialog=false" @alert="alert">
                </dialogAddHeadline>
              </v-dialog>
            </v-toolbar>

            <!-- List of Headlines -->
            <v-data-table :items="headlines" item-key="zIndex" :pagination.sync="pagination" class="elevation-1" hide-actions hide-headers select-all>
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="pa-4">
                    <v-text-field v-model="props.item.name" class="my-0 py-1" :hint="`${props.item.layers.length} Layers`" persistent-hint></v-text-field>
                  </td>
                  <td class="ma-4">
                    <v-tooltip bottom>
                      <!-- <v-btn slot="activator" icon small class="ma-0" @click="openHeadline(props.item)"> -->
                      <v-btn slot="activator" icon small class="ma-0" :to="`/headlines/${props.item._id}`">
                        <v-icon small color="blue" xs-4 class="text-xs-right">color_lens</v-icon>
                      </v-btn>
                      <span>Open Canvas</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <v-btn slot="activator" class="ma-0" icon small @click="deleteHeadline(props.item._id)">
                        <v-icon icon small color="error">delete_forever</v-icon>
                      </v-btn>
                      <span>Delete Headline</span>
                      <!-- Begin Delete Dialog -->
                      <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
                        <dialogDeleteHeadline :headline="headlineToDelete" @closeDelete="deleteDialog = false" @alert="alert">
                        </dialogDeleteHeadline>
                      </v-dialog>
                      <!-- End Delete Dialog -->
                    </v-tooltip>
                  </td>
                </tr>
              </template>
            </v-data-table>

          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</v-container>
</template>

<script>
import { http } from "../config/http.js"
import { mapActions, mapMutations, mapState } from 'vuex'

import dialogAddHeadline from "../components/dialogAddHeadline.vue"
import dialogDeleteHeadline from "../components/dialogDeleteHeadline.vue"

export default {
  data: () => ({
    addDialog: false,
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    deleteDialog: false,
    editName: "",
    errors: [],
    // headlines: [],
    headlineToDelete: {},
    headlineToEdit: {},
    newHeadline: {},
    pagination: {
      descending: true,
    },
  }),

  components: {
    dialogAddHeadline: dialogAddHeadline,
    dialogDeleteHeadline: dialogDeleteHeadline
  },

  computed: {
    ...mapState({
      headlines: state => state.data.headlines
    })
  },

  methods: {
    ...mapActions({
      'loadHeadlines': 'data/loadHeadlines',
    }),
    ...mapMutations({
      'setSelectedHeadline': 'data/setSelectedHeadline',
      'setHeadlineLoaded': 'data/setHeadlineLoaded',
      'setSelectedLayer': 'data/setSelectedLayer',
      'setRefreshImages': 'data/setRefreshImages',
      'setRefreshText': 'data/setRefreshText',
    }),

    //opens delete dialog
    deleteHeadline(_id) {
      this.headlineToDelete = this.headlines.find(headline => headline._id === _id)
      this.deleteDialog = true
    },

    openHeadline(headline) {
      this.setSelectedHeadline(headline._id)
      this.setHeadlineLoaded(true)
      this.$router.push('/')
    },

    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the
    //resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting')
      this.$emit('alert', success, callName, resource)
      this.loadHeadlines()
    }
  },

  mounted() {
    this.loadHeadlines()
  }
}
</script>
