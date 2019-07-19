import Vue from 'vue'
import App from './App.vue'
import router from './routes/index'
import store from './store/index'
import 'amfe-flexible/index.js'
import 'normalize.css'
import '@/assets/css/reset.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
