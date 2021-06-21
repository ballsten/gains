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
            <td>{{ weight }} kg</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{{ height }} cm</td>
          </tr>
          <tr>
            <td>Body Fat</td>
            <td>{{ bodyFat }}%</td>
          </tr>
          <tr>
            <td>Lean Body Mass</td>
            <td>{{ leanBodyMass }} kg</td>
          </tr>
          <tr>
            <td>BMI</td>
            <td>{{ bodyMassIndex }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['weight', 'height', 'bodyFat', 'leanBodyMass', 'bodyMassIndex']
};
</script>
