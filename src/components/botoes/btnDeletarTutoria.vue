<template>
  <div>
    <v-btn fab small text @click="dialog = !dialog" class="error">
      <v-icon color="black">mdi-delete</v-icon>
    </v-btn>
    <v-row justify="center" v-if="dialog === true">
      <v-dialog v-model="dialog"  max-width="600">
        <v-card>
          <v-card-title class="headline">Voce tem certeza que deseja deletar isso?</v-card-title>
          <v-card-text>
            Ao deletar isso voce nao tera como puxar de volta este item.
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="red darken-1"  @click="dialog = false, removerDashboard(fields)">Aceito</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: {
    fields: {}
  },
  methods: {
    removerDashboard(fields) { 
      this.$emit('deletarcampo', fields._id)
      
    }
  }
};
</script>