<template>
  <div>
    <v-btn fab small text @click="pagar()" class="green">
      <v-icon>mdi-cash-usd</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: {
    fields: {}
  },

  methods: {
    pagar() {
      const data = this.fields.cliente.datapagamento;
      const formatado = data.split("/");
      const numero = parseInt(formatado[1]) + 1;
      const transform = numero.toString();
      var volt;
      var dataFormatada;
      if (parseInt(transform) >= 10) {
        volt = transform;
      } else {
        volt = 0 + transform;
      }
      if (parseInt(transform) > 12) {
        volt = '01';
        const numero2 = parseInt(formatado[2]) + 1;
        dataFormatada = formatado[0] + "/" + volt + "/" + numero2;
      } else {
        dataFormatada = formatado[0] + "/" + volt + "/" + formatado[2];
      }
      dataFormatada
      var total = 0
      var aux = 0
      if(this.fields.troca > 0){
        for (let index = 0; index < this.fields.troca; index++) {
          aux = parseInt(this.fields.cliente.parcela) + aux
        }
        total = aux + parseInt(this.fields.cliente.total)
      }else{
        for (let index = 0; index < this.fields.cliente.pagas + 1; index++) {
          total = parseInt(this.fields.cliente.parcela) + total
      }
      }
      const response = {
        id: this.fields._id,
        valor: this.fields.valor,
        custo: this.fields.custo,
        local: this.fields.local,
        status: "Vendido",
        cliente: {
          nome: this.fields.cliente.nome,
          telefone: this.fields.cliente.telefone,
          localizacao: this.fields.cliente.localizacao,
          parcela: this.fields.cliente.parcela,
          pagas: this.fields.cliente.pagas + 1,
          datapagamento: dataFormatada,
          total: total,
          
        }
      }
      this.$emit('botaoPagar', response)

    }
  }
};
</script>>