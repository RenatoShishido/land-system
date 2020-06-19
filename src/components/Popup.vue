<template >
  <v-dialog max-width="700px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="dialog = !dialog" class="green white--text">
        <v-icon left>mdi-plus-circle</v-icon>Cadastrar Terreno
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <h2>{{msg}}</h2>
      </v-card-title>
      <v-card-text>
        <v-form max-width="800px" class="px-3" ref="form">
          <v-text-field v-model="fields.valor" label="Valor" prepend-icon="mdi-cash-usd"></v-text-field>
          <v-text-field v-model="fields.custo" label="Custos" prepend-icon="mdi-cash-usd"></v-text-field>
          <v-text-field
            v-model="fields.local"
            label="Endereco do terreno"
            prepend-icon="mdi-fireplace-off"
            @keypress.enter="submit()"
          ></v-text-field>
          <v-flex xs12 sm12 md12 lg12>
            <v-btn class="success" text @click="submit()" :loading="loading">Salvar</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    msg: String,
    navDrag: Boolean
  },
  data() {
    return {
      date: {},
      showDateTime: false,
      fields: {},
      menu: false,
      loading: false,
      dialog: false
    };
  },

  methods: {
    clearMemory() {
      this.fields = {};
    },
    submit() {
      if (
        this.fields.valor === undefined ||
        this.fields.custo === undefined ||
        this.fields.local === undefined
      ) {
        this.dialog = false;
        confirm("Terreno invalido");
      } else {
        axios
          .post(`${process.env.VUE_APP_API_URL}`, this.fields)
          .then(response => console.log(response))
          .catch(error => console.error(error));

        this.clearMemory();
        this.dialog = false;
      }
    }
  }
};
</script>


