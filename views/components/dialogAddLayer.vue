<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title> Add A Layer </v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <!-- Begin Input Row -->
      <v-form ref="form">
        <v-text-field v-model="defaultLayer.name" label="Name" required></v-text-field>
        <v-select mx-4 v-model="defaultLayer.layerType" :items="layerTypes" label="Layer Type"></v-select>
      </v-form>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="submit()" class="green lighten-1 white--text" :disabled="checkForm" :loading="!submitDone">OK</v-btn>
        <v-btn @click="close()" class="red white--text">Cancel</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-container>
</v-card>
</template>

<script>
import { http } from '../config/http'
import { mapMutations } from 'vuex'
import { defaultLayer } from './defaultLayer.js'

export default {
  data: () => ({
    defaultLayer: defaultLayer,
    layerTypes: [
      { text: 'Text', value: 'text' },
      { text: 'Image', value: 'image'}
    ],
    submitDone: true
  }),
  computed: {
    checkForm() {
      return this.defaultLayer.name === '' ? true : false
    },
  },

  methods: {
    ...mapMutations({
      addLayer: 'data/addLayer'
    }),

    submit() {
      this.submitDone = false

      try {
        this.addLayer(this.defaultLayer)
        this.close()
        this.alert(true, 'Create', 'Layer')
      } catch (e) {
        this.close()
        this.alert(false, 'Create', 'Layer')
      }
    },

    close() {
      this.$emit('closeAdd')
      this.submitDone = true
    },

    alert(success, callName, resource) {
      console.log('Add Layer Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
