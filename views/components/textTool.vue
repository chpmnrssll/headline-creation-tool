<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <div slot="header">Text</div>
      <v-textarea v-if="selectedLayer" @input="setText" :value="selectedLayer.text" class="px-4" box></v-textarea>

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
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header">Primary Font</div>

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

        <!-- <v-btn-toggle v-model="font.justify" mandatory>
          <v-btn :value="0" flat @click="setPrimaryFontAlign('left')">
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn :value="1" flat @click="setPrimaryFontAlign('center')">
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn :value="2" flat @click="setPrimaryFontAlign('right')">
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <v-btn :value="3" flat>
            <v-icon>format_align_justify</v-icon>
          </v-btn>
        </v-btn-toggle> -->
      </v-layout>

      <v-layout mx-4>
        <v-select mx-4 v-if="selectedLayer" :items="font.families" :value="primaryFont.family" @change="setPrimaryFontFamily" label="Family">
          <template slot="item" slot-scope="{ item }">
            <v-img v-if="item.img" :src="item.img" height="16px" contain></v-img>
            <span v-else>{{ item.text }}</span>
          </template>
          <template slot="selection" slot-scope="{ item }">
            <v-img v-if="item.img" :src="item.img" height="16px" contain></v-img>
            <span v-else>{{ item.text }}</span>
          </template>
        </v-select>
      </v-layout>

      <v-layout row ml-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="primaryFont.size" @input="setPrimaryFontSize" thumb-label :min="1" :max="256" label="Size"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="primaryFont.size" @input="setPrimaryFontSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <!-- <v-layout row ml-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="primaryFont.lineHeight" @input="setPrimaryFontLineHeight" thumb-label :min="1" :max="256" label="LineHeight"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="primaryFont.lineHeight" @input="setPrimaryFontLineHeight" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout> -->

      <input id="primaryColorPicker" type="color" :value="primaryFont.color" @input="setPrimaryFontColor" hidden></input>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="primaryFont.shadow.blur" @input="setPrimaryFontShadowBlur" thumb-label :min="1" :max="16" label="Shadow Blur"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="primaryFont.shadow.blur" @input="setPrimaryFontShadowBlur" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="primaryFont.shadow.offset.x" @input="setPrimaryFontShadowOffsetX" thumb-label :min="1" :max="16" label="Shadow X"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="primaryFont.shadow.offset.x" @input="setPrimaryFontShadowOffsetX" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="primaryFont.shadow.offset.y" @input="setPrimaryFontShadowOffsetY" thumb-label :min="1" :max="16" label="Shadow Y"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="primaryFont.shadow.offset.y" @input="setPrimaryFontShadowOffsetY" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <label class="v-label theme--light">Shadow Color</label>
        <v-btn flat @click="triggerPrimaryShadowColorPicker">
          <v-icon>format_color_fill</v-icon>
        </v-btn>
      </v-layout>

      <input id="primaryShadowColorPicker" type="color" v-if="selectedLayer" :value="primaryFont.shadow.color" @input="setPrimaryFontShadowColor" hidden></input>
    </v-expansion-panel-content>

    <v-expansion-panel-content>
      <div slot="header">Secondary Font</div>

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

        <input id="secondaryColorPicker" type="color" v-if="selectedLayer" :value="secondaryFont.color" @input="setSecondaryFontColor" hidden></input>

        <!-- <v-btn-toggle v-model="font.justify" mandatory>
          <v-btn :value="0" flat @click="setSecondaryFontAlign('left')">
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn :value="1" flat @click="setSecondaryFontAlign('center')">
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn :value="2" flat @click="setSecondaryFontAlign('right')">
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <v-btn :value="3" flat>
            <v-icon>format_align_justify</v-icon>
          </v-btn>
        </v-btn-toggle> -->
      </v-layout>

      <v-layout mx-4>
        <v-select mx-4 v-if="selectedLayer" :items="font.families" :value="secondaryFont.family" @change="setSecondaryFontFamily" label="Family">
          <template slot="item" slot-scope="{ item }">
            <v-img v-if="item.img" :src="item.img" height="16px" contain></v-img>
            <span v-else>{{ item.text }}</span>
          </template>
          <template slot="selection" slot-scope="{ item }">
            <v-img v-if="item.img" :src="item.img" height="16px" contain></v-img>
            <span v-else>{{ item.text }}</span>
          </template>
        </v-select>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="secondaryFont.size" @input="setSecondaryFontSize" thumb-label :min="1" :max="256" label="Size"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="secondaryFont.size" @input="setSecondaryFontSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <!-- <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="secondaryFont.lineHeight" @input="setSecondaryFontLineHeight" thumb-label :min="1" :max="256" label="Line Height"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="secondaryFont.lineHeight" @input="setSecondaryFontLineHeight" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout> -->

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="secondaryFont.shadow.blur" @input="setSecondaryFontShadowBlur" thumb-label :min="1" :max="16" label="Shadow Blur"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="secondaryFont.shadow.blur" @input="setSecondaryFontShadowBlur" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="secondaryFont.shadow.offset.x" @input="setSecondaryFontShadowOffsetX" thumb-label :min="1" :max="16" label="Shadow X"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="secondaryFont.shadow.offset.x" @input="setSecondaryFontShadowOffsetX" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider v-if="selectedLayer" :value="secondaryFont.shadow.offset.y" @input="setSecondaryFontShadowOffsetY" thumb-label :min="1" :max="16" label="Shadow Y"></v-slider>
        </v-flex>
        <v-flex xs3 mx-4>
          <v-text-field v-if="selectedLayer" :value="secondaryFont.shadow.offset.y" @input="setSecondaryFontShadowOffsetY" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <label class="v-label theme--light">Shadow Color</label>
        <v-btn flat @click="triggerSecondaryShadowColorPicker">
          <v-icon>format_color_fill</v-icon>
        </v-btn>
      </v-layout>
      <input id="secondaryShadowColorPicker" type="color" v-if="selectedLayer" :value="secondaryFont.shadow.color" @input="setSecondaryFontShadowColor" hidden></input>

    </v-expansion-panel-content>

  </v-expansion-panel>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState, } from 'vuex'

import FontArimaMadurai from './fontPreviews/ArimaMadurai.png'
import FontArvo from './fontPreviews/Arvo.png'
import FontAtma from './fontPreviews/Atma.png'
import FontChewy from './fontPreviews/Chewy.png'
import FontComfortaa from './fontPreviews/Comfortaa.png'
import FontFahkwang from './fontPreviews/Fahkwang.png'
import FontLato from './fontPreviews/Lato.png'
import FontLobster from './fontPreviews/Lobster.png'
import FontLuckiestGuy from './fontPreviews/LuckiestGuy.png'
import FontMerriweather from './fontPreviews/Merriweather.png'
import FontMontserrat from './fontPreviews/Montserrat.png'
import FontOpenSans from './fontPreviews/OpenSans.png'
import FontOverlock from './fontPreviews/Overlock.png'
import FontPermanentMarker from './fontPreviews/PermanentMarker.png'
import FontRoboto from './fontPreviews/Roboto.png'
import FontRobotoCondensed from './fontPreviews/RobotoCondensed.png'
import FontShare from './fontPreviews/Share.png'
import FontStaatliches from './fontPreviews/Staatliches.png'

export default {
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
    font: {
      justify: null,
      size: '16',
      style: [],
      families: [
        { text: 'Arima Madurai', value: 'Arima+Madurai:400,700', img: FontArimaMadurai },
        { text: 'Arvo', value: 'Arvo:400,400i,700,700i', img: FontArvo },
        { text: 'Atma', value: 'Atma:400,700', img: FontAtma },
        { text: 'Chewy', value: 'Chewy:400', img: FontChewy },
        { text: 'Comfortaa', value: 'Comfortaa:400,700', img: FontComfortaa },
        { text: 'Fahkwang', value: 'Fahkwang:400,400i,500,500i', img: FontFahkwang },
        { text: 'Lato', value: 'Lato:400,400i,700,700i', img: FontLato },
        { text: 'Lobster', value: 'Lobster:400', img: FontLobster },
        { text: 'Luckiest Guy', value: 'Luckiest+Guy:400', img: FontLuckiestGuy },
        { text: 'Merriweather', value: 'Merriweather:400,400i,700,700i', img: FontMerriweather },
        { text: 'Montserrat', value: 'Montserrat:400,400i,700,700i', img: FontMontserrat },
        { text: 'Open Sans', value: 'Open+Sans:400,400i,700,700i', img: FontOpenSans },
        { text: 'Overlock', value: 'Overlock:400,400i,700,700i', img: FontOverlock },
        { text: 'Permanent Marker', value: 'Permanent+Marker:400', img: FontPermanentMarker },
        { text: 'Roboto', value: 'Roboto:400,400i,700,700i', img: FontRoboto },
        { text: 'Roboto Condensed', value: 'Roboto+Condensed:400,400i,700,700i', img: FontRobotoCondensed },
        { text: 'Share', value: 'Share:400,400i,700,700i', img: FontShare },
        { text: 'Staatliches', value: 'Staatliches:400', img: FontStaatliches },
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

  methods: {
    ...mapMutations({
      setText: 'data/setText',
      setTranslateX: 'data/setTranslateX',
      setTranslateY: 'data/setTranslateY',
      setRotation: 'data/setRotation',
      setPrimaryFontColor: 'data/setPrimaryFontColor',
      setPrimaryFontFamily: 'data/setPrimaryFontFamily',
      setPrimaryFontSize: 'data/setPrimaryFontSize',
      setPrimaryFontLineHeight: 'data/setPrimaryFontLineHeight',
      setPrimaryFontBold: 'data/setPrimaryFontBold',
      setPrimaryFontItalic: 'data/setPrimaryFontItalic',
      setPrimaryFontUnderline: 'data/setPrimaryFontUnderline',
      setPrimaryFontAlign: 'data/setPrimaryFontAlign',
      setPrimaryFontShadowBlur: 'data/setPrimaryFontShadowBlur',
      setPrimaryFontShadowColor: 'data/setPrimaryFontShadowColor',
      setPrimaryFontShadowOffsetX: 'data/setPrimaryFontShadowOffsetX',
      setPrimaryFontShadowOffsetY: 'data/setPrimaryFontShadowOffsetY',
      setSecondaryFontColor: 'data/setSecondaryFontColor',
      setSecondaryFontFamily: 'data/setSecondaryFontFamily',
      setSecondaryFontSize: 'data/setSecondaryFontSize',
      setSecondaryFontLineHeight: 'data/setSecondaryFontLineHeight',
      setSecondaryFontBold: 'data/setSecondaryFontBold',
      setSecondaryFontItalic: 'data/setSecondaryFontItalic',
      setSecondaryFontUnderline: 'data/setSecondaryFontUnderline',
      setSecondaryFontAlign: 'data/setSecondaryFontAlign',
      setSecondaryFontShadowBlur: 'data/setSecondaryFontShadowBlur',
      setSecondaryFontShadowColor: 'data/setSecondaryFontShadowColor',
      setSecondaryFontShadowOffsetX: 'data/setSecondaryFontShadowOffsetX',
      setSecondaryFontShadowOffsetY: 'data/setSecondaryFontShadowOffsetY',
    }),

    triggerPrimaryColorPicker() {
      this.font.style.splice(this.font.style.findIndex(value => value === 'primaryColor'), 1)
      document.getElementById('primaryColorPicker').click()
    },
    triggerSecondaryColorPicker() {
      this.font.style.splice(this.font.style.findIndex(value => value === 'secondaryColor'), 1)
      document.getElementById('secondaryColorPicker').click()
    },
    triggerPrimaryShadowColorPicker() {
      document.getElementById('primaryShadowColorPicker').click()
    },
    triggerSecondaryShadowColorPicker() {
      document.getElementById('secondaryShadowColorPicker').click()
    },

    togglePrimaryFontBold() {
      let index = this.font.style.findIndex(value => value === '0')
      if (index < 0) {
        this.setPrimaryFontBold(true)
        this.font.style.push('0')
      } else {
        this.setPrimaryFontBold(false)
        this.font.style.splice(index, 1)
      }
    },
    togglePrimaryFontItalic() {
      let index = this.font.style.findIndex(value => value === '1')
      if (index < 0) {
        this.setPrimaryFontItalic(true)
        this.font.style.push('1')
      } else {
        this.setPrimaryFontItalic(false)
        this.font.style.splice(index, 1)
      }
    },
    togglePrimaryFontUnderline(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '2')
      if (index < 0) {
        this.setPrimaryFontUnderline(true)
        this.font.style.push('2')
      } else {
        this.setPrimaryFontUnderline(false)
        this.font.style.splice(index, 1)
      }
    },
    toggleSecondaryFontBold(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '0')
      if (index < 0) {
        this.setSecondaryFontBold(true)
        this.font.style.push('0')
      } else {
        this.setSecondaryFontBold(false)
        this.font.style.splice(index, 1)
      }
    },
    toggleSecondaryFontItalic(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '1')
      if (index < 0) {
        this.setSecondaryFontItalic(true)
        this.font.style.push('1')
      } else {
        this.setSecondaryFontItalic(false)
        this.font.style.splice(index, 1)
      }
    },
    toggleSecondaryFontUnderline(newValue, oldValue) {
      let index = this.font.style.findIndex(value => value === '2')
      if (index < 0) {
        this.setSecondaryFontUnderline(true)
        this.font.style.push('2')
      } else {
        this.setSecondaryFontUnderline(false)
        this.font.style.splice(index, 1)
      }
    },
  },
}
</script>
