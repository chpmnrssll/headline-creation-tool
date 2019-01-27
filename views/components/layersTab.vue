<template>
<v-container :style="style">
  <v-card class="mb-4">
    <v-data-table :items="layers" class="elevation-1" hide-actions hide-headers>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>
          <v-btn class="ma-0" icon small>
            <v-icon small>arrow_upward</v-icon>
          </v-btn>
          <v-btn class="ma-0" icon small ma-0>
            <v-icon small>arrow_downward</v-icon>
          </v-btn>
        </td>
        <td>
          <v-btn class="ma-0" icon small ma-0>
            <v-icon small color="error">delete_forever</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <v-btn color="primary" icon small absolute bottom right>
      <v-icon small>add</v-icon>
    </v-btn>
  </v-card>

  <v-card>
    <textLayerTool></textLayerTool>
  </v-card>

</v-container>
</template>

<script>
import textLayerTool from '../components/textLayerTool'

export default {
  data: () => ({
    style: {
      // height: '75vh',
      // backgroundColor: '#444'
    },
    layers: [{
        name: 'Layer 1',
        index: 0
      },
      {
        name: 'Layer 2',
        index: 1
      },
    ],
  }),

  components: {
    textLayerTool: textLayerTool,
  },
}
</script>
