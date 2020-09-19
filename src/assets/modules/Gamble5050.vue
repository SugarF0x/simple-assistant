<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="isAuto"></label>
      <span>Automatically place bets</span>
    </div>
    <div class="input">
      <label><input type="text" @keypress.enter="enter" v-model="baseline"></label>
      <span></span>
    </div>
    <div><span class="display">Current: </span>{{ current }}</div>
    <div><span class="display">Runtime Profit: </span>{{ profitRuntime }}</div>
    <div><span class="display">Total Profit: </span>{{ profitTotal }}</div>
    <div><span class="display">Streak: </span>{{ streak }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "gamble5050",

  data() {
    return {
      isAuto:         false,
      baseline:       100,
      current:        0,
      profitRuntime:  0,
      profitTotal:    0,
      streak:         0
    }
  },

  methods: {
    enter() {

      //          Legacy Code
      // if (!isNaN(newValue)) {
      //   engine.gamble5050.data.baseline.value = newValue;
      //   engine.gamble5050.data.current.value  = newValue;
      //   engine.$set('gamble5050');
      //   createPanel('gamble5050');
      // }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
