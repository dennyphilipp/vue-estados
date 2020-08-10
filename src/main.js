import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import Axios from "axios";
import VSelect from "vue-select";
import App from "./App.vue";
import './assets/styles/_vendors.scss'

var axiosInstance = Axios.create();
Vue.prototype.$http = axiosInstance;
Vue.use(BootstrapVue);
Vue.component("v-select", VSelect);
new Vue({
  render: (h) => h(App)
}).$mount("#app");
