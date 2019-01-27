<template>
<v-container :style="style">
  <v-layout column>
    <v-select :items="font.families" box label="Font"></v-select>
    <v-slider v-model="font.size" thumb-label thumb-size="12" :min="1" :max="100" label="Size"></v-slider>
  </v-layout>

  <v-layout row>
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
      families: [{
          text: 'Arial'
        },
        {
          text: 'Calibri'
        },
        {
          text: 'Courier'
        },
        {
          text: 'Verdana'
        }
      ],
    },
  }),
}
</script>
