<template>
<v-container class="pa-0">
  <v-card class="pa-4">
    <v-layout align-center justify-center column>
      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider :value="settings.background.width" @input="setBackgroundWidth" thumb-label min="1" max="2048" label="Width"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field :value="settings.background.width" @input="setBackgroundWidth" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider :value="settings.background.height" @input="setBackgroundHeight" thumb-label min="1" max="2048" label="Height"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field :value="settings.background.height" @input="setBackgroundHeight" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx-4>
        <v-flex xs9>
          <v-slider :value="settings.background.blockSize" @input="setBackgroundSize" thumb-label :min="1" :max="256" label="Block Size"></v-slider>
        </v-flex>
        <v-flex xs2 mx-4>
          <v-text-field :value="settings.background.blockSize" @input="setBackgroundSize" type="number" label="px"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mx4>
        <v-flex class="text-xs-right" xs5 mr-2>
          <label class="v-label theme--light">Block Colors</label>
        </v-flex>
        <v-flex xs5 mx-5>
          <input type="color" :value="settings.background.color1" @input="setBackgroundColor1"></input>
          <input type="color" :value="settings.background.color2" @input="setBackgroundColor2"></input>
        </v-flex>
      </v-layout>


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
    setBackgroundColor1(colorEvent) {
      this.$store.commit('settings/setBackgroundColor1', colorEvent.target.value)
    },
    setBackgroundColor2(colorEvent) {
      this.$store.commit('settings/setBackgroundColor2', colorEvent.target.value)
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
