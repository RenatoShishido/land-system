<template>
  <v-app>
      <NavDrag/>
      <Simulacao/>
  </v-app>
</template>

<script>
import NavDrag from "../components/Navdrag"
import Simulacao from "../components/Simulacao"
export default {
  name: 'Home',
  components: {
    NavDrag,
    Simulacao
  }
}
</script>
