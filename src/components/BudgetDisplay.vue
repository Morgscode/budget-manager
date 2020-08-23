
<style type="text/css" scoped>
.row-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
}

@media only screen and (max-width: 576px) {
}
</style>

<template>
  <div id="BudgetDisplay">
    <div class="d-grid row-auto-fit m-t-m m-b-m">
      <div class="total__wrapper total-budget__wrapper panel">
        Budget:
        <h2 class="total-budget__value">{{ this.getIncomeTotals - this.getExpenditureTotals }}</h2>
      </div>
    </div>
    <div class="d-grid row-auto-fit m-b-m m-t-m">
      <div class="total__wrapper total-income__wrapper panel">
        <p>Income:</p>
        <h2 class="total-exp__value">{{ this.getIncomeTotals }}</h2>
      </div>
      <div class="total__wrapper total-exp__wrapper panel">
        <p>Expenditure:</p>
        <h2 class="total-inc__value">{{ this.getExpenditureTotals }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BudgetDisplay",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getIncomeTotals", "getExpenditureTotals"]),
  },
  methods: {},
  created() {},
};
</script>

