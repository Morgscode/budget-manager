import Vue from "vue";
import Vuex from "vuex";
import budgetManagerStates from "./modules/budgetManagerStates";
import expenditureItems from "./modules/expenditureItems";
import incomeItems from "./modules/incomeItems";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    budgetManagerStates,
    incomeItems,
    expenditureItems,
  },
});
