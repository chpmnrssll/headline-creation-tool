<template>
  <v-container ma-2>
    <v-layout row wrap slot="header">
      <v-flex xs-6 class="text-xs-left headline">
        {{ headline.name }}
      </v-flex>
      <v-flex xs-4 class="text-xs-right">
        <v-btn icon small ma-0 @click="$emit('setUpDelete', headline)">
          <v-icon small color="error" xs-4 class="text-xs-right">delete_forever</v-icon>
        </v-btn>
        <v-btn icon small ma-0 @click="$emit('setUpEdit', headline)">
          <v-icon small color="blue" xs-4 class="text-xs-right">edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <hr>
    <v-layout column wrap>
      {{ headline.layers.length }} Layers
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    headline: {
      type: Object
    }
  }
}
</script>
