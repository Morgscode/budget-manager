const state = {
  expenditureItems: {
    title: "Expenditure Items",
    type: "exp",
    data: [],
  },
};

const getters = {
  getExpenditureItems: (state) => {
    return state.expenditureItems;
  },
  getExpenditureItemsLength: (state) => {
    return state.expenditureItems.data.length;
  },
  getExpenditureTotals: (state) => {
    let total = 0;
    for (const budgetItem of state.expenditureItems.data) {
      total += parseInt(budgetItem.itemValue);
    }
    return total;
  },
};

const actions = {};

const mutations = {
  addExpenditureItem: (state, newItem) => {
    state.expenditureItems.data.push(newItem);
  },
  deleteExpenditureItem: (state, item) => {
    const updatedExpenditureItemsArray = state.expenditureItems.data.filter(
      (expenditureItem) => {
        return expenditureItem !== item;
      }
    );
    return (state.expenditureItems.data = updatedExpenditureItemsArray);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
