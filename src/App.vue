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
            :changePerWeek="planMetrics.changePerWeek"
            :estimatedTargetWeight="planMetrics.estimatedTargetWeight"
            :estimatedEndDate="planMetrics.estimatedEndDate"
          >
          </CurrentPlan>
        </div>
        <div class="column">
          <Nutrition
            :bmr="nutrition.bmr"
            :tdee="nutrition.tdee"
            :targetConsumption="nutrition.targetConsumption"
            :protein="nutrition.protein"
            :carbohydrate="nutrition.carbohydrate"
            :fat="nutrition.fat"
          ></Nutrition>
        </div>
      </div>
    </div>
  </div>
  <div class="section">
    <div class="content ml-4">
      <p class="has-text-grey">
        <i>Updated on: {{ updateDate }}</i>
      </p>
    </div>
  </div>
</template>

<script>
import { Store } from "./store";
import CurrentMetrics from "./components/CurrentMetrics.vue";
import CurrentPlan from "./components/CurrentPlan.vue";
import Nutrition from "./components/Nutrition.vue";

export default {
  name: "Gains",
  components: {
    CurrentMetrics,
    CurrentPlan,
    Nutrition,
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
        changePerWeek: 0,
        estimatedTargetWeight: 0,
        estimatedEndDate: "",
      },
      nutrition: {
        bmr: 0,
        tdee: 0,
        targetConsumption: 0,
        protein: 0,
        carbohydrate: 0,
        fat: 0,
      },
      updateDate: new Date(),
    };
  },
  async created() {
    this.store = new Store();
    this.store.on("dataload", async () => {
      await this.calculateMetrics();
      await this.calculatePlanMetrics();
      await this.calculateNutrition();

      this.updateDate = new Intl.DateTimeFormat("en-GB").format(
        this.store.updateDate
      );
    });
  },
  methods: {
    async calculateMetrics() {
      let dob = await this.store.getCurrent("birthday");
      let diff = Date.now() - dob.getTime();
      let ageDate = new Date(diff);

      this.metrics.age = Math.abs(ageDate.getUTCFullYear() - 1970);

      this.metrics.weight = await this.store.getCurrent("weight");
      this.metrics.height = await this.store.getCurrent("height");
      this.metrics.neck = await this.store.getCurrent("neck");
      this.metrics.waist = await this.store.getCurrent("waist");

      // calculate body fat using US navy formula
      // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6650177

      this.metrics.bodyFat =
        86.01 *
          Math.log10((this.metrics.waist - this.metrics.neck) * 0.393701) -
        70.041 * Math.log10(this.metrics.height * 0.393701) +
        36.76;
      this.metrics.leanBodyMass =
        this.metrics.weight * (1 - this.metrics.bodyFat / 100);
      this.metrics.bodyMassIndex =
        (this.metrics.weight /
          ((this.metrics.height * this.metrics.height) / 100)) *
        100;
    },
    async calculatePlanMetrics() {
      let currentPlan = await this.store.getCurrentPlan();

      this.planMetrics.type =
        currentPlan.type.charAt(0).toUpperCase() + currentPlan.type.slice(1);
      this.planMetrics.targetBodyFat = currentPlan.targetBodyFat * 100;
      this.planMetrics.exercisePerWeek = currentPlan.exercisePerWeek;

      this.planMetrics.changePerWeek = this.metrics.weight * -0.007;

      this.planMetrics.estimatedTargetWeight =
        this.metrics.leanBodyMass / (1 - this.planMetrics.targetBodyFat / 100);

      let estimatedEndDate = new Date();
      let lossRequired =
        this.metrics.weight - this.planMetrics.estimatedTargetWeight;
      let daysRequired =
        lossRequired / (Math.abs(this.planMetrics.changePerWeek) / 7);
      estimatedEndDate.setDate(estimatedEndDate.getDate() + daysRequired);
      this.planMetrics.estimatedEndDate = new Intl.DateTimeFormat(
        "en-GB"
      ).format(estimatedEndDate);
    },
    async calculateNutrition() {
      this.nutrition.bmr = (370 + 21.6 * this.metrics.leanBodyMass) * 4.184;

      let tdeeFactor = 1.2;
      if (this.planMetrics.exercisePerWeek > 3) tdeeFactor = 1.35;
      if (this.planMetrics.exercisePerWeek > 6) tdeeFactor = 1.5;

      this.nutrition.tdee = this.nutrition.bmr * tdeeFactor;

      this.nutrition.targetConsumption = this.nutrition.tdee - 500 * 4.184;

      if (this.planMetrics.type === "Cut") {
        this.nutrition.protein =
          (this.nutrition.targetConsumption * 0.45) / 4.184 / 4;
        this.nutrition.carbohydrate =
          (this.nutrition.targetConsumption * 0.38) / 4.184 / 4;
        this.nutrition.fat =
          (this.nutrition.targetConsumption * 0.17) / 4.184 / 9;
      }
    },
  },
};
</script>