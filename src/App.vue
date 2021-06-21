<template>
<div class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <CurrentMetrics
          :weight="metrics.weight"
          :height="metrics.height"
          :bodyFat="metrics.bodyFat"
          :leanBodyMass="metrics.leanBodyMass"
          :bodyMassIndex="metrics.bodyMassIndex"
        ></CurrentMetrics></div>
      <div class="column">placeholder</div>
      <div class="column">placeholder</div>
    </div>
  </div>
  </div>
</template>

<script>
import { Store } from './store'
import CurrentMetrics from "./components/CurrentMetrics.vue";

export default {
  name: "Gains",
  components: {
    CurrentMetrics
  },
  data() {
    return {
      metrics: {
        weight: 0,
        height: 0,
        neck: 0,
        waist: 0,
        bodyFat: 0,
        leanBodyMass: 0,
        bodyMassIndex: 0
      }
    }
  },
  created() {
    this.store = new Store()
    this.calculateMetrics()
  },
  methods: {
    async calculateMetrics() {
      this.metrics.weight = parseFloat(await this.store.getCurrent("weight")).toFixed(2)
      this.metrics.height = parseFloat(await this.store.getCurrent("height")).toFixed(0)
      this.metrics.neck = parseFloat(await this.store.getCurrent("neck")).toFixed(2)
      this.metrics.waist = parseFloat(await this.store.getCurrent("waist")).toFixed(2)

      // calculate body fat using US navy formula
      // https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6650177

      this.metrics.bodyFat = parseFloat(86.01 * Math.log10((this.metrics.waist - this.metrics.neck) * 0.393701) - 70.041 * Math.log10(this.metrics.height * 0.393701) + 36.76).toFixed(2)
      
      this.metrics.leanBodyMass = parseFloat(this.metrics.weight * (1-(this.metrics.bodyFat/100))).toFixed(2)

      this.metrics.bodyMassIndex = parseFloat(this.metrics.weight / (this.metrics.height * this.metrics.height / 100) * 100).toFixed(2)
    }
  }

}
</script>