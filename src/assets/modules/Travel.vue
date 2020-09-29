<template>
  <div>

    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Take steps on cooldown</span>
    </div>

    <div class="checkbox">
      <label><input type="checkbox" v-model="options.slowMode"></label>
      <span>Continue walking when out of steps</span>
    </div>

    <h6>On NPC encounters: </h6>
    <div class="radio">
      <input type="radio" id="sa-encounter-attack" value="attack" v-model="options.encounter">
      <label for="sa-encounter-attack">Attack</label>

      <input type="radio" id="sa-encounter-stop" value="stop" v-model="options.encounter">
      <label for="sa-encounter-stop">Stop</label>

      <input type="radio" id="sa-encounter-ignore" value="ignore" v-model="options.encounter">
      <label for="sa-encounter-ignore">Ignore</label>
    </div>

    <h6>On <u title="That being the ones you are skilled enough to gather">collectable*</u> Resource encounters: </h6>
    <div class="radio">
      <input type="radio" id="sa-resource-collect" value="collect" v-model="options.resource">
      <label for="sa-resource-collect">Collect</label>

      <input type="radio" id="sa-resource-stop" value="stop" v-model="options.resource">
      <label for="sa-resource-stop">Stop</label>

      <input type="radio" id="sa-resource-ignore" value="ignore" v-model="options.resource">
      <label for="sa-resource-ignore">Ignore</label>
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
      version: 2,
      options: {
        isAuto:    true,
        slowMode:  false,
        encounter: 'attack'  as 'attack'  | 'stop' | 'ignore',
        resource:  'collect' as 'collect' | 'stop' | 'ignore'
      },
    };
  },

  methods: {
    init() {
      let step = document.getElementsByClassName('stepbuttonnew')[0] as HTMLButtonElement;
      let slow = document.getElementById('slow-mode');

      let interval = setInterval(() => {
        try {
          if (this.options.isAuto) {
            let button = document.querySelectorAll('a.app-btn');
            [].forEach.call(button, (entry: HTMLElement) => {
              if (entry.textContent.indexOf('Attack') !== -1) {
                if (this.options.encounter === 'attack') {
                  entry.click();
                } else if (this.options.encounter === 'stop') {
                  clearInterval(interval);
                }
              } else if (
                     entry.textContent.indexOf('Salvage') !== -1
                  || entry.textContent.indexOf('Catch')   !== -1
                  || entry.textContent.indexOf('Chop')    !== -1
                  || entry.textContent.indexOf('Mine')    !== -1
              ) {
                let travelText = document.querySelector('.div-travel-text');
                if (!(travelText.children[4] && travelText.children[4].children[0])) {
                  if (this.options.resource === 'collect') {
                    let link = entry as HTMLAnchorElement;
                    window.location.href = link.href;
                  } else if (this.options.resource === 'stop') {
                    clearInterval(interval);
                  }
                }
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
          console.error(err);
          clearInterval(interval);
        }
      }, 1100 + Math.floor(Math.random() * 500));
    }
  },

  mounted() {
    this.init();
  },
};
</script>

<style lang="less" scoped>

</style>
