<template>
<v-card>
  <v-toolbar class="primary primaryText--text">
    <v-toolbar-title>Save</v-toolbar-title>
  </v-toolbar>
  <v-container fluid>
    <v-card-text>

      <v-text-field label="Name" :value="filename" required></v-text-field>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="saveHeadline" class="green lighten-1 white--text" :disabled="checkName" :loading="!saveDone">OK</v-btn>
        <v-btn @click="close" class="red white--text">Cancel</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-container>
</v-card>
</template>

<script>
import { http } from '../config/http'
import { mapMutations, mapState, } from 'vuex'

export default {
  data: () => ({
    saveDone: true,
  }),

  computed: {
    ...mapState({
      selectedHeadline: state => state.data.selectedHeadline,
    }),
    filename() {
      return this.selectedHeadline.name
    },
    checkName() {
      return this.filename && this.filename === '' ? true : false
    },
  },

  // mounted() {
  //   this.filename = this.selectedHeadline.name
  // },

  methods: {
    ...mapMutations({
      setSelectedHeadlineName: 'data/setSelectedHeadlineName'
    }),

    saveHeadline(e) {
      this.saveDone = false
      // this.setSelectedHeadlineName(this.filename)
      if (!this.selectedHeadline._id) {
        http.post("/headlines", this.selectedHeadline)
          .then(response => {
            this.alert(true, 'Save', 'Headline')
            this.close()
          }).catch(e => {
            this.alert(false, 'Save', 'Headline')
            this.close()
          })
      } else {
        http.put("/headlines/" + this.selectedHeadline._id, this.selectedHeadline)
          .then(response => {
            this.alert(true, 'Save', 'Headline')
            this.close()
          }).catch(e => {
            this.alert(false, 'Save', 'Headline')
            this.close()
          })
      }
    },

    close() {
      this.$emit('closeSave')
      this.saveDone = true
    },

    // checkName() {
    //   return this.selectedHeadline && this.selectedHeadline.name === '' ? true : false
    // },

    alert(success, callName, resource) {
      this.$emit('alert', success, callName, resource)
    }
  }
}
</script>
