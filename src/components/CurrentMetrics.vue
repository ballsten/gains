<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Metrics</p>
    </div>
    <div class="card-content">
      <table class="table is-fullwidth">
        <tbody>
          <tr>
            <td>Age</td>
            <td>{{ age }}</td>
            <td></td>
          </tr>
          <tr>
            <td>Weight</td>
            <td>{{ weight.toLocaleString(undefined, {maximumFractionDigits: 1}) }} kg</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Three day average"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{{ height.toLocaleString(undefined, {maximumFractionDigits: 0}) }} cm</td>
            <td></td>
          </tr>
          <tr>
            <td>Body Fat</td>
            <td>{{ bodyFat.toLocaleString(undefined, {maximumFractionDigits: 1}) }}%</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="calculated using the US Navy formula"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Lean Body Mass</td>
            <td>{{ leanBodyMass.toLocaleString(undefined, {maximumFractionDigits: 1}) }} kg</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Weight * ( 1 - Body Fat %)"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>BMI</td>
            <td>{{ bodyMassIndex.toLocaleString(undefined, {maximumFractionDigits: 1}) }}%</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="BMI = Height / (Weight * Weight)"
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
    "age",
    "weight",
    "height",
    "bodyFat",
    "leanBodyMass",
    "bodyMassIndex",
  ],
};
</script>
