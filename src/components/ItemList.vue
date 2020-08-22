<style type="text/css" scoped>
.row-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.item-list {
  min-height: 50px;
}
.item {
  padding: 1em 0em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.item > * {
  flex: 2 1 50px;
}

.item__buttons {
  display: flex;
  justify-content: flex-end;
}

.item__button {
  display: inline-block;
  padding: 7px 12px;
  border: none;
  outline: none;
  border-radius: 40px;
  transition: transform 0.2s ease;
}

.item__button:not(:disabled):hover {
  cursor: pointer;
  transform: translateY(-3px);
  box-shadow: 1px 2px 3px #333333;
}

.item__button:active {
  transform: translateY(3px) scale(0.99);
  box-shadow: none;
  outline: none;
}

.item__button:first-child {
  margin-right: 1rem;
}

.item__edit {
  background-color: rgba(243, 156, 18, 0.8);
}

.item__delete {
  background-color: rgba(231, 76, 60, 0.8);
}
.item-options {
  display: flex;
  justify-content: space-evenly;
}
</style>

<template>
  <div class="item-list panel">
    <h3 class="m-b-s">{{ items.title }}</h3>
    <div
      class="item"
      v-for="singleBudgetItem in items.data"
      v-bind:key="singleBudgetItem.id"
      v-bind:id="singleBudgetItem.id"
    >
      <p class="item__description">{{ singleBudgetItem.itemDescription }}</p>
      <p class="item__value">{{ singleBudgetItem.itemValue }}</p>
      <div class="item__buttons">
        <button
          class="item__button item__edit"
          v-on:click.prevent="emitEditRequest(singleBudgetItem)"
        >edit</button>
        <button
          class="item__button item__delete"
          v-on:click.prevent="emitDeleteRequest(singleBudgetItem)"
          v-bind:disabled="getBudgetManagerState.isEdit"
        >delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ItemList",
  props: {
    items: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getBudgetManagerState"]),
  },
  methods: {
    emitDeleteRequest(budgetItem) {
      const item = budgetItem;
      this.$emit("deleteBugdetItem", item);
    },
    emitEditRequest(budgetItem) {
      const item = budgetItem;
      this.$emit("updateBudgetItem", item);
    },
  },
};
</script>