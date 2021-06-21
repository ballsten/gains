<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Current Metrics</p>
    </div>
    <div class="card-content">
      <table class="table">
        <tbody>
          <tr>
            <td>Weight</td>
            <td>{{ currentWeight() }} kg</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{{ currentHeight() }} cm</td>
          </tr>
          <tr>
            <td>Body Fat</td>
            <td>24%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    currentWeight() {
      return parseFloat(this.$store.metrics.currentWeight).toFixed(2);
    },
    currentHeight() {
      return parseFloat(this.$store.metrics.currentHeight).toFixed(0);
    },
  },
};
</script>
