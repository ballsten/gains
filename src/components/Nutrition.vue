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
          </tr>
          <tr>
            <td>TDEE</td>
            <td>{{ tdee }} kJ</td>
          </tr>
          <tr>
            <td>Target consumption</td>
            <td>{{ targetConsumption }} kJ</td>
          </tr>
          <tr>
            <td>Protein</td>
            <td>{{ protein }} g</td>
          </tr>
          <tr>
            <td>Carbohydrate</td>
            <td>{{ carbohydrate }} g</td>
          </tr>
          <tr>
            <td>Fat</td>
            <td>{{ fat }} g</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bmr", "tdee", "targetConsumption", "protein", "carbohydrate", "fat"]
}
</script>
