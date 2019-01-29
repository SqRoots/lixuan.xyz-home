import '@fortawesome/fontawesome-free/css/all.css';
import axios from 'axios';

import Vue from 'vue'
import VueCookies from 'vue-cookies';

import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
