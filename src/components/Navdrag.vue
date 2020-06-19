<template>
  <div>
    <v-app-bar app color="purple darken-4" dark height="80">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white" />
      <v-toolbar-title class="headline white--text hidden-md-and-down">Terrenos</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer">
      <v-list flat class="d-flex flex-column my-5">
        <v-list-item class="d-flex justify-center">
          <Popup
            @projectAdded="snackbar=true, color='teal lighten-2', texto='Tutoria cadastrada com Sucesso!'"
            @projectFalied="snackbar=true, color='red', texto='Nao foi possivel cadastrar a tutoria!'"
            @refreshProject="snackbar=true, color='red', texto='Voce precisar selecionar o tipo da tutoria!'"
          />
        </v-list-item>
        <v-list-item class="my-4" v-for="item in items" :key="item.id" :to="item.route" link>
          <v-list-item-action>
            <v-icon class="black--text" :class="item.color">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title :class="item.color">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Popup from "./Popup";
export default {
  name: "NavDrag",
  components: {
    Popup
  },
  data: () => ({
    drawer: null,
    snackbar: false,
    fields: {},
    color: "",
    texto: "",
    link: "",
    id: "",
    items: [
      {
        icon: "mdi-book-minus",
        text: "Relatorio dos terreno",
        route: `/`
      },
      {
        icon: "mdi-cash-usd",
        text: "Vendido",
        route: `/vendido`
      },
      {
        icon: "mdi-page-next",
        text: "Tabela das parcelas",
        route: "/tabela"
      },
      {
        icon: "mdi-graph-outline",
        text: "Simulacao",
        route: "/"
      }
    ]
  }),
  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("jwt");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>