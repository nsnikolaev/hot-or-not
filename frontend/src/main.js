import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

// Vue.prototype.$e = new Vue() // шина для пробрасывания событий в любой компонент через this.$e.$emit()

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
