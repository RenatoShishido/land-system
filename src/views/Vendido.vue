<template>
  <v-app>
      <NavDrag/>
      <Vendido/>
  </v-app>
</template>

<script>
import NavDrag from "../components/Navdrag"
import Vendido from "../components/Vendido"
export default {
  name: 'Home',
  components: {
    NavDrag,
    Vendido
  }
}
</script>
