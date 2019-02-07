<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title>Save</v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <!-- Begin Input Row -->
      <v-form ref="form">
        <v-text-field label="Name" v-model="filename" required></v-text-field>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm()" :loading="!submitDone">OK</v-btn>
        <v-btn @click="close()" class="red white--text">Close</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-container>
</v-card>
</template>

<script>
import { http } from '../config/http'
import { mapMutations, mapState, } from 'vuex'

export default {
  data: () => ({
    submitDone: true,
    filename: ''
  }),

  computed: {
    ...mapState({
      selectedHeadline: state => state.data.selectedHeadline,
    }),
  },

  mounted() {
    this.filename = this.selectedHeadline.name
  },

  methods: {
    ...mapMutations({
      updateSelectedHeadlineName: 'data/updateSelectedHeadlineName'
    }),

    submit(e) {
      this.submitDone = false
      this.updateSelectedHeadlineName(this.filename)
      http.post("/headlines", this.selectedHeadline).then(response => {
        this.alert(true, 'Create', 'Headline')
        this.close()
      }).catch(e => {
        this.alert(false, 'Create', 'Headline')
        this.close()
      });
    },

    close() {
      this.$emit('closeSave')
      this.submitDone = true
    },

    checkForm() {
      return this.selectedHeadline.name === '' ? true : false
    },

    alert(success, callName, resource) {
      console.log('Save Headline Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
