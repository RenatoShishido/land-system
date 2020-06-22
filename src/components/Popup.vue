<template >
  <v-dialog max-width="700px" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" @click="dialog = !dialog" class="green white--text">
        <v-icon left>mdi-plus-circle</v-icon>Cadastrar Terreno
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <h2 class="d-flex justify-center my-4">Cadastro de Terreno</h2>
        </v-flex>
      </v-card-title>
      <v-card-text>
        <v-form max-width="800px" class="px-3" ref="form">
          <v-text-field 
          v-model="fields.valor" 
          label="Valor" 
          v-money="money"
          prepend-icon="mdi-cash-usd"
          ></v-text-field>
          <v-text-field
          v-model="fields.custo"
           label="Custos" 
           prepend-icon="mdi-cash-usd"
           ></v-text-field>
          <v-text-field
            v-model="fields.local"
            label="Endereco do terreno"
            prepend-icon="mdi-fireplace-off"
            @keypress.enter="submit()"
          ></v-text-field>
          <v-flex xs12 sm12 md12 lg12 class="my-4">
            <v-btn class="success" text @click="submit()" :loading="loading">Salvar</v-btn>
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {VMoney} from 'v-money'
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
      dialog: false,
       money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
      }
    };
  },
  directives: {money: VMoney},
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
        this.$emit('popup', this.fields)
        this.clearMemory();
        this.dialog = false;
      }
    }
  }
};
</script>


