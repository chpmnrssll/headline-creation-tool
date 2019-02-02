<template>
<v-container class="pa-0" :style="style">
  <v-card class="pa-4">
    <v-card class="mb-1">
      <v-data-table v-model="selected" :items="layers" item-key="zIndex" :pagination.sync="pagination" class="elevation-1" hide-actions hide-headers select-all>
        <template slot="items" slot-scope="props">
          <tr :active="props.item.selected" @click="setSelectedLayer(props.item.zIndex)">
            <td class="px-3">
              <v-text-field v-model="props.item.name" class="my-0 py-0" :style="{ maxHeight: '32px' }"></v-text-field>
            </td>
            <td class="px-0">
              <v-btn class="ma-0" icon small @click="moveLayer(props.item.zIndex, 1)">
                <v-icon small>arrow_upward</v-icon>
              </v-btn>
              <v-btn class="ma-0" icon small ma-0 @click="moveLayer(props.item.zIndex, -1)">
                <v-icon small>arrow_downward</v-icon>
              </v-btn>
              <v-btn class="ma-0" icon small ma-0>
                <v-icon small color="error">delete_forever</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-btn color="primary" icon small absolute top left>
        <v-icon small>playlist_add</v-icon>
      </v-btn>
      <v-btn color="primary" @click="addDialog = true" icon small absolute top right>
        <v-icon small>save</v-icon>
      </v-btn>
    </v-card>
    <v-divider></v-divider>
    <v-card v-if="selectedLayer.layerType === 'text'">
      <textTool></textTool>
    </v-card>
    <v-card v-else="selectedLayer.layerType === 'image'">
      <imageTool></imageTool>
    </v-card>
  </v-card>

  <!-- Add Dialog Button -->
  <v-dialog v-model="addDialog" lazy absolute max-width="50%">
    <v-btn class="primaryText--text" icon slot="activator">
      <v-icon>control_point</v-icon>
    </v-btn>

    <!-- Add Dialog -->
    <headlineSaveDialog @closeAdd="addDialog = false" @alert="alert">
    </headlineSaveDialog>
  </v-dialog>

</v-container>
</template>

<script>
import {
  http
} from "../config/http.js"
import {
  mapActions,
  mapGetters,
  mapState,
} from 'vuex'
import headlineSaveDialog from '../components/headlineSaveDialog.vue'
import textTool from '../components/textTool'
import imageTool from '../components/imageTool'

export default {
  data: () => ({
    addDialog: false,
    selected: [],
    pagination: {
      descending: true,
      sortBy: 'zIndex',
    },
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
  }),

  computed: {
    ...mapState({
      layers: state => Array.from(state.layers.all)
    }),
    selectedLayer() {
      if (this.layers.selectedLayer) {
        this.selected = [ this.layers.selectedLayer.zIndex ]
        return this.layers.selectedLayer
      }
      return {}
    },
  },

  mounted() {
    // this.setSelectedLayer(this.layers.length - 1)
  },

  methods: {
    saveHeadline() {
      window.alert('saveHeadline')
    },

    // Will emit an alert, followed by a boolean for success, the type of call
    // made, and the name of the resource we are working on
    alert(success, callName, resource) {
      console.log('Page Alerting')
      this.$emit('alert', success, callName, resource)
    },

    setSelectedLayer(zIndex) {
      this.selected = [ zIndex ]
      this.$store.commit('layers/setSelectedLayer', zIndex)
    },

    moveLayer(zIndex, direction) {
      this.$store.commit('layers/moveLayer', {
        zIndex: zIndex,
        direction: direction
      })
    }
  },

  components: {
    textTool: textTool,
    imageTool: imageTool,
    headlineSaveDialog: headlineSaveDialog
  },
}
</script>
