<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Take steps on cooldown</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.attackEncounters"></label>
      <span>Attack encountered NPCs</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.stopOnEncounters"></label>
      <span>Pause auto-step on enemy encounter</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.slowMode"></label>
      <span>Continue walking when out of steps</span>
    </div>
  </div>
</template>

<script lang="ts">
/* TODO: add travel statistics
     gather travel data of gold collected,
     items found, steps taken, enemies encountered
        Have it also take timestamp and if the last stamp
        was more than 5 minutes ago - dump stats
            Make stats dump an optional thing
            Or perhaps make total stats and latest session stats
*/

import module from '../mixins/module';

export default {
  name:   "Travel",
  mixins: [module],

  data() {
    return {
      version: 1,
      options: {
        isAuto:           false,
        attackEncounters: false,
        stopOnEncounters: false,
        slowMode:         false,
      },
    };
  },

  mounted() {
    let step = document.getElementsByClassName('stepbuttonnew')[0] as HTMLButtonElement;
    let slow = document.getElementById('slow-mode');

    let interval = setInterval(() => {
      try {
        if (this.options.isAuto) {
          let attack = document.getElementsByClassName('cta');
          [].forEach.call(attack, (entry: HTMLElement) => {
            if (entry.textContent.indexOf('Attack') !== -1) {
              if (this.options.stopOnEncounters) clearInterval(interval);
              if (this.options.attackEncounters) entry.click();
            }
          });
          if (slow.style.display !== 'none' && !this.options.slowMode) clearInterval(interval);
          if (step.textContent.indexOf('step') !== -1) step.click();
        }

        //          CYCLE LEGACY CODE

        // if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 3) {
        //   if (parseInt($('#current_steps').text()) <= 0) {
        //     engine.home.data.state.value = 'pending';
        //     engine.$set('home');
        //   }
        // }
      } catch (err) {
        clearInterval(interval);
      }
    }, 1100 + Math.floor(Math.random() * 500));
  },
};
</script>

<style lang="less" scoped>

</style>
