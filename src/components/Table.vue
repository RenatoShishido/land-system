<template>
  <v-content>
    <v-container>
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
            >R$ {{ project.cliente.total * 90 / 100 || 0 }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg1 xl1>
            <div class="caption black--text d-flex justify-center">Total Corretor</div>
            <div
              class="headline black--text text-justify d-flex justify-center"
            >R$ {{ project.cliente.total * 10 / 100 || 0 }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg2 xl2>
            <div class="caption black--text d-flex justify-center" link>Data Pagamento</div>
            <div
              class="headline black--text d-flex justify-center"
            >{{ project.cliente.datapagamento }}</div>
          </v-flex>
          <v-flex xs6 sm4 md6 lg1 xl1 class="d-flex">
            <btnPagar :fields="project" @botaoPagar="botaoPagamento"/>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
      <h1 class="my-10 display-1">
        TOTAL Liquido:
        <span class="red--text">{{ liquido  }}</span>
        <br/>
        TOTAL Contador:
        <span class="red--text">{{ contador }}</span>
      </h1>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";
import btnPagar from './botoes/botaoPagar'

export default {
  components: {
    btnPagar
  },
  data() {
    return {
      projects: {},
      fields: {},
      referencias: [],
      user: {},
      total: 0,
      liquido: 0,
      contador: 0,
      isActive: false,
      tutoria: {}
    };
  },
  mounted() {
    this.atualizar();
  },
  methods: {
    botaoPagamento(fields){
       axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields.id}`, fields)
        .then(response => {
          response
          this.atualizar() 
        })
        .catch(error => console.error(error));
    },
    atualizar() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/filter/cliente`)
        .then(response => {
          this.projects = response.data.response;
          
          var total = 0
          this.projects.forEach(element => {
            total = parseInt(element.cliente.total) + total
          });
          
          const liquido = total * 90 / 100
          const contador = total * 10 / 100
          this.liquido = liquido.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
          this.contador = contador.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
         
          
          
         
          
        })
        .catch(error => console.error(error));
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
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
