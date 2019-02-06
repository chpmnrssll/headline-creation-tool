<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">Text</div>
      <v-textarea v-if="selectedLayer" @input="updateSelectedLayerText" :value="selectedLayer.text" class="px-4" box></v-textarea>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header">Primary Font</div>
      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="parseInt(selectedLayer.font.primary.size)" @input="updateSelectedLayerPrimaryFontSize" thumb-label :min="1" :max="256"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field v-if="selectedLayer" :value="parseInt(selectedLayer.font.primary.size)" @input="updateSelectedLayerPrimaryFontSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout mx-4>
        <v-select mx-4 v-if="selectedLayer" :items="font.families" :value="selectedLayer.font.primary.family" @input="updateSelectedLayerPrimaryFontFamily" label="Family"></v-select>
      </v-layout>

      <v-layout mx-4>
        <input type="color" :value="selectedLayer.font.primary.color" @input="updateSelectedLayerPrimaryFontColor"></input>
      </v-layout>

      <v-layout column mx-4 mb-4>
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
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header">Secondary Font</div>
      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer.font.secondary" :value="parseInt(selectedLayer.font.secondary.size)" @input="updateSelectedLayerSecondaryFontSize" thumb-label :min="1" :max="256"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field v-if="selectedLayer.font.secondary" :value="parseInt(selectedLayer.font.secondary.size)" @input="updateSelectedLayerSecondaryFontSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout mx-4>
        <v-select mx-4 v-if="selectedLayer.font.secondary" :items="font.families" :value="selectedLayer.font.secondary.family" @input="updateSelectedLayerSecondaryFontFamily" label="Family"></v-select>
      </v-layout>

      <v-layout mx-4>
        <input type="color" v-if="selectedLayer.font.secondary" :value="selectedLayer.font.secondary.color" @input="updateSelectedLayerSecondaryFontColor"></input>
      </v-layout>

      <v-layout column mx-4>
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
    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
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
      selectedHeadline: state => state.data.selectedHeadline,
      selectedLayer: state => state.data.selectedLayer
    }),
  },

  methods: {
    ...mapMutations({
      updateSelectedLayerText: 'data/updateSelectedLayerText',
      updateSelectedLayerPrimaryFontColor: 'data/updateSelectedLayerPrimaryFontColor',
      updateSelectedLayerPrimaryFontFamily: 'data/updateSelectedLayerPrimaryFontFamily',
      updateSelectedLayerPrimaryFontSize: 'data/updateSelectedLayerPrimaryFontSize',
      updateSelectedLayerSecondaryFontColor: 'data/updateSelectedLayerSecondaryFontColor',
      updateSelectedLayerSecondaryFontFamily: 'data/updateSelectedLayerSecondaryFontFamily',
      updateSelectedLayerSecondaryFontSize: 'data/updateSelectedLayerSecondaryFontSize',
    })
  },
}
</script>
