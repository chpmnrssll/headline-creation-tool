<template>
<v-container class="pa-0" :style="style">
  <v-card class="pa-4">
    <v-card class="mb-4">
      <v-data-table :items="layers" :pagination="pagination" class="elevation-1" hide-actions hide-headers select-all>
        <template slot="items" slot-scope="props">
          <div @click="loadTool(props.item.type)">
            <td class="px-1">
              <v-text-field v-model="props.item.name"></v-text-field>
            </td>
            <td class="px-0">
              <v-btn class="ma-0" icon small @click="move(props.index, props.index - 1)">
                <v-icon small>arrow_upward</v-icon>
              </v-btn>
              <v-btn class="ma-0" icon small ma-0 @click="move(props.index, props.index + 1)">
                <v-icon small>arrow_downward</v-icon>
              </v-btn>
              <v-btn class="ma-0" icon small ma-0>
                <v-icon small color="error">delete_forever</v-icon>
              </v-btn>
            </td>
          </div>
        </template>
      </v-data-table>
      <v-btn color="primary" icon small absolute bottom right>
        <v-icon small>add</v-icon>
      </v-btn>
    </v-card>

    <v-card v-if="toolType == 'text'">
      <textLayerTool></textLayerTool>
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
    selected: [],
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
    toolType: null,
  }),

  props: {
    layers: {
      type: Array,
    },
    pagination: {
      type: Object,
    }
  },

  methods: {
    loadTool(toolType) {
      this.toolType = toolType
    },
    move(oldIndex, newIndex) {
      let arr = this.layers
      return arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
    },
  },

  components: {
    textLayerTool: textLayerTool,
    imageLayerTool: imageLayerTool,
  },
}
</script>
