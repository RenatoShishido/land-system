<template>
  <v-app>
      <NavDrag/>
      <Dashboard/>
  </v-app>
</template>

<script>
import NavDrag from "../components/Navdrag"
import Dashboard from "../components/Dashboard"
export default {
  name: 'Home',
  components: {
    NavDrag,
    Dashboard
  }
}
</script>
