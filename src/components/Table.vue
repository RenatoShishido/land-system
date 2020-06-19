<template>
  <v-content>
    <v-container>
      <v-layout class="d-flex flex-wrap justify-center">
        <v-flex xs12 sm12 md12 lg12 class="d-flex justify-center">
          <v-btn text color="black" class="mb-4" @click="atualizar()">
            <v-icon left large color="blue">mdi-refresh</v-icon>
            <span class="headline black--text">Atualizar</span>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.id">
        <h3 class="d-flex justify-center subheading black--text">{{project.cliente.nome}}</h3>
        <v-divider></v-divider>
        <v-layout
          @click="mudarCor()"
          row
          wrap
          :class="`d-flex flex-wrap pa-3 project ${project.status} zoom `"
        >
          <v-flex xs12 sm4 md2 lg2 xl2>
            <div class="caption black--text d-flex justify-center">Nome</div>
            <div class="headline black--text">{{ project.cliente.nome }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg1 xl1>
            <div class="caption black--text d-flex justify-center">Parcelas</div>
            <div class="headline black--text">R$ {{project.cliente.parcela  }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 xl2>
            <div class="caption black--text d-flex justify-center">Local</div>
            <div class="headline black--text text-justify d-flex justify-center">{{ project.local }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg1 xl1>
            <div class="caption black--text d-flex justify-center">Parcelas Pagas</div>
            <div
              class="headline black--text text-justify d-flex justify-center"
            >{{ project.cliente.pagas }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 xl2>
            <div class="caption black--text d-flex justify-center">Total Parcelas</div>
            <div
              class="headline black--text text-justify d-flex justify-center"
            >R$ {{ project.cliente.pagas * ((90 * project.cliente.parcela) / 100) }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg1 xl1>
            <div class="caption black--text d-flex justify-center">Total Corretor</div>
            <div
              class="headline black--text text-justify d-flex justify-center"
            >R$ {{ project.cliente.pagas * ((10 * project.cliente.parcela) / 100) }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg2 xl2>
            <div class="caption black--text d-flex justify-center" link>Data Pagamento</div>
            <div
              class="headline black--text d-flex justify-center"
            >{{ project.cliente.datapagamento }}</div>
          </v-flex>
          <v-flex xs6 sm4 md6 lg1 xl1 class="d-flex">
            <v-btn fab small text @click="pagar(project)" class="green">
              <v-icon>mdi-cash-usd</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      <h1 class="my-10 display-4">
        TOTAL:
        <span class="red--text">{{ total }}</span>
      </h1>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      projects: {},
      fields: {},
      referencias: [],
      user: {},
      total: "",
      isActive: false,
      tutoria: {}
    };
  },
  mounted() {
    this.atualizar();
  },
  methods: {
    atualizar() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/filter/cliente`)
        .then(response => {
          this.projects = response.data.response;
          var soma;
          var total = 0;
          this.projects.forEach(element => {
            console.log(element.cliente.total);
            soma = parseInt(element.cliente.total);
            total = soma + total;
          });
          
          this.total = total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
          
        })
        .catch(error => console.error(error));
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    pagar(fields) {
      const data = fields.cliente.datapagamento;
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
      const response = {
        valor: fields.valor,
        custo: fields.custo,
        local: fields.local,
        status: "Vendido",
        cliente: {
          nome: fields.cliente.nome,
          telefone: fields.cliente.telefone,
          localizacao: fields.cliente.localizacao,
          parcela: fields.cliente.parcela,
          pagas: fields.cliente.pagas + 1,
          datapagamento: dataFormatada,
          total: fields.cliente.pagas * ((90 * fields.cliente.parcela) / 100)
        }
      };
      axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields._id}`, response)
        .then(response => console.log(response))
        .catch(error => console.error(error));
    }
  }
};
</script>

<style>
.project.Pago {
  border-left: 4px solid greenyellow;
  border-right: 4px solid greenyellow;
}
.project.Vendido {
  border-left: 4px solid red;
  border-right: 4px solid red;
}
a {
  text-decoration: none;
  color: black;
}

.zoom:hover {
  -moz-transform: scale(1.01);
  -webkit-transform: scale(1.01);
  transform: scale(1.01);
  background: whitesmoke;
}
</style>
