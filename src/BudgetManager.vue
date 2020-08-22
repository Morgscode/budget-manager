<style scoped>
.row-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>

<template>
  <div id="app" class="container m-t-l m-b-l">
    <BudgetDisplay />
    <BudgetForm
      v-on:addBudgetItem="postItemToStore($event)"
      v-on:updateBudgetItem="resetUpdateItem()"
      v-bind:updateItem="itemToUpdate"
    />
    <div class="d-grid row-auto-fit m-b-m m-t-m">
      <ItemList
        v-bind:items="getIncomeItems"
        v-on:deleteBugdetItem="deleteItemFromStore($event)"
        v-on:updateBudgetItem="passUpdateItemToForm($event)"
      />
      <ItemList
        v-bind:items="getExpenditureItems"
        v-on:deleteBugdetItem="deleteItemFromStore($event)"
        v-on:updateBudgetItem="passUpdateItemToForm($event)"
      />
    </div>
  </div>
</template>

<script>
import BudgetDisplay from "./components/BudgetDisplay";
import BudgetForm from "./components/BudgetItemForm";
import ItemList from "./components/ItemList";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BudgetManager",
  components: {
    BudgetDisplay,
    BudgetForm,
    ItemList,
  },
  data() {
    return {
      incomeItems: {},
      expenditureItems: {},
      itemToUpdate: null,
    };
  },
  computed: {
    ...mapGetters(["getIncomeItems", "getExpenditureItems"]),
  },
  methods: {
    ...mapMutations([
      "addIncomeItem",
      "deleteIncomeItem",
      "addExpenditureItem",
      "deleteExpenditureItem",
      "setAddItemMode",
    ]),
    postItemToStore(newBudgetItem) {
      if (newBudgetItem.itemType === "inc") {
        this.addIncomeItem(newBudgetItem);
      } else if (newBudgetItem.itemType === "exp") {
        this.addExpenditureItem(newBudgetItem);
      } else {
        alert("there was a problem with the item type");
        return false; // bail
      }
    },
    deleteItemFromStore(budgetItem) {
      if (budgetItem.itemType === "inc") {
        this.deleteIncomeItem(budgetItem);
      } else if (budgetItem.itemType === "exp") {
        this.deleteExpenditureItem(budgetItem);
      } else {
        alert("there was a problem with the item type");
        return false; // bail
      }
    },
    passUpdateItemToForm(budgetItem) {
      this.itemToUpdate = budgetItem;
    },
    resetUpdateItem() {
      this.itemToUpdate = null;
      this.setAddItemMode();
    },
  },
  mounted() {},
};
</script>

<style>
/**
* Global CSS
*/

body {
  background-color: #34495e;
  min-width: 300px;
  min-height: 100vh;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#app {
  position: relative;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}

.container > * {
  max-width: 100%;
}

.panel {
  background-color: rgba(189, 195, 199, 0.5);
  border-radius: 6px;
}

.d-grid {
  display: grid;
  grid-gap: 1em;
}

.d-grid > * {
  padding: 1em;
}

.p-t-s {
  padding-top: 1rem;
}

.p-t-m {
  padding-top: 2rem;
}

.p-t-l {
  padding-top: 3rem;
}

.p-b-s {
  padding-bottom: 1rem;
}

.p-b-m {
  padding-bottom: 2rem;
}

.p-b-l {
  padding-bottom: 3rem;
}

.m-t-s {
  margin-top: 1rem;
}

.m-t-m {
  margin-top: 2rem;
}

.m-t-l {
  margin-top: 3rem;
}

.m-b-s {
  margin-bottom: 1rem;
}

.m-b-m {
  margin-bottom: 2rem;
}

.m-b-l {
  margin-bottom: 3rem;
}

@media only screen and (max-width: 576px) {
  .p-t-s {
    padding-top: 0.5rem;
  }

  .p-t-m {
    padding-top: 1rem;
  }

  .p-t-l {
    padding-top: 1.5rem;
  }

  .p-b-s {
    padding-bottom: 0.5rem;
  }

  .p-b-m {
    padding-bottom: 1rem;
  }

  .p-b-l {
    padding-bottom: 1.5rem;
  }

  .m-t-s {
    margin-top: 0.5rem;
  }

  .m-t-m {
    margin-top: 1rem;
  }

  .m-t-l {
    margin-top: 1.5rem;
  }

  .m-b-s {
    margin-bottom: 0.5rem;
  }

  .m-b-m {
    margin-bottom: 1rem;
  }

  .m-b-l {
    margin-bottom: 1.5rem;
  }
}
</style>


