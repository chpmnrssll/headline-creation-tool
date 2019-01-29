<template>
<v-container class="pa-0" :style="style">
  <v-card class="pa-4">
    <v-card class="mb-4">
      <v-data-table v-model="selected" :items="layers" item-key="zIndex" :pagination.sync="pagination" class="elevation-1" hide-actions hide-headers select-all>
        <template slot="items" slot-scope="props">
          <tr :active="props.selected" @click="props.selected = !props.selected">
            <td class="px-3">
              <v-text-field v-model="props.item.name"></v-text-field>
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
      <v-btn color="primary" icon small absolute bottom right>
        <v-icon small>add</v-icon>
      </v-btn>
    </v-card>

    <v-card v-if="toolType == 'text'">
      <textLayerTool :layer="selected[0]" @update:text="$emit('update:text', $event)"></textLayerTool>
    </v-card>
    <v-card v-else="toolType == 'image'">
      <imageLayerTool></imageLayerTool>
    </v-card>
  </v-card>

</v-container>
</template>

<script>
import textLayerTool from '../components/textLayerTool'
import imageLayerTool from '../components/imageLayerTool'

export default {
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
    selected: [],
    toolType: null,
    pagination: {
      descending: true,
      sortBy: 'zIndex',
    }
  }),

  props: {
    layers: {
      type: Array,
    },
  },

  watch: {
    selected(n, o) {
      if (n.length > 1) {
        this.selected.splice(0, 1)
      } else {
        this.toolType = this.selected[0].type
      }
    },
    layers: {
      deep: true,
      handler: (val, old) => {
        // console.log(`layersTab: ${val}`)
      },
    },
  },

  mounted() {
    this.selected = this.layers.filter(layer => layer.zIndex == this.layers.length - 1);
  },

  methods: {
    moveLayer(oldZ, direction) {
      const newZ = oldZ + direction
      const oldIndex = this.layers.findIndex(layer => {
        return layer.zIndex == oldZ
      })

      if (newZ >= 0 && newZ < this.layers.length) {
        const newIndex = this.layers.findIndex(layer => layer.zIndex == newZ)

        this.$emit('update:layer', {
          index: newIndex,
          z: oldZ
        })

        this.$emit('update:layer', {
          index: oldIndex,
          z: newZ
        })
      }
    }
  },

  components: {
    textLayerTool: textLayerTool,
    imageLayerTool: imageLayerTool,
  },
}
</script>
