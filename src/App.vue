<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <CurrentMetrics
            :age="metrics.age"
            :weight="metrics.weight"
            :height="metrics.height"
            :bodyFat="metrics.bodyFat"
            :leanBodyMass="metrics.leanBodyMass"
            :bodyMassIndex="metrics.bodyMassIndex"
          ></CurrentMetrics>
        </div>
        <div class="column">
          <CurrentPlan
            :type="planMetrics.type"
            :targetBodyFat="planMetrics.targetBodyFat"
            :exercisePerWeek="planMetrics.exercisePerWeek"
            :bmr="planMetrics.bmr"
            :tdee="planMetrics.tdee"
            :targetConsumption="planMetrics.targetConsumption"
          >
          </CurrentPlan>
        </div>
        <div class="column">placeholder</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Store } from "./store";
import CurrentMetrics from "./components/CurrentMetrics.vue";
import CurrentPlan from "./components/CurrentPlan.vue";

export default {
  name: "Gains",
  components: {
    CurrentMetrics,
    CurrentPlan,
  },
  data() {
    return {
      metrics: {
        age: 0,
        weight: 0,
        height: 0,
        neck: 0,
        waist: 0,
        bodyFat: 0,
        leanBodyMass: 0,
        bodyMassIndex: 0,
      },
      planMetrics: {
        type: "",
        targetBodyFat: 0,
        exercisePerWeek: 0,
        bmr: 0,
        tdee: 0,
        targetConsumption: 0,
      },
    };
  },
  async created() {
    this.store = new Store()
    await this.calculateMetrics()
    await this.calculatePlanMetrics()
  },
  methods: {
    async calculateMetrics() {
      let dob = await this.store.getCurrent("birthday");
      let diff = Date.now() - dob.getTime();
      let ageDate = new Date(diff);

      this.metrics.age = Math.abs(ageDate.getUTCFullYear() - 1970);

      this.metrics.weight = parseFloat(
        await this.store.getCurrent("weight")
      ).toFixed(1);
      this.metrics.height = parseFloat(
        await this.store.getCurrent("height")
      ).toFixed(0);
      this.metrics.neck = parseFloat(
        await this.store.getCurrent("neck")
      ).toFixed(2);
      this.metrics.waist = parseFloat(
        await this.store.getCurrent("waist")
      ).toFixed(2);

      // calculate body fat using US navy formula
      // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6650177

      this.metrics.bodyFat = parseFloat(
        86.01 *
          Math.log10((this.metrics.waist - this.metrics.neck) * 0.393701) -
          70.041 * Math.log10(this.metrics.height * 0.393701) +
          36.76
      ).toFixed(1);
      this.metrics.leanBodyMass = parseFloat(
        this.metrics.weight * (1 - this.metrics.bodyFat / 100)
      ).toFixed(1);
      this.metrics.bodyMassIndex = parseFloat(
        (this.metrics.weight /
          ((this.metrics.height * this.metrics.height) / 100)) *
          100
      ).toFixed(1);
    },
    async calculatePlanMetrics() {
      let currentPlan = await this.store.getCurrentPlan()

      this.planMetrics.type = currentPlan.type.charAt(0).toUpperCase() + currentPlan.type.slice(1)
      this.planMetrics.targetBodyFat = parseFloat(currentPlan.targetBodyFat * 100).toFixed(0)
      this.planMetrics.exercisePerWeek = currentPlan.exercisePerWeek

      this.planMetrics.bmr = parseFloat(370 + (21.6 * this.metrics.leanBodyMass) * 4.184).toFixed(0)

      let tdeeFactor = 1.2
      if(currentPlan.exercisePerWeek > 3 ) tdeeFactor = 1.35
      if(currentPlan.exercisePerWeek > 6 ) tdeeFactor = 1.5

      this.planMetrics.tdee = parseFloat(this.planMetrics.bmr * tdeeFactor).toFixed(0)

      this.planMetrics.targetConsumption = this.planMetrics.tdee - 500 * 4.184
    },
  },
};
</script>