<template>
<v-expansion-panel-content>
  <div slot="header">{{font.desc}} Font</div>

  <v-layout mx-4>
    <v-select mx-4 v-if="selectedLayer" :items="families" :value="font.family" @change="setFontFamily" label="Family">
      <template slot="item" slot-scope="{ item }">
        <v-img v-if="item.previewImage" :src="item.previewImage" height="16px" contain></v-img>
        <span v-else>{{ item.name }}</span>
      </template>
      <template slot="selection" slot-scope="{ item }">
        <v-img v-if="item.previewImage" :src="item.previewImage" height="16px" contain></v-img>
        <span v-else>{{ item.name }}</span>
      </template>
    </v-select>
  </v-layout>

  <v-layout column mx-4 mb-4>
    <v-btn-toggle v-model="styleState" multiple>
      <v-btn value="Bold" flat @click="toggleFont('Bold')">
        <v-tooltip top>
          <v-icon slot="activator">format_bold</v-icon>
          <span>Toggle Bold</span>
        </v-tooltip>
      </v-btn>

      <v-btn value="Italic" flat @click="toggleFont('Italic')">
        <v-tooltip top>
          <v-icon slot="activator">format_italic</v-icon>
          <span>Toggle Italic</span>
        </v-tooltip>
      </v-btn>

      <v-btn value="Underline" flat @click="toggleFont('Underline')">
        <v-tooltip top>
          <v-icon slot="activator">format_underlined</v-icon>
          <span>Toggle Underline</span>
        </v-tooltip>
      </v-btn>

      <v-btn value="Color" flat @click="triggerFontColorPicker()">
        <v-tooltip top>
          <v-icon slot="activator">format_color_fill</v-icon>
          <span>Font Color</span>
        </v-tooltip>
      </v-btn>
    </v-btn-toggle>

    <input id="fontColorPicker" type="color" :value="font.color" @input="setFontColor" hidden></input>

    <v-btn-toggle v-model="justifyState" mandatory>
      <v-btn value="left" flat @click="setFontAlign('left')">
        <v-tooltip bottom>
          <v-icon slot="activator">format_align_left</v-icon>
          <span>Align Left</span>
        </v-tooltip>
      </v-btn>
      <v-btn value="center" flat @click="setFontAlign('center')">
        <v-tooltip bottom>
          <v-icon slot="activator">format_align_center</v-icon>
          <span>Align Center</span>
        </v-tooltip>
      </v-btn>
      <v-btn value="right" flat @click="setFontAlign('right')">
        <v-tooltip bottom>
          <v-icon slot="activator">format_align_right</v-icon>
          <span>Align Right</span>
        </v-tooltip>
      </v-btn>
      <v-btn value="justify" flat @click="setFontAlign('justify')">
        <v-tooltip bottom>
          <v-icon slot="activator">format_align_justify</v-icon>
          <span>Justify Text</span>
        </v-tooltip>
      </v-btn>
    </v-btn-toggle>
  </v-layout>

  <v-layout row ml-4>
    <v-flex xs9>
      <v-slider class="my-0" v-if="selectedLayer" :value="font.size" @input="setFontSize" thumb-label :min="1" :max="256" label="Size"></v-slider>
    </v-flex>
    <v-flex xs3 mx-4>
      <v-text-field class="my-0 pt-0" v-if="selectedLayer" :value="font.size" @input="setFontSize" type="number"></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row ml-4>
    <v-flex xs9>
      <v-slider class="my-0" v-if="selectedLayer" :value="font.lineHeight" @input="setFontLineHeight" thumb-label :min="1" :max="256" label="Line Spacing"></v-slider>
    </v-flex>
    <v-flex xs3 mx-4>
      <v-text-field class="my-0 pt-0" v-if="selectedLayer" :value="font.lineHeight" @input="setFontLineHeight" type="number"></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row mx-4>
    <v-flex xs9>
      <v-slider class="my-0" v-if="selectedLayer" :value="font.shadow.blur" @input="setFontShadowBlur" thumb-label :min="1" :max="16" label="Shadow Blur"></v-slider>
    </v-flex>
    <v-flex xs3 mx-4>
      <v-text-field class="my-0 pt-0" v-if="selectedLayer" :value="font.shadow.blur" @input="setFontShadowBlur" type="number"></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row mx-4>
    <v-flex xs9>
      <v-slider class="my-0" v-if="selectedLayer" :value="font.shadow.offset.x" @input="setFontShadowOffsetX" thumb-label :min="1" :max="16" label="Shadow X"></v-slider>
    </v-flex>
    <v-flex xs3 mx-4>
      <v-text-field class="my-0 pt-0" v-if="selectedLayer" :value="font.shadow.offset.x" @input="setFontShadowOffsetX" type="number"></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row mx-4>
    <v-flex xs9>
      <v-slider class="my-0" v-if="selectedLayer" :value="font.shadow.offset.y" @input="setFontShadowOffsetY" thumb-label :min="1" :max="16" label="Shadow Y"></v-slider>
    </v-flex>
    <v-flex xs3 mx-4>
      <v-text-field class="my-0 pt-0" v-if="selectedLayer" :value="font.shadow.offset.y" @input="setFontShadowOffsetY" type="number"></v-text-field>
    </v-flex>
  </v-layout>

  <v-layout row mx-4>
    <v-btn flat @click="triggerShadowColorPicker">
      Shadow Color&nbsp;<v-icon small>format_color_fill</v-icon>
    </v-btn>
  </v-layout>

  <input id="shadowColorPicker" type="color" v-if="selectedLayer" :value="font.shadow.color" @input="setFontShadowColor" hidden></input>
</v-expansion-panel-content>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { families } from './fonts/index.js'

export default {
  data: () => ({
    styleState: [],
    justifyState: '',
    families: families
  }),

  props: {
    font: Object
  },

  computed: {
    ...mapState({
      selectedLayer: state => state.data.selectedLayer,
    }),
  },

  methods: {
    ...mapActions({
      setFont: 'data/setFont'
    }),

    toggleFont(style) {
      let index = this.styleState.findIndex(value => value === style)
      if (index < 0) {
        // add to styleState array for v-btn-toggle
        this.styleState.push(style)
        this[`setFont${style}`](true)
      } else {
        // remove from styleState array
        this.styleState.splice(index, 1)
        this[`setFont${style}`](false)
      }
    },

    triggerFontColorPicker() {
      // add to styleState array for v-btn-toggle
      this.styleState.splice(this.styleState.findIndex(value => value === 'Color'), 1)
      // trigger hidden default HTML5 color picker
      document.getElementById('fontColorPicker').click()
    },
    triggerShadowColorPicker() {
      // trigger hidden default HTML5 color picker
      document.getElementById('shadowColorPicker').click()
    },

    setFontFamily(value) {
      this.setFont({desc: this.font.desc, key: 'Family', value: value})
    },
    setFontSize(value) {
      this.setFont({desc: this.font.desc, key: 'Size', value: value})
    },
    setFontLineHeight(value) {
      this.setFont({desc: this.font.desc, key: 'LineHeight', value: value})
    },
    setFontBold(value) {
      this.setFont({desc: this.font.desc, key: 'Bold', value: value})
    },
    setFontItalic(value) {
      this.setFont({desc: this.font.desc, key: 'Italic', value: value})
    },
    setFontUnderline(value) {
      this.setFont({desc: this.font.desc, key: 'Underline', value: value})
    },
    // click event handler from hidden color input
    setFontColor(event) {
      this.setFont({desc: this.font.desc, key: 'Color', value: event.target.value})
    },
    setFontShadowBlur(value) {
      this.setFont({desc: this.font.desc, key: 'ShadowBlur', value: value})
    },
    setFontShadowOffsetX(value) {
      this.setFont({desc: this.font.desc, key: 'ShadowOffsetX', value: value})
    },
    setFontShadowOffsetY(value) {
      this.setFont({desc: this.font.desc, key: 'ShadowOffsetY', value: value})
    },
    // click event handler from hidden color input
    setFontShadowColor(event) {
      this.setFont({desc: this.font.desc, key: 'ShadowColor', value: event.target.value})
    },
  }
}
</script>
