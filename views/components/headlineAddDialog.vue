<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title> Add A Headline </v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <!-- Begin Input Row -->
      <v-form ref="form">
        <v-text-field label="Name" v-model="headline.name" required> </v-text-field>
      </v-form>

      <v-card-actions>
        <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm()" :loading="!submitDone">Submit</v-btn>
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
    headline: {
      name: '',
      type: '',
      zIndex: 0,
    },
    submitDone: true,
  }),

  methods: {
    submit() {
      this.submitDone = false
      http
        .post("/headlines", this.headline)
        .then(response => {
          this.submitDone = true
          this.alert(true, 'Create', 'Headline')
          this.close()
        })
        .catch(e => {
          this.submitDone = true
          this.alert(false, 'Create', 'Headline')
        });
    },

    load() {
      this.headline = {
        name: '',
        layers: [],
      }
      this.submitDone = true
    },

    close() {
      this.load()
      this.$emit('closeAdd')
    },

    checkForm() {
      if (this.headline.name == '') {
        return true
      } else {
        return false
      }
    },

    alert(success, callName, resource) {
      console.log('Add Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
