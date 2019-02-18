<template>
<v-container class="pa-0">
  <v-container>
    <template>
      <v-layout row>
        <v-flex>
          <v-card>
            <!-- Begin Toolbar -->
            <v-toolbar class="primary primaryText--text">
              <v-toolbar-title> Images </v-toolbar-title>
              <v-spacer></v-spacer>

              <!-- Add Dialog Button -->
              <v-dialog v-model="addDialog" lazy absolute max-width="50%">
                <v-btn class="primaryText--text" icon slot="activator">
                  <v-icon> control_point </v-icon>
                </v-btn>

                <!-- Add Dialog -->
                <dialogAddImage @closeAdd="addDialog=false" @alert="alert">
                </dialogAddImage>
              </v-dialog>
            </v-toolbar>

            <!-- List of Images -->
            <v-container fluid grid-list-sm>
              <v-layout row wrap>
                <v-flex v-for="i in 6" :key="i" xs4>
                  <v-btn class="ma-0" @click="deleteImage(props.item._id)" icon>
                    <v-tooltip bottom>
                      <v-icon slot="activator" icon color="error">delete_forever</v-icon>
                      <span>Delete Image</span>
                    </v-tooltip>
                  </v-btn>
                  <img :src="`https://randomuser.me/api/portraits/men/${i + 20}.jpg`" class="image" alt="lorem" width="100%" height="100%">
                </v-flex>
              </v-layout>
            </v-container>
            <!-- Begin Delete Dialog -->
            <v-dialog v-model="deleteDialog" lazy absolute max-width="40%">
              <dialogDeleteImage :image="imageToDelete" @closeDelete="deleteDialog = false" @alert="alert">
              </dialogDeleteImage>
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
import { http } from "../config/http.js"
import { mapActions, mapMutations, mapState } from 'vuex'

import dialogAddImage from "../components/dialogAddImage.vue"
import dialogDeleteImage from "../components/dialogDeleteImage.vue"

export default {
  data: () => ({
    addDialog: false,
    alertSettings: {}, //this is to abstract our our alerts to make them easier and stop repeating code
    deleteDialog: false,
    editName: "",
    errors: [],
    // images: [],
    imageToDelete: {},
    imageToEdit: {},
    newImage: {},
    pagination: {
      descending: true,
    },
  }),

  components: {
    dialogAddImage: dialogAddImage,
    dialogDeleteImage: dialogDeleteImage
  },

  computed: {
    ...mapState({
      images: state => state.data.images
    })
  },

  methods: {
    ...mapActions({
      'loadImages': 'data/loadImages',
    }),
    ...mapMutations({
      'setSelectedImage': 'data/setSelectedImage',
      'setImageLoaded': 'data/setImageLoaded',
      'setSelectedLayer': 'data/setSelectedLayer',
      'setRefreshImages': 'data/setRefreshImages',
      'setRefreshText': 'data/setRefreshText',
    }),

    //opens delete dialog
    deleteImage(_id) {
      this.imageToDelete = this.images.find(image => image._id === _id)
      this.deleteDialog = true
    },

    openImage(image) {
      this.setSelectedImage(image._id)
      this.setImageLoaded(true)
      this.$router.push('/')
    },

    //build the alert info for us
    //Will emit an alert, followed by a boolean for success, the type of call made, and the name of the
    //resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting')
      this.$emit('alert', success, callName, resource)
      this.loadImages()
    }
  },

  mounted() {
    this.loadImages()
  }
}
</script>
