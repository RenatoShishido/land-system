<template>
  <v-content>
    <v-container>
      <h1 class="d-flex justify-center subheading grey--text">Terrenos Vendidos</h1>
      <v-card flat class="mb-10 zoom" v-for="project in projects" :key="project.id">
        <v-divider></v-divider>
        <v-layout row wrap :class="`d-flex flex-wrap pa-3 project ${project.status} `">
          <v-flex xs12 sm4 md2 lg1 xl2>
            <div class="caption grey--text d-flex justify-center">Nome</div>
            <div class="body-1 black--text">{{ project.cliente.nome }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg2 xl2>
            <div class="caption grey--text d-flex justify-center">Telefone</div>
            <div class="body-1 black--text">{{ project.cliente.telefone }}</div>
          </v-flex>
          <v-flex xs12 sm4 md2 lg1 xl1>
            <div class="caption grey--text d-flex justify-center">Parcela</div>
            <div class="body-1 black--text d-flex justify-center">R$ {{ project.cliente.parcela }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 xl2>
            <div class="caption grey--text d-flex justify-center">Data de pagamento</div>
            <div
              class="body-1 black--text text-justify d-flex justify-center"
            >{{ project.cliente.datapagamento }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg1 xl1>
            <div class="caption grey--text d-flex justify-center" link>Custo</div>
            <div class="body-1 black--text d-flex justify-center">R$ {{ project.custo }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg2 xl2>
            <div class="caption grey--text d-flex justify-center">Valor Terreno</div>
            <div class="body-1 black--text d-flex justify-center">R$ {{ project.valor }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg2 xl2>
            <div class="caption grey--text d-flex justify-center">Local Terreno</div>
            <div class="body-1 black--text d-flex justify-center">{{ project.local }}</div>
          </v-flex>
          <v-flex xs6 sm4 md6 lg1 xl1 class="d-flex">
            <botaoPagamento :fields="project" @alterarUsuario="alterarUsuario" class="mx-1" />
            <btnDeletarTutoria :fields="project" @deletarcampo="deletarCampos" class="mx-1" />
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";
import botaoPagamento from "./botoes/botaoPagamento";
import btnDeletarTutoria from "./botoes/btnDeletarTutoria";

export default {
  components: {
    botaoPagamento,
    btnDeletarTutoria
  },
  data() {
    return {
      projects: {},
      fields: {},
      user: {},
      isActive: false,
      tutoria: {}
    };
  },
  mounted() {
    this.atualizar();
  },
  methods: {
    deletarCampos(fields) {
      axios
        .delete(`${process.env.VUE_APP_API_URL}/delete/${fields}`)
        .then(response => {
          response;
          this.atualizar();
        })
        .catch(error => console.error(error));
    },
    alterarUsuario(fields) {
      axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields.id}`, fields)
        .then(response => {
          response;
          this.atualizar();
        })
        .catch(error => console.error(error));
    },
    atualizar() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/filter/vendido`)
        .then(response => {
          console.log(response.data.response);
          this.projects = response.data.response;
        })
        .catch(error => console.error(error));
    },
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style>
.project.Vendido {
  border-left: 4px solid orangered;
  border-right: 4px solid orangered;
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
