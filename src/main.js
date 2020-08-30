import Vue from "vue";
import BudgetManager from "./BudgetManager.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(BudgetManager),
}).$mount("#app");
