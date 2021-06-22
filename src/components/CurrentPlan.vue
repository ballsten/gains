<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Phase</p>
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
            <td>Change per week</td>
            <td>{{ changePerWeek }} kg</td>
          </tr>
          <tr>
            <td>Estimated target weight</td>
            <td>{{ estimatedTargetWeight }} kg</td>
          </tr>
          <tr>
            <td>Estimated end date</td>
            <td>{{ estimatedEndDate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "type",
    "targetBodyFat",
    "exercisePerWeek",
    "changePerWeek",
    "estimatedTargetWeight",
    "estimatedEndDate"
  ],
};
</script>
