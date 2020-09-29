<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Attack enemy on cooldown</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.goBack"></label>
      <span>Go back when enemy is defeated</span>
    </div>
  </div>
</template>

<script lang="ts">
import module from '../mixins/module';

export default {
  name: "Battle",
  mixins: [module],

  data() {
    return {
      version: 1,
      // TODO: override options to *=true if Arena.fightAll=true
      options: {
        isAuto: true,
        goBack: true
      }
    }
  },

  methods: {
    init() {
      let attack = document.getElementById('attackButton');
      let back   = document.getElementsByClassName('btn-info')[0] as HTMLButtonElement;
      let enemy  = document.getElementById('enemyBox');

      let interval = setInterval(() => {
        try {
          if (this.options.isAuto) {
            if (enemy.style.opacity === '0.1') {
              clearInterval(interval);
              if (this.options.goBack) setTimeout(() => {back.click()}, 500);
            } else if (attack.innerText === 'Attack') attack.click();
          }
        } catch (err) {
          clearInterval(interval);
        }
      },1200+Math.floor(Math.random()*400))
    }
  },

  mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped>

</style>
