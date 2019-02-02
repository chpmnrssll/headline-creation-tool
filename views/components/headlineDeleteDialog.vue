<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title>Delete {{headline.name}}</v-toolbar-title>
  </v-toolbar>

  <v-card-text>
    <p>Are you sure you want to delete <strong>{{headline.name}}</strong>?</p>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn @click="confirmDelete()" :loading="!deleteDone" class="green lighten-1 white--text">Delete</v-btn>
    <v-btn @click="close()" class="red darken-2 white--text">Cancel</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { http } from '../config/http'

export default {
  data: () => ({
    deleteDone: true,
  }),

  props: {
    headline: {
      type: Object
    }
  },

  methods: {
    confirmDelete() {
      this.deleteDone = false
      http
        .delete("/headlines/" + this.headline._id)
        .then(response => {
          this.deleteDone = true
          this.alert(true, 'Delete', 'Headline')
          this.close()
        })
        .catch(e => {
          this.deleteDone = true
          this.alert(false, 'Delete', 'Headline')
          this.close()
        });
    },

    close() {
      this.$emit('closeDelete')
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
    }
  },

  mounted() {}

}
</script>

<style>

</style>
