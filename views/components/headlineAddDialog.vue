<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title>New Headline</v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <!-- Begin Input Row -->
      <v-form ref="form">
        <v-text-field label="Name" v-model="headline.name" required> </v-text-field>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm()" :loading="!submitDone">OK</v-btn>
        <v-btn @click="close()" class="red white--text">Cancel</v-btn>
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
    },
    submitDone: true,
  }),

  methods: {
    submit() {
      this.submitDone = false
      http.post("/headlines", this.headline)
        .then(response => {
          this.close()
          this.alert(true, 'Create', 'Headline')
        })
        .catch(e => {
          this.close()
          this.alert(false, 'Create', 'Headline')
        });
    },

    close() {
      this.$emit('closeAdd')
      this.submitDone = true
    },

    checkForm() {
      return this.headline.name === '' ? true : false
    },

    alert(success, callName, resource) {
      console.log('Add Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
