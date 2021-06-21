<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Current Plan</p>
    </div>
    <div class="card-content">
      <table class="table is-fullwidth">
        <tbody>
          <tr>
            <td>Type</td>
            <td>{{ type }}</td>
          </tr>
          <tr>
            <td>Target Body Fat</td>
            <td>{{ targetBodyFat }} %</td>
          </tr>
          <tr>
            <td>Exercise Per Week</td>
            <td>{{ exercisePerWeek }} hr</td>
          </tr>
          <tr>
            <td>BMR</td>
            <td>{{ bmr }} kJ</td>
          </tr>
          <tr>
            <td>TDEE</td>
            <td>{{ tdee }} kJ</td>
          </tr>
          <tr>
            <td>Target consumption</td>
            <td>{{ targetConsumption }} kJ</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "targetBodyFat", "exercisePerWeek", "bmr", "tdee", "targetConsumption"]
}
</script>
