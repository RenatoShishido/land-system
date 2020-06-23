<template>
  <div>
    <v-btn fab small text @click="dialog = !dialog" class="green">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-row justify="center" v-if="dialog === true">
      <v-dialog v-model="dialog" max-width="700">
        <v-card>
          <v-flex xs12 sm4 md12 lg12 xl12 class="d-flex justify-end">
              <v-btn fab small @click="disabled = !disabled" color="green">
            <v-icon v-if="disabled">mdi-cash-usd</v-icon>
            <v-icon v-else>mdi-account-box</v-icon>
          </v-btn>
          </v-flex>
          <v-form class="px-5 py-8" ref="form">
            <h1 class="d-flex justify-center align-center">Alterar Venda</h1>
            <v-text-field
              v-model="campos.nome"
              :value="campos.nome"
              label="Nome"
              prepend-icon="mdi-cash-usd"
              :disabled="!disabled"
            ></v-text-field>
            <v-text-field
              v-model="campos.telefone"
              :value="campos.telefone"
              v-mask="mask_telefone"
              label="Telefone"
              prepend-icon="mdi-cash-usd"
              :disabled="!disabled"
            ></v-text-field>
            <v-text-field
              v-model="campos.parcela"
              :value="campos.parcela"
              label="Parcela"
              v-money="money"
              prepend-icon="mdi-cash-usd"
              :disabled="disabled"
            ></v-text-field>
            <v-text-field
              v-model="campos.custo"
              :value="campos.custo"
              label="Custo"
              prepend-icon="mdi-cash-usd"
              :disabled="disabled"
              @keypress.enter="atualizarDashoboard(fields)"
            ></v-text-field>
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
import {VMoney} from 'v-money'
export default {
  data() {
    return {
      dialog: false,
      disabled: true,
      date: {},
      campos: {},
      mask_telefone: "(##) ####-#####",
      money: {
          decimal: ',',
          thousands: '.',
          prefix: '',
          suffix: '',
          precision: 2,
          masked: false
        },
    };
  },
  directives: {money: VMoney},
  props: {
    fields: {}
  },

  methods: {
    atualizarDashoboard(fields) {
      var response;
      if (this.disabled === true) {
        response = {
          id : fields._id,
          valor: fields.valor,
          custo: fields.custo,
          local: fields.local,
          status: "Vendido",
          cliente: {
            nome: this.campos.nome,
            telefone: this.campos.telefone,
            datapagamento: fields.cliente.datapagamento,
            parcela: fields.cliente.parcela,
            pagas: fields.cliente.pagas,
            total: fields.cliente.total
          }
        };
      } else if(this.disabled === false && this.campos.custo === " " || this.campos.custo === undefined){
        response = {
          troca: fields.troca + 1,
          id : fields._id,
          valor: fields.valor,
          custo: fields.custo,
          local: fields.local,
          status: "Vendido",
          cliente: {
            nome: fields.cliente.nome,
            telefone: fields.cliente.telefone,
            datapagamento: fields.cliente.datapagamento,
            parcela: this.campos.parcela,
            pagas: fields.cliente.pagas,
            total: fields.cliente.total
          }
        };
      }else if(this.disabled === false){
        const custo = parseInt(this.campos.custo) + parseInt(fields.custo)
        response = {
          id : fields._id,
          valor: fields.valor,
          custo:  custo.toString(),
          local: fields.local,
          status: "Vendido",
          cliente: {
            nome: fields.cliente.nome,
            telefone: fields.cliente.telefone,
            datapagamento: fields.cliente.datapagamento,
            parcela: fields.cliente.parcela,
            pagas: fields.cliente.pagas,
            total: fields.cliente.total
          }
        };
      }

      this.$emit('alterarUsuario', response)
    }
  }
};
</script>>