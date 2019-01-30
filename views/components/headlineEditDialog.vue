<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title> Edit Headline: {{editName}} </v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <!-- Begin Input Row -->
      <v-form ref="form">
        <v-text-field label="Name" v-model="changedHeadline.name"> </v-text-field>
        <v-slider label="zIndex" v-model="changedHeadline.zIndex" thumb-label step="1"></v-slider>
      </v-form>

      <v-card-actions>
        <v-btn @click="edit()" :loading="!editDone" :disabled="checkForm()" class="green lighten-1 white--text">Submit</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="close()" class="red white--text">Close</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-container>
</v-card>
</template>

<script>
import { http } from '../config/http'

export default {
  data: () => ({
    changedHeadline: {
      name: '',
      type: '',
      zIndex: 0
    },
    editDone: true
  }),

  props: {
    headline: {
      type: Object
    },
    editName: {
      type: String,
      default: ''
    }
  },

  methods: {
    edit() {
      this.editDone = false
      http
        .put("/layers/" + this.headline._id, this.changedHeadline)
        .then(response => {
          this.alert(true, 'Edit', 'Headline')
          this.editDone = true
        })
        .catch(e => {
          this.alert(false, 'Edit', 'Headline')
          this.editDone = true
        });

    },

    close() {
      this.$emit('closeEdit')
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
      this.close()
    },

    checkForm() {
      if (this.changedHeadline.name == '' || this.changedHeadline.type == '') {
        return true
      } else {
        return false
      }
    }
  },

  mounted() {
    this.changedHeadline = this.headline
  }

}
</script>

<style>

</style>
