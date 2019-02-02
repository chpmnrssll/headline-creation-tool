<template>
<v-container :style="style">
  <v-text-field v-if="selectedLayer" :value="selectedLayer.url" @input="updateLayerURL" label="URL"></v-text-field>
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
  }),

  computed: {
    selectedLayer() {
      if (this.$store.state.layers.selectedLayer) {
        return this.$store.state.layers.all.find(layer => layer.selected)
      }
      return {}
    },
  },

  methods: {
    updateLayerURL(url) {
      this.$store.commit('layers/updateLayerURL', url)
    },
  }
}
</script>
