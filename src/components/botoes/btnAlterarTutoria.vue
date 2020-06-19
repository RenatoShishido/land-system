<template>
  <div>
    <v-btn fab small text @click="dialog = !dialog" class="green">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-row justify="center" v-if="dialog === true">
      <v-dialog v-model="dialog" max-width="700">
        <v-card>
          <v-form class="px-5 py-8" ref="form">
            <h1 class="d-flex justify-center align-center">Alterar tutoria</h1>
            <v-text-field
              v-model="campos.valor"
              :value="campos.valor"
              label="Valor"
              prepend-icon="mdi-cash-usd"
            ></v-text-field>
            <v-text-field
              v-model="campos.custo"
              :value="campos.custo"
              label="Custo"
              prepend-icon="mdi-cash-usd"
            ></v-text-field>
            <v-textarea
              v-model="campos.local"
              :value="campos.local"
              label="Local"
              prepend-icon="mdi-fireplace-off"
            ></v-textarea>
            <v-card-actions class="d-flex justify-center">
              <v-btn class="success" @click="dialog = false, atualizarDashoboard(fields)">Alterar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      date: {},
      campos: {}
    };
  },
  props: {
    fields: {}
  },

  methods: {
    atualizarDashoboard(fields) {
      console.log(fields._id);
      axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields._id}`, this.campos)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
  }
};
</script>>