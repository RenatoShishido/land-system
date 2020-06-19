<template>
  <div>
    <v-btn fab small text @click="dialog = !dialog" class="yellow">
      <v-icon>mdi-cash-usd</v-icon>
    </v-btn>

    <v-row justify="center" v-if="dialog === true">
      <v-dialog v-model="dialog" max-width="700">
        <v-card>
          <v-form class="px-5 py-8" ref="form">
            <h1 class="d-flex justify-center align-center">Venda</h1>
            <v-text-field
              v-model="campos.nome"
              :value="campos.nome"
              label="Nome Cliente"
              prepend-icon="mdi-account-box"
            ></v-text-field>
            <v-text-field
              v-model="campos.telefone"
              :value="campos.telefone"
              label="Telefone"
              prepend-icon="mdi-cellphone-android"
            ></v-text-field>
            <v-text-field
              v-model="campos.datapagamento"
              :value="campos.datapagamento"
              label="Data de pagamento"
              prepend-icon="mdi-fireplace-off"
            ></v-text-field>
            <v-text-field
              v-model="campos.parcela"
              :value="campos.parcela"
              label="Parcela"
              prepend-icon="mdi-cash-usd"
            ></v-text-field>
            <v-card-actions class="d-flex justify-center">
              <v-btn class="yellow" @click="dialog = false, cadastrarVendido(fields)">Vender</v-btn>
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
    cadastrarVendido(fields) {
      // console.log(fields)
      // console.log(this.campos)
      const response = {
        valor: fields.valor,
        custo: fields.custo,
        local: fields.local,
        status: "Vendido",
        cliente: {
          nome: this.campos.nome,
          telefone: this.campos.telefone,
          datapagamento: this.campos.datapagamento,
          parcela: this.campos.parcela,
          pagas: 0
        }
      };

      console.log(response);

      axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields._id}`, response)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
  }
};
</script>>