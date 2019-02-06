<template>
<v-container :style="style">
  <v-text-field v-if="selectedLayer" :value="selectedLayer.textures" @input="updateLayerTextures" label="URL"></v-text-field>
</v-container>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

export default {
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
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
      updateLayerTextures: 'data/updateSelectedLayerTextures'
    })
  }
}
</script>
