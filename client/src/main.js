import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/auth'
//ประกาศ scan-barcode 
import VueBarcodeScanner from 'vue-barcode-scanner'

//import './registerServiceWorker';
Vue.config.productionTip = false
// inject vue barcode scanner
Vue.use(VueBarcodeScanner)

Vue.prototype.$http = require('axios');
 Vue.prototype.$mainUrl = 'http://localhost:3000/'
// Vue.prototype.$mainUrl = 'http://188.166.212.218:3000/'

new Vue({
  vuetify,
  VueAxios, 
  Axios,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
