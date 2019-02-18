<template>
<v-expansion-panel>
  <v-expansion-panel-content>
    <div slot="header">Image</div>
    <v-layout row ml-4>
      <v-text-field v-if="selectedLayer" :value="selectedLayer.image" @change="setImage" label="URL"></v-text-field>
    </v-layout>

    <v-layout row ml-4>
      <v-btn flat @click="triggerFilePicker()">
        <v-icon>collections</v-icon>&nbsp;Source
      </v-btn>
    </v-layout>

    <input type="file" id="filePicker" ref="filePicker" v-on:change="uploadFile()" hidden/>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider class="my-0" v-if="selectedLayer.translate" thumb-label :value="selectedLayer.translate.x" @input="setTranslateX" min="0" :max="settings.background.width" label="X"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field class="my-0 pt-0" v-if="selectedLayer.translate" :value="selectedLayer.translate.x" @input="setTranslateX" min="0" :max="settings.background.width" type="number"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider class="my-0" v-if="selectedLayer.translate" thumb-label :value="this.selectedLayer.translate.y" @input="setTranslateY" min="0" :max="settings.background.height" label="Y"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field class="my-0 pt-0" v-if="selectedLayer.translate" :value="selectedLayer.translate.y" @input="setTranslateY" min="0" :max="settings.background.height" type="number"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider class="my-0" v-if="selectedLayer" thumb-label :value="selectedLayer.rotation" @input="setRotation" min="0" max="360" step="0.1" label="Rotation"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field class="my-0 pt-0" v-if="selectedLayer" :value="selectedLayer.rotation" @input="setRotation" min="0" max="360" step="0.1" type="number"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider class="my-0" v-if="selectedLayer.scale" :value="selectedLayer.scale.x" @input="setScaleX" min="0" max="4" step="0.001" label="Scale X" thumb-label></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field class="my-0 pt-0" v-if="selectedLayer.scale" :value="selectedLayer.scale.x" @input="setScaleX" min="0" max="8" type="number" step="0.005"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider class="my-0" v-if="selectedLayer.scale" thumb-label :value="selectedLayer.scale.y" @input="setScaleY" min="0" max="4" step="0.001" label="Scale Y"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field class="my-0 pt-0" v-if="selectedLayer.scale" :value="selectedLayer.scale.y" @input="setScaleY" min="0" max="8" type="number" step="0.005"></v-text-field>
      </v-flex>
    </v-layout>

  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { http } from '../config/http'

export default {
  computed: {
    ...mapState({
      selectedLayer: state => state.data.selectedLayer,
      settings: state => state.settings
    }),
  },

  methods: {
    ...mapMutations({
      setImage: 'data/setImage',
      setTranslateX: 'data/setTranslateX',
      setTranslateY: 'data/setTranslateY',
      setRotation: 'data/setRotation',
      setScaleX: 'data/setScaleX',
      setScaleY: 'data/setScaleY',
    }),
    triggerFilePicker() {
      document.getElementById('filePicker').click()
    },
    uploadFile() {
      console.log(document.getElementById('filePicker').files[0])
      // Initialize the form data
      let formData = new FormData()
      // Add the form data we need to submit
      formData.append('file', this.$refs.filePicker.files[0])
      // Make the request to the POST /single-file URL
      http.post('/images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function () {
          console.log('FAILURE!!')
        })
    }
  }
}
</script>
