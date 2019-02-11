<template>
<v-expansion-panel>
  <v-expansion-panel-content>
    <div slot="header">Image</div>
    <v-layout row ml-4>
      <v-text-field v-if="selectedLayer" :value="selectedLayer.image" @change="setImage" label="URL"></v-text-field>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider v-if="selectedLayer" thumb-label :value="selectedLayer.translate.x" @input="setTranslateX" min="-1000" max="1000" label="X"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field v-if="selectedLayer" :value="selectedLayer.translate.x" @input="setTranslateX" min="-1000" max="1000" type="number" label="px"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider v-if="selectedLayer" thumb-label :value="selectedLayer.translate.y" @input="setTranslateY" min="-1000" max="1000" label="Y"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field v-if="selectedLayer" :value="selectedLayer.translate.y" @input="setTranslateY" min="-1000" max="1000" type="number" label="px"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider v-if="selectedLayer" thumb-label :value="selectedLayer.rotation" @input="setRotation" min="0" max="360" label="Rotation"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field v-if="selectedLayer" :value="selectedLayer.rotation" @input="setRotation" min="0" max="360" type="number" label="deg"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider v-if="selectedLayer" :value="selectedLayer.scale.x" @input="setScaleX" min="0" max="4" step="0.001" label="Scale X" thumb-label></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field v-if="selectedLayer" :value="selectedLayer.scale.x" @input="setScaleX" min="0" max="8" type="number" step="0.005" label=""></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row ml-4>
      <v-flex xs9>
        <v-slider v-if="selectedLayer" thumb-label :value="selectedLayer.scale.y" @input="setScaleY" min="0" max="4" step="0.001" label="Scale Y"></v-slider>
      </v-flex>
      <v-flex xs3 mx-4>
        <v-text-field v-if="selectedLayer" :value="selectedLayer.scale.y" @input="setScaleY" min="0" max="8" type="number" step="0.005" label=""></v-text-field>
      </v-flex>
    </v-layout>

  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      selectedHeadline: state => state.data.selectedHeadline,
      selectedLayer: state => state.data.selectedLayer
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
    })
  }
}
</script>
