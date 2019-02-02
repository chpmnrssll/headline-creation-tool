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
                <headlineAddDialog @closeAdd="addDialog = false" @alert="alert">
                </headlineAddDialog>
              </v-dialog>
            </v-toolbar>


            <v-data-table :items="headlines" item-key="zIndex" :pagination.sync="pagination" class="elevation-1" hide-actions hide-headers select-all>
              <template slot="items" slot-scope="props">
                <tr :active="props.item.selected" @click="setSelectedLayer(props.item.zIndex)">
                  <td class="pa-4">
                    <v-text-field v-model="props.item.name" class="my-0 py-1" :hint="`${props.item.layers.length} Layers`" persistent-hint></v-text-field>
                  </td>
                  <td class="ma-4">
                    <v-btn icon small class="ma-0" @click="$emit('setUpEdit', headline)">
                      <v-icon small color="blue" xs-4 class="text-xs-right">color_lens</v-icon>
                    </v-btn>
                    <v-btn class="ma-0" icon small>
                      <v-icon icon small color="error">delete_forever</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>


            <!-- List of Headlines -->
            <span v-if="headlines.length">
              <headlineItem v-for="headline in headlines" :key="headline._id" :headline="headline" @setUpEdit="setupEdit(headline)" @setUpDelete="setupDelete(headline)">
              </headlineItem>
            </span>
            <v-card v-else class="headline text-xs-center">No Headlines to show</v-card>

            <!-- Begin Delete Dialog -->
            <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
              <headlineDeleteDialog :headline="headlinesToDelete" @closeDelete="deleteDialog = false" @alert="alert">
              </headlineDeleteDialog>
            </v-dialog>
            <!-- End Delete Dialog -->

          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</v-container>
</template>

<script>
import {
  http
} from "../config/http.js"
import headlineItem from "../components/headlineItem.vue"
import headlineAddDialog from "../components/headlineAddDialog.vue"
import headlineEditDialog from "../components/headlineEditDialog.vue"
import headlineDeleteDialog from "../components/headlineDeleteDialog.vue"

export default {
  //Variables
  data: () => ({
    addDialog: false,
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    deleteDialog: false,
    // editDialog: false,
    editName: "",
    errors: [],
    headlines: [],
    headlinesToDelete: {},
    headlineToEdit: {},
    newHeadline: {},
    pagination: {
      descending: true,
    },
  }),

  //Components this page will need
  components: {
    headlineItem: headlineItem,
    headlineAddDialog: headlineAddDialog,
    headlineEditDialog: headlineEditDialog,
    headlineDeleteDialog: headlineDeleteDialog
  },

  //The methods we will need
  methods: {
    //load all headlines from DB, we call this often to make sure the data is up to date
    load() {
      http
        .get("headlines")
        .then(response => {
          this.headlines = response.data.headlines;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    //opens delete dialog
    setupDelete(headline) {
      this.headlinesToDelete = headline;
      this.deleteDialog = true;
    },

    //opens edit dialog
    setupEdit(headline) {
      this.$store.commit('layers/setLayers', headline.layers)

      // Object.keys(headline).forEach(key => {
      //   this.headlineToEdit[key] = headline[key];
      // });
      // this.editName = headline.name;
      // this.editDialog = true;
    },

    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the
    //resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting')
      this.$emit('alert', success, callName, resource)
      this.load()
    }
  },

  //get those headlines
  mounted() {
    this.load();
  }
};
</script>
