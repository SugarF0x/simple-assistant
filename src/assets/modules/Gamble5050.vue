<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Automatically place bets</span>
    </div>
    <div class="input">
      <label><input type="text" @keypress.enter="enter" placeholder="Baseline bet" v-model="input"></label>
      <span></span>
    </div>
    <div><span class="display">Current: </span>{{ options.current }}</div>
    <div><span class="display">Runtime Profit: </span>{{ options.profitRuntime }}</div>
    <div><span class="display">Total Profit: </span>{{ options.profitTotal }}</div>
    <div><span class="display">Streak: </span>{{ options.streak }}</div>
  </div>
</template>

<script lang="ts">
// TODO: add gold/min display
// TODO: add lose-streak display and fail-safe for when lose-streak goes too bad
// TODO: add longest win/lose streaks this runtime
// TODO: add color coding to display (red/green)

import module from '../mixins/module';

export default {
  name: "Gamble5050",
  mixins: [module],

  data() {
    return {
      version: 1,
      options: {
        isAuto:         false,
        baseline:       100,
        current:        100,
        profitRuntime:  0,
        profitTotal:    0,
        streak:         0
      },
      input: '' as String
    }
  },

  methods: {
    enter() {
      if (!isNaN(this.input) && this.input !== '') {
        this.options.baseline = parseInt(this.input);
        this.options.current = parseInt(this.input);
      } else {
        alert('New bet must be a number')
      }
    }
  },

  mounted() {
    let isSuccess = document.getElementsByClassName('notice-success').length > 0;
    let isFailure = document.getElementsByClassName('notice-danger').length > 0;
    let input     = document.getElementById('sample1') as HTMLInputElement;
    let form      = document.getElementById('submit') as HTMLFormElement;

    if (isFailure) {
      this.options.profitRuntime -= this.options.current;
      this.options.profitTotal   -= this.options.current;
      this.options.current       *= 2;

      if (this.options.streak < 0)  this.options.streak--;
      else this.options.streak    = -1;
    } else if (isSuccess) {
      this.options.profitRuntime += this.options.current;
      this.options.profitTotal   += this.options.current;
      this.options.current        = this.options.baseline;

      if (this.options.streak > 0)  this.options.streak++;
      else this.options.streak    = 1;
    } else {
      this.options.profitRuntime = 0;
      this.options.streak        = 0;
    }

    let interval = setInterval(() => {
      if (this.options.isAuto) {
        clearInterval(interval);
        setTimeout(() => {
          input.value = this.options.current;

          setTimeout(() => {
            form.submit();
          },500)
        }, 250+Math.floor(Math.random()*1000))
      }
    }, 1000)
  }
}
</script>

<style lang="less" scoped>

</style>
