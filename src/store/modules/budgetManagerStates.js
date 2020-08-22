const state = {
  budgetManagerStates: {
    isAdd: true,
    isEdit: false,
  },
};

const getters = {
  getBudgetManagerState: (state) => {
    return state.budgetManagerStates;
  },
};

const mutations = {
  setAddItemMode: (state) => {
    return (state.budgetManagerStates = {
      isAdd: true,
      isEdit: false,
    });
  },
  setEditItemMode: (state) => {
    return (state.budgetManagerStates = {
      isAdd: false,
      isEdit: true,
    });
  },
};

export default {
  state,
  getters,
  mutations,
};
