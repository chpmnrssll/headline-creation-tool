<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">Text</div>
      <v-textarea v-if="selectedLayer" @input="updateLayerText" :value="selectedLayer.text" class="px-4" box></v-textarea>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header">Primary Font</div>
      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="parseInt(primaryFont.size)" @input="updateLayerPrimaryFontSize" thumb-label :min="1" :max="256"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field v-if="selectedLayer" :value="parseInt(primaryFont.size)" @input="updateLayerPrimaryFontSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout mx-4>
        <v-select mx-4 v-if="selectedLayer" :items="font.families" :value="primaryFontFamily" @change="setPrimaryFontFamily" label="Family"></v-select>
      </v-layout>

      <v-layout mx-4>
        <input id="primaryColorPicker" type="color" :value="primaryFont.color" @input="updateLayerPrimaryFontColor" hidden></input>
      </v-layout>

      <v-layout column mx-4 mb-4>
        <v-btn-toggle v-model="font.style" multiple>
          <v-btn :value="0" flat @click="togglePrimaryFontBold()">
            <v-icon>format_bold</v-icon>
          </v-btn>
          <v-btn :value="1" flat @click="togglePrimaryFontItalic()">
            <v-icon>format_italic</v-icon>
          </v-btn>
          <!-- <v-btn :value="2" flat @click="togglePrimaryFontUnderline()">
            <v-icon>format_underlined</v-icon>
          </v-btn> -->
          <v-btn :value="3" flat @click="triggerPrimaryColorPicker">
            <v-icon>format_color_fill</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle v-model="font.justify" mandatory>
          <v-btn :value="0" flat @click="setPrimaryFontAlign('left')">
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn :value="1" flat @click="setPrimaryFontAlign('center')">
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn :value="2" flat @click="setPrimaryFontAlign('right')">
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <!-- <v-btn :value="3" flat>
            <v-icon>format_align_justify</v-icon>
          </v-btn> -->
        </v-btn-toggle>
      </v-layout>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header">Secondary Font</div>
      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="parseInt(secondaryFont.size)" @input="updateLayerSecondaryFontSize" thumb-label :min="1" :max="256"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field v-if="selectedLayer" :value="parseInt(secondaryFont.size)" @input="updateLayerSecondaryFontSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout mx-4>
        <v-select mx-4 v-if="selectedLayer" :items="font.families" :value="secondaryFontFamily" @change="setSecondaryFontFamily" label="Family"></v-select>
      </v-layout>

      <v-layout mx-4>
        <input id="secondaryColorPicker" type="color" v-if="selectedLayer" :value="secondaryFont.color" @input="updateLayerSecondaryFontColor" hidden></input>
      </v-layout>

      <v-layout column mx-4 mb-4>
        <v-btn-toggle v-model="font.style" multiple>
          <v-btn :value="0" flat @click="toggleSecondaryFontBold()">
            <v-icon>format_bold</v-icon>
          </v-btn>
          <v-btn :value="1" flat @click="toggleSecondaryFontItalic()">
            <v-icon>format_italic</v-icon>
          </v-btn>
          <!-- <v-btn :value="2" flat @click="toggleSecondaryFontUnderline()">
            <v-icon>format_underlined</v-icon>
          </v-btn> -->
          <v-btn :value="3" flat @click="triggerSecondaryColorPicker">
            <v-icon>format_color_fill</v-icon>
          </v-btn>
        </v-btn-toggle>

        <v-btn-toggle v-model="font.justify" mandatory>
          <v-btn :value="0" flat @click="setSecondaryFontAlign('left')">
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn :value="1" flat @click="setSecondaryFontAlign('center')">
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn :value="2" flat @click="setSecondaryFontAlign('right')">
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <!-- <v-btn :value="3" flat>
            <v-icon>format_align_justify</v-icon>
          </v-btn> -->
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
    primaryFontFamily: '',
    secondaryFontFamily: '',
    font: {
      justify: null,
      size: '16',
      style: [],
      families: [
        { text: 'Arima Madurai', value: 'Arima+Madurai:400,700' },
        { text: 'Arvo', value: 'Arvo:400,400i,700,700i' },
        { text: 'Atma', value: 'Atma:400,700' },
        { text: 'Chewy', value: 'Chewy:400' },
        { text: 'Comfortaa', value: 'Comfortaa:400,700' },
        { text: 'Fahkwang', value: 'Fahkwang:400,400i,500,500i' },
        { text: 'Lato', value: 'Lato:400,400i,700,700i' },
        { text: 'Lobster', value: 'Lobster:400' },
        { text: 'Luckiest Guy', value: 'Luckiest+Guy:400' },
        { text: 'Merriweather', value: 'Merriweather:400,400i,700,700i' },
        { text: 'Montserrat', value: 'Montserrat:400,400i,700,700i' },
        { text: 'Open Sans', value: 'Open+Sans:400,400i,700,700i' },
        { text: 'Overlock', value: 'Overlock:400,400i,700,700i' },
        { text: 'Permanent Marker', value: 'Permanent+Marker:400' },
        { text: 'Roboto', value: 'Roboto:400,400i,700,700i' },
        { text: 'Roboto Condensed', value: 'Roboto+Condensed:400,400i,700,700i' },
        { text: 'Share', value: 'Share:400,400i,700,700i' },
        { text: 'Staatliches', value: 'Staatliches:400' },
      ],
    },
  }),

  computed: {
    ...mapState({
      selectedHeadline: state => state.data.selectedHeadline,
      selectedLayer: state => state.data.selectedLayer,
    }),
    primaryFont() {
      return this.selectedLayer.font.primary
    },
    secondaryFont() {
      return this.selectedLayer.font.secondary || this.selectedLayer.font.primary
    },
  },

  mounted() {
    this.primaryFontFamily = this.primaryFont.family
    this.secondaryFontFamily = this.primaryFont.family
    if(this.secondaryFontFamily) {
      this.secondaryFontFamily = this.secondaryFont.family
    }
  },

  methods: {
    ...mapMutations({
      updateLayerText: 'data/updateLayerText',
      updateLayerPrimaryFontColor: 'data/updateLayerPrimaryFontColor',
      updateLayerPrimaryFontFamily: 'data/updateLayerPrimaryFontFamily',
      updateLayerPrimaryFontSize: 'data/updateLayerPrimaryFontSize',
      setLayerPrimaryFontBold: 'data/setLayerPrimaryFontBold',
      setLayerPrimaryFontItalic: 'data/setLayerPrimaryFontItalic',
      setLayerPrimaryFontUnderline: 'data/setLayerPrimaryFontUnderline',
      setLayerPrimaryFontAlign: 'data/setLayerPrimaryFontAlign',
      updateLayerSecondaryFontColor: 'data/updateLayerSecondaryFontColor',
      updateLayerSecondaryFontFamily: 'data/updateLayerSecondaryFontFamily',
      updateLayerSecondaryFontSize: 'data/updateLayerSecondaryFontSize',
      setLayerSecondaryFontBold: 'data/setLayerSecondaryFontBold',
      setLayerSecondaryFontItalic: 'data/setLayerSecondaryFontItalic',
      setLayerSecondaryFontUnderline: 'data/setLayerSecondaryFontUnderline',
      setLayerSecondaryFontAlign: 'data/setLayerSecondaryFontAlign',
    }),

    setPrimaryFontFamily(value) {
      this.updateLayerPrimaryFontFamily(value)
      this.primaryFontFamily = value
    },
    setSecondaryFontFamily(value) {
      this.updateLayerSecondaryFontFamily(value)
      this.secondaryFontFamily = value
    },

    triggerPrimaryColorPicker() {
      this.font.style.splice(this.font.style.findIndex(value => value === 'primaryColor'), 1)
      document.getElementById('primaryColorPicker').click()
    },
    triggerSecondaryColorPicker() {
      this.font.style.splice(this.font.style.findIndex(value => value === 'secondaryColor'), 1)
      document.getElementById('secondaryColorPicker').click()
    },

    togglePrimaryFontBold() {
      let index = this.font.style.findIndex(value => value === '0')
      if (index < 0) {
        this.setLayerPrimaryFontBold(true)
        this.font.style.push('0')
      } else {
        this.setLayerPrimaryFontBold(false)
        this.font.style.splice(index, 1)
      }
    },
    togglePrimaryFontItalic() {
      let index = this.font.style.findIndex(value => value === '1')
      if (index < 0) {
        this.setLayerPrimaryFontItalic(true)
        this.font.style.push('1')
      } else {
        this.setLayerPrimaryFontItalic(false)
        this.font.style.splice(index, 1)
      }
    },
    togglePrimaryFontUnderline(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '2')
      if (index < 0) {
        this.setLayerPrimaryFontUnderline(true)
        this.font.style.push('2')
      } else {
        this.setLayerPrimaryFontUnderline(false)
        this.font.style.splice(index, 1)
      }
    },
    toggleSecondaryFontBold(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '0')
      if (index < 0) {
        this.setLayerSecondaryFontBold(true)
        this.font.style.push('0')
      } else {
        this.setLayerSecondaryFontBold(false)
        this.font.style.splice(index, 1)
      }
    },
    toggleSecondaryFontItalic(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '1')
      if (index < 0) {
        this.setLayerSecondaryFontItalic(true)
        this.font.style.push('1')
      } else {
        this.setLayerSecondaryFontItalic(false)
        this.font.style.splice(index, 1)
      }
    },
    toggleSecondaryFontUnderline(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '2')
      if (index < 0) {
        this.setLayerSecondaryFontUnderline(true)
        this.font.style.push('2')
      } else {
        this.setLayerSecondaryFontUnderline(false)
        this.font.style.splice(index, 1)
      }
    },
  },
}
</script>
