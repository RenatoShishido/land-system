<template>
  <v-app>
      <NavDrag/>
      <Table/>
  </v-app>
</template>

<script>
import NavDrag from "../components/Navdrag"
import Table from "../components/Table"
export default {
  name: 'Home',
  components: {
    NavDrag,
    Table
  }
}
</script>
