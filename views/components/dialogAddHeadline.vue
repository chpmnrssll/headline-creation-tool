<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title>New Headline</v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <v-text-field label="Name" v-model="newHeadline.name" required></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="addHeadline()" class="green lighten-1 white--text" :disabled="checkName()" :loading="!addDone">OK</v-btn>
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
    addDone: true,
    newHeadline: {
      _id: '',
      name: '',
    }
  }),

  methods: {
    addHeadline() {
      this.addDone = false
      http.post("/headlines", this.newHeadline)
        .then(response => {
          this.close()
          this.alert(true, 'Create', 'Headline')
        }).catch(e => {
          this.close()
          this.alert(false, 'Create', 'Headline')
        })
    },

    close() {
      this.$emit('closeAdd')
      this.addDone = true
    },

    checkName() {
      return this.newHeadline.name === '' ? true : false
    },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
