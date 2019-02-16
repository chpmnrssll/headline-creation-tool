<template>
<v-container class="pa-0" :style="{ height: '75vh', overflowY: 'auto'}">
  <v-card class="pa-4">
    <v-card class="mb-4">
      <v-tooltip left>
        <v-btn slot="activator" color="primary" @click="addLayerDialog=true" icon small absolute top left>
          <v-icon small>playlist_add</v-icon>
        </v-btn>
        <span>Add New Layer</span>
      </v-tooltip>

      <v-data-table v-model="selected" :items="layers" item-key="zIndex" :pagination.sync="pagination" class="elevation-1" hide-actions hide-headers select-all>
        <template slot="items" slot-scope="props">
          <tr :active="props.item.selected" @click="setSelectedLayer(props.item.zIndex)">
            <td class="px-3">
              <v-tooltip left>
                <v-text-field slot="activator" :value="props.item.name" @input="setSelectedLayerName" class="my-0 py-0" :style="{ maxHeight: '32px' }"></v-text-field>
                <span>Layer Name</span>
              </v-tooltip>
            </td>
            <td class="px-0">
              <v-tooltip top>
                <v-btn slot="activator" class="ma-0" icon small @click="moveLayer({ zIndex: props.item.zIndex, direction: 1 })">
                  <v-icon small>arrow_upward</v-icon>
                </v-btn>
                <span>Move Up</span>
              </v-tooltip>
              <v-tooltip bottom>
                <v-btn slot="activator" class="ma-0" icon small ma-0 @click="moveLayer({ zIndex: props.item.zIndex, direction: -1 })">
                  <v-icon small>arrow_downward</v-icon>
                </v-btn>
                <span>Move Down</span>
              </v-tooltip>
              <v-tooltip right>
                <v-btn slot="activator" class="ma-0" icon small ma-0 @click="removeThisLayer(props.item.zIndex)">
                  <v-icon small color="error">delete_forever</v-icon>
                </v-btn>
                <span>Delete Layer</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-card v-if="selectedLayer">
      <toolText v-if="selectedLayer.layerType === 'text'"></toolText>
      <toolImage v-if="selectedLayer.layerType === 'image'"></toolImage>
    </v-card>
  </v-card>

  <!-- Add Dialog -->
  <v-dialog v-model="addLayerDialog" lazy absolute max-width="50%">
    <dialogAddLayer @closeAdd="addLayerDialog=false" @alert="alert">
    </dialogAddLayer>
  </v-dialog>

</v-container>
</template>

<script>
import { http } from "../config/http.js"
import { mapMutations, mapState } from 'vuex'
import dialogAddLayer from '../components/dialogAddLayer.vue'
import toolText from '../components/toolText'
import toolImage from '../components/toolImage'

export default {
  data: () => ({
    addLayerDialog: false,
    pagination: {
      descending: true,
      sortBy: 'zIndex',
    },
    layers: [],
  }),

  computed: {
    ...mapState({
      selectedHeadline: state => state.data.selectedHeadline,
      selectedLayer: state => state.data.selectedLayer,
      // refreshLayers: state => state.data.refreshLayers
    }),
    selected() {
      if (this.selectedLayer) {
        return [ this.selectedLayer.zIndex ]
      } else {
        return []
      }
    },
  },

  watch: {
    selectedHeadline(newValue, oldValue) {
      if (newValue) {
        this.layers = newValue.layers
      }
    },
  },

  mounted() {
    if (this.selectedHeadline) {
      this.layers = this.selectedHeadline.layers
    }
  },
  methods: {
    ...mapMutations({
      setSelectedLayerName: 'data/setSelectedLayerName',
      setSelectedLayer: 'data/setSelectedLayer',
      setRefreshLayers: 'data/setRefreshLayers',
      moveLayer: 'data/moveLayer',
      removeLayer: 'data/removeLayer'
    }),

    removeThisLayer(zIndex) {
      this.setSelectedLayer(0)
      this.removeLayer(zIndex)
      this.layers = this.selectedHeadline.layers
    },

    // Will emit an alert, followed by a boolean for success, the type of call
    // made, and the name of the resource we are working on
    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
    },
  },

  components: {
    toolText: toolText,
    toolImage: toolImage,
    dialogAddLayer: dialogAddLayer
  },
}
</script>
