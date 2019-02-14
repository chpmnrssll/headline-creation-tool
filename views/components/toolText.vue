<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">Text</div>
      <v-textarea v-if="selectedLayer" @input="setText" :value="selectedLayer.text" class="px-4" box></v-textarea>

      <v-layout row ml-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" thumb-label :value="selectedLayer.translate.x" @input="setTranslateX" main="" :max="settings.background.width" label="X"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="selectedLayer.translate.x" @input="setTranslateX" main="" :max="settings.background.width" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row ml-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" thumb-label :value="selectedLayer.translate.y" @input="setTranslateY" main="" :max="settings.background.height" label="Y"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="selectedLayer.translate.y" @input="setTranslateY" main="" :max="settings.background.height" type="number" label="px"></v-text-field>
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
    </v-expansion-panel-content>

    <toolFont :font="primaryFont"></toolFont>
    <toolFont :font="secondaryFont"></toolFont>

  </v-expansion-panel>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import toolFont from '../components/toolFont'

export default {
  computed: {
    ...mapState({
      selectedLayer: state => state.data.selectedLayer,
      settings: state => state.settings
    }),
    primaryFont() {
      return {
        ...this.selectedLayer.font.primary,
        desc: 'primary'
      }
    },
    secondaryFont() {
      let secondaryFont = this.selectedLayer.font.secondary || this.selectedLayer.font.primary
      return {
        ...secondaryFont,
        desc: 'secondary'
      }
    },
  },

  components: {
    toolFont: toolFont,
  },

  methods: {
    ...mapMutations({
      setText: 'data/setText',
      setTranslateX: 'data/setTranslateX',
      setTranslateY: 'data/setTranslateY',
      setRotation: 'data/setRotation',
    })
  }
}
</script>
