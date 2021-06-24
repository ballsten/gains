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
            <td>{{ weight }} kg</td>
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
            <td>{{ height }} cm</td>
            <td></td>
          </tr>
          <tr>
            <td>Body Fat</td>
            <td>{{ bodyFat }}%</td>
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
            <td>{{ leanBodyMass }} kg</td>
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
            <td>{{ bodyMassIndex }}%</td>
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
