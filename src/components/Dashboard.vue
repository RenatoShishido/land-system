<template>
  <v-content>
    <v-container>
      <v-layout class="d-flex flex-wrap justify-center">
        <v-flex xs12 sm12 md12 lg12 xl12 class="d-flex justify-center my-6">
           <Popup
            @popup="cadastrarTerreno"
          />
        </v-flex>
      </v-layout>

      <v-card flat class="mb-10 zoom" v-for="project in projects" :key="project.id">
        <v-divider></v-divider>
        <v-layout row wrap :class="`d-flex flex-wrap pa-3 project ${project.status} `">
          <v-flex xs12 sm4 md2 lg2 xl1>
            <div class="caption grey--text d-flex justify-center">Valor</div>
            <div class="body-1 black--text">R$ {{ project.valor }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg2 xl1>
            <div class="caption grey--text d-flex justify-center">Custo</div>
            <div class="body-1 black--text">R$ {{ project.custo }}</div>
          </v-flex>
          <v-flex xs12 sm4 md3 lg3 xl3>
            <div class="caption grey--text d-flex justify-center">Local</div>
            <div class="body-1 black--text text-justify d-flex justify-center">{{ project.local }}</div>
          </v-flex>
          <v-flex xs12 sm4 md1 lg3 xl2>
            <div class="caption grey--text d-flex justify-center" link>Data</div>
            <div
              class="body-1 black--text d-flex justify-center"
            >{{ project.data | moment("DD/MM/YYYY") }}</div>
          </v-flex>

          <!-- BOTOES DO DASHBOARD -->

          <v-flex xs6 sm4 md6 lg2 xl1 class="d-flex">
            <botaoFazerTutoria :fields="project" @preenchido="atualizarValores" class="mx-1" />
            <btnAlterarTutoria :fields="project" @atualizarCampos="atualizarCampos" class="mx-1" />
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
import botaoFazerTutoria from "./botoes/botaoFazerTutoria";
import btnAlterarTutoria from "./botoes/btnAlterarTutoria";
import btnDeletarTutoria from "./botoes/btnDeletarTutoria";
import Popup from './Popup'

export default {
  components: {
    btnAlterarTutoria,
    botaoFazerTutoria,
    btnDeletarTutoria,
    Popup
  },
  data() {
    return {
      projects: [],
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
    cadastrarTerreno(fields){
       axios
          .post(`${process.env.VUE_APP_API_URL}`, fields)
           .then(response => {
          response
          this.atualizar()
        })
          .catch(error => console.error(error));
    },
    deletarCampos(fields){
       axios
        .delete(`${process.env.VUE_APP_API_URL}/delete/${fields}`)
         .then(response => {
          response
          this.atualizar()
        })
        .catch(error => console.error(error))
    }, 
    atualizarCampos(fields){
      axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields.id}`, fields)
        .then(response => {
          response
          this.atualizar()
        })
        .catch(error => console.error(error));

      this.atualizar()
    },
    atualizarValores(fields){
       axios
        .put(`${process.env.VUE_APP_API_URL}/atualizar/${fields.id}`, fields)
        .then(response => {
          response
          this.atualizar()
        })
        .catch(error => console.error(error));

      this.atualizar()

    },
    atualizar() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/filter/venda`)
        .then(response => {
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
.project.Venda {
  border-left: 4px solid greenyellow;
  border-right: 4px solid greenyellow;
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
