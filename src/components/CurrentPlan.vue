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
            <td></td>
          </tr>
          <tr>
            <td>Target Body Fat</td>
            <td>{{ targetBodyFat }} %</td>
            <td></td>
          </tr>
          <tr>
            <td>Exercise Per Week</td>
            <td>{{ exercisePerWeek }} hr</td>
            <td></td>
          </tr>
          <tr>
            <td>Change per week</td>
            <td>{{ changePerWeek.toLocaleString(undefined, {maximumFractionDigits: 1}) }} kg</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Weight * -0.007"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Estimated target weight</td>
            <td>{{ estimatedTargetWeight.toLocaleString(undefined, {maximumFractionDigits: 1}) }} kg</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Lean Body Mass / (1 - Target Body Fat)&#10;Assumes Lean Body Mass will remain the same"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Estimated end date</td>
            <td>{{ estimatedEndDate }}</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Uses Change Per Week to calculate the number of days to hit the Estimated Target Weight"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
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
    "estimatedEndDate",
  ],
};
</script>
