<style type="text/css" scoped>
.row-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.budget-form {
  width: 100%;
}

.budget-form__group {
  background-color: rgba(149, 165, 166, 0.5);
  border-radius: 6px;
}

.budget-form__group--radio {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.budget-form__input {
  display: inline-block;
  padding: 5px 7px;
  border-radius: 6px;
  border: none;
}

.budget-form__input:active,
.budget-form__input:focus {
  outline: none;
  border: none;
}

.budget-form__btn {
  width: 100%;
  display: block;
  padding: 1em;
  border-radius: 6px;
  border: 0px;
  transition: transform 0.2s ease;
}

.budget-form__submit {
  background-color: rgba(46, 204, 113, 0.8);
}

.budget-form__update {
  background-color: rgba(241, 196, 15, 0.8);
}

.buudget-form__input .budget-form__btn,
.budget-form__btn:focus,
.budget-form__btn:active {
  border: none;
  outline: none;
}

.budget-form__btn:hover {
  cursor: pointer;
  transform: translateY(-3px);
  box-shadow: 1px 2px 3px #333333;
}

.budget-form__btn:active {
  transform: translateY(3px) scale(0.99);
  box-shadow: none;
}

@media only screen and (max-width: 576px) {
  .budget-form__group {
    display: flex;
    flex-direction: column;
  }

  .budget-form__group--radio {
    flex-direction: row;
  }

  .budget-form__group label {
    display: inline-block;
    margin-bottom: 0.5em;
  }
}
</style>

<template>
  <div id="BudgetItemForm">
    <form class="budget-form" @submit.prevent="showForm()">
      <div class="budget-form__group--wrapper d-grid row-auto-fit m-b-m">
        <div class="budget-form__group budget-form__group--radio">
          <div class="budget-form__input">
            <label for="inc-radio">Income:</label>
            <input
              type="radio"
              name="item-type"
              v-model="budgetItem.itemType"
              value="inc"
              v-bind:disabled="getBudgetManagerState.isEdit"
              id="inc-radio"
            />
          </div>
          <div class="budget-form__input">
            <label for="exp-radio">Expenditure:</label>
            <input
              type="radio"
              name="item-type"
              v-model="budgetItem.itemType"
              value="exp"
              v-bind:disabled="getBudgetManagerState.isEdit"
              id="exp-radio"
            />
          </div>
        </div>
        <div class="budget-form__group">
          <label for="item-description">Name:&nbsp;</label>
          <input
            class="budget-form__input budget-form__input--description"
            type="text"
            v-model="budgetItem.itemDescription"
            placeholder="Enter a description"
          />
        </div>
        <div class="budget-form__group">
          <label for="item-value">Item Value:&nbsp;</label>
          <input class="budget-form__input" type="number" v-model="budgetItem.itemValue" />
        </div>
      </div>
      <button
        v-if="getBudgetManagerState.isAdd"
        type="submit"
        v-on:click.stop="submitNewBudgetItem(budgetItem)"
        class="budget-form__btn budget-form__submit"
      >Add Budget Item</button>
      <button
        v-if="getBudgetManagerState.isEdit"
        type="submit"
        v-on:click.stop="submitUpdatedBudgetItem(budgetItem)"
        class="budget-form__btn budget-form__update"
      >Update Budget Item</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BudgetItemForm",
  props: {
    updateItem: {
      type: Object,
    },
  },
  data() {
    return {
      budgetItem: {
        itemType: "inc",
        itemDescription: "",
        itemValue: 0,
        id: 0,
      },
    };
  },
  watch: {
    updateItem: {
      handler(item) {
        if (item !== null) {
          this.setEditItemMode();
          this.budgetItem = item;
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      "getExpenditureItemsLength",
      "getIncomeItemsLength",
      "getBudgetManagerState",
    ]),
  },
  methods: {
    ...mapMutations(["setAddItemMode", "setEditItemMode"]),
    validateBudgetItem(newBudgetItem) {
      // parse value to interger
      newBudgetItem.itemValue = parseFloat(newBudgetItem.itemValue).toFixed(2);
      if (
        // check form fields are filled out
        newBudgetItem.itemType &&
        newBudgetItem.itemDescription !== "" &&
        newBudgetItem.itemValue > 0
      ) {
        // return the new item
        return newBudgetItem;
      } else {
        alert("please ensure the item has description and numerical value");
        return false; // bail
      }
    },
    calculateNewItemID(budgetItem) {
      if (budgetItem.itemType === "inc") {
        // check if there are any items in respective array
        this.getIncomeItemsLength > 0
          ? // assign new id to increment array length ++
            (budgetItem.id = this.getIncomeItemsLength + 1)
          : // or if array is empty, new id is 0
            (budgetItem.id = 1);
        // submit the new item to the budget manager
        return budgetItem;
      } else if (budgetItem.itemType === "exp") {
        this.getExpenditureItemsLength > 0
          ? (budgetItem.id = this.getExpenditureItemsLength + 1)
          : (budgetItem.id = 1);
        return budgetItem;
      } else {
        alert(
          "we were not able to assign an id, please ensure all form fields are complete and try again"
        );
        return false; // bail
      }
    },
    resetForm(newBudgetItem) {
      // reset the form fields based on the last item type
      if (newBudgetItem.itemType === "inc") {
        this.budgetItem = {
          itemType: "inc",
          itemDescription: "",
          itemValue: 0,
          id: 0,
        };
      } else {
        this.budgetItem = {
          itemType: "exp",
          itemDescription: "",
          itemValue: 0,
          id: 0,
        };
      }
    },
    submitNewBudgetItem(budgetItem) {
      const newBudgetItem = budgetItem;
      // if validation returns a 'success'
      if (this.validateBudgetItem(newBudgetItem)) {
        // calculate a new ID
        this.calculateNewItemID(newBudgetItem);
        // submit new item
        this.$emit("addBudgetItem", newBudgetItem);
        // reset form
        this.resetForm(newBudgetItem);
      }
    },
    submitUpdatedBudgetItem(budgetItem) {
      const updatedItem = budgetItem;

      if (this.validateBudgetItem(updatedItem)) {
        // submit the updated item
        this.$emit("updateBudgetItem", updatedItem);
        // reset form
        this.resetForm(updatedItem);
      }
    },
    showForm() {
      console.log(this);
    },
  },
};
</script>
