import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { VueMaskDirective } from 'v-mask'
import money from 'v-money'

// register directive v-money and component <money>
Vue.use(money, {precision: 4})



Vue.config.productionTip = false
Vue.directive("mask", VueMaskDirective)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(require('vue-moment'));
