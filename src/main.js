import Vue from "vue";
import App from "./App.vue";

import initRequest from "./services/initRequest";

Vue.config.productionTip = false;

initRequest();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
