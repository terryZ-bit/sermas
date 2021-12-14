import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './assets/defult.less'
import 'element-ui/lib/theme-chalk/index.css'

import axios from "axios"
import md5 from 'md5'

import router from './router'

Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.use(md5)
Vue.prototype.md5 = md5
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
