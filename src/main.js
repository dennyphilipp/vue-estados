import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Axios from "axios";
import App from "./App.vue";
import './assets/styles/_vendors.scss'

var axiosInstance = Axios.create();
Vue.prototype.$http = axiosInstance;
Vue.use(BootstrapVue);
new Vue({
  render: (h) => h(App)
}).$mount("#app");
