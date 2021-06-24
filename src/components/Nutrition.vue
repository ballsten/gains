<template>
  <div class="card">
    <div class="card-header">
      <p class="card-header-title">Nutrition</p>
    </div>
    <div class="card-content">
      <table class="table is-fullwidth">
        <tbody>
          <tr>
            <td>BMR</td>
            <td>{{ bmr }} kJ</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Base Metabolic Rate&#10;370 + 21.6 * Lean Body Mass"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>TDEE</td>
            <td>{{ tdee }} kJ</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Total Daily Energy Expenditure&#10;BMR * TDEE Factor&#10;TDEE Factor is determined by the Excercise Per Week.&#10;1-3 = 1.2&#10;4-6 = 1.35&#10;6+ = 1.5"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Target consumption</td>
            <td>{{ targetConsumption }} kJ</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="How much energy to eat daily&#10;TDEE - 2092 kJ"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{{ protein }} g</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Target consumption * 45% / 4"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Carbohydrate</td>
            <td>{{ carbohydrate }} g</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Target consumption * 38% / 4"
              >
                <i class="fas fa-question-circle"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{{ fat }} g</td>
            <td>
              <span
                class="icon has-tooltip-arrow"
                data-tooltip="Target consumption * 17% / 9"
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
  props: ["bmr", "tdee", "targetConsumption", "protein", "carbohydrate", "fat"],
};
</script>
