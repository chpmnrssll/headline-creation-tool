<template>
<v-container class="pa-0">
  <v-card class="pa-4">
    <v-layout align-center justify-center column>
      <label class="v-label theme--light">
        Color
        <input type="color" :value="settings.background.color" @input="setBackgroundColor"></input>
      </label>
      <v-slider label="Block Size" :value="settings.background.pattern.size" @input="setBackgroundSize" thumb-label :min="1" :max="100"></v-slider>
      <v-text-field label="Width" :value="settings.background.width" @input="setBackgroundWidth"></v-text-field>
      <v-text-field label="Height" :value="settings.background.height" @input="setBackgroundHeight"></v-text-field>
    </v-layout>
  </v-card>
</v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'

export default {
  computed: {
    ...mapState({
      settings: state => state.settings
    }),
  },

  methods: {
    setBackgroundColor(color) {
      this.$store.commit('settings/setBackgroundColor', color.target.value)
    },
    setBackgroundWidth(width) {
      this.$store.commit('settings/setBackgroundWidth', width)
    },
    setBackgroundHeight(height) {
      this.$store.commit('settings/setBackgroundHeight', height)
    },
    setBackgroundSize(size) {
      this.$store.commit('settings/setBackgroundSize', size)
    }
  },
}
</script>
