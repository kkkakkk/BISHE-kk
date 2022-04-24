// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as XLSX from 'xlsx'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'


// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
var axios = require('axios')
axios.defaults.baseURL = 'http://116.56.140.195:3000/mock/11'
//axios.defaults.baseURL = 'http://116.56.140.195:8765'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(XLSX)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
