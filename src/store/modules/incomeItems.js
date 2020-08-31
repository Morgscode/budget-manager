const state = {
  incomeItems: {
    title: "Income Items",
    type: "inc",
    data: [],
  },
};

const getters = {
  getIncomeItems: (state) => {
    return state.incomeItems;
  },
  getIncomeItemsLength: (state) => {
    return state.incomeItems.data.length;
  },
  getIncomeTotals: (state) => {
    let total = 0;
    for (const budgetItem of state.incomeItems.data) {
      total += parseInt(budgetItem.itemValue);
    }
    return total;
  },
};

const actions = {};

const mutations = {
  addIncomeItem: (state, newItem) => {
    return state.incomeItems.data.push(newItem);
  },
  deleteIncomeItem: (state, item) => {
    const updatedIncomeItemsArray = state.incomeItems.data.filter(
      (incomeItem) => {
        return incomeItem !== item;
      }
    );
    return (state.incomeItems.data = updatedIncomeItemsArray);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
