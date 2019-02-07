<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title> Add A Layer </v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <!-- Begin Input Row -->
      <v-form ref="form">
        <v-text-field v-model="newLayer.name" label="Name" required></v-text-field>
        <v-select mx-4 v-model="newLayer.layerType" :items="layerTypes" label="Layer Type"></v-select>
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
import { mapMutations } from 'vuex'

export default {
  data: () => ({
    newLayer: {
      name: 'New Layer',
      layerType: 'text',
    },
    layerTypes: [
      { text: 'Text', value: 'text' },
      { text: 'Image', value: 'image'}
    ],
    submitDone: true,
  }),

  methods: {
    ...mapMutations({
      addLayer: 'data/addLayer'
    }),

    submit() {
      this.submitDone = false

      try {
        this.addLayer(this.newLayer)
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

    checkForm() {
      return this.newLayer.name === '' ? true : false
    },

    alert(success, callName, resource) {
      console.log('Add Layer Alerting')
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
