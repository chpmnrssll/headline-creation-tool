<template>
<v-container :style="style" pa-3>
  <v-layout column>
    <v-text-field v-if="selectedLayer" :value="selectedLayer.text" @input="updateLayerText" label="Text"></v-text-field>

    <v-select v-if="selectedLayer" :items="font.families" :value="selectedLayer.font.family" @input="updateLayerFontFamily" label="Font" class="mt-0" :style="{ height: '48px' }"></v-select>

    <v-slider v-if="selectedLayer" :value="parseInt(selectedLayer.font.size)" @input="updateLayerFontSize" thumb-label class="mt-0" :min="1" :max="256" label="Size"></v-slider>

    <v-btn-toggle v-model="font.style" multiple>
      <v-btn :value="1" flat>
        <v-icon>format_bold</v-icon>
      </v-btn>
      <v-btn :value="2" flat>
        <v-icon>format_italic</v-icon>
      </v-btn>
      <v-btn :value="3" flat>
        <v-icon>format_underlined</v-icon>
      </v-btn>
      <v-btn :value="4" flat>
        <v-icon>format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-btn-toggle v-model="font.justify" mandatory>
      <v-btn :value="1" flat>
        <v-icon>format_align_left</v-icon>
      </v-btn>
      <v-btn :value="2" flat>
        <v-icon>format_align_center</v-icon>
      </v-btn>
      <v-btn :value="3" flat>
        <v-icon>format_align_right</v-icon>
      </v-btn>
      <v-btn :value="4" flat>
        <v-icon>format_align_justify</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-layout>
  <!-- <v-textarea name="input-7-1" label="Default style" value="v-textarea.value" hint="Hint text"></v-textarea> -->
</v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'

export default {
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
    font: {
      justify: null,
      size: '16',
      style: [null],
      families: [
        'Arial',
        'Calibri',
        'Courier',
        'Verdana',
        'Luckiest Guy',
        'Permanent Marker'
      ],
    },
  }),

  computed: {
    ...mapState({
      layers: state => Array.from(state.layers.all)
    }),
    selectedLayer() {
      if (this.$store.state.layers.selectedLayer) {
        return this.$store.state.layers.all.find(layer => layer.selected)
      }
      return {}
    },
  },

  methods: {
    updateLayerText(text) {
      this.$store.commit('layers/updateLayerText', text)
    },
    updateLayerFontSize(size) {
      this.$store.commit('layers/updateLayerFontSize', size)
    },
    updateLayerFontFamily(family) {
      this.$store.commit('layers/updateLayerFontFamily', family)
    }
  },
}
</script>
