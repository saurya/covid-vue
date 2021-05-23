import Vue from 'vue'
import App from './App.vue'
import { i18n } from '@/plugins/i18n'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'


Vue.use(BootstrapVue)
Vue.use(PortalVue)
Vue.use(IconsPlugin)
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app')
