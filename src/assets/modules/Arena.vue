<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Auto-accept enemy generation prompts</span>
    </div>
    <button class="btn btn-primary" @click="fightAll">Auto fight</button>
  </div>
</template>

<script lang="ts">
// TODO: add arena skip if insufficient funds

import module from '../mixins/module';

export default {
  name: "Arena",
  mixins: [module],

  data() {
    return {
      version: 1,
      options: {
        isAuto: false,
        fightAll: false
      }
    }
  },

  methods: {
    fightAll() {
      this.options.fightAll = true;
      let generate = document.getElementsByClassName('btn-custom')[0] as HTMLButtonElement;
      generate.click();
    }
  },

  mounted() {
    let generate = document.getElementsByClassName('btn-custom')[0] as HTMLButtonElement;

    if (this.options.fightAll)
      if (parseInt(document.getElementById('current_energy').textContent) > 0)
        setTimeout(() => {generate.click()}, 250);
      else
        this.options.fightAll = false;

    generate.addEventListener('click', () => {
      if (this.options.isAuto || this.options.fightAll) {
        let interval = setInterval(() => {
          try {
            let button = document.getElementsByClassName('swal2-confirm')[0] as HTMLButtonElement;
            if (button.textContent.indexOf('generate') !== -1 || button.textContent.indexOf('Attack') !== -1 )
              button.click()
          } catch (err) {
            clearInterval(interval)
          }
        }, 1000 + Math.floor(Math.random() * 500))
      }
    });

    //          Legacy Cycle
    // if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 2) {
    //   if (parseInt($('#current_energy').text()) > 0)
    //     setTimeout(() => {
    //       generate.click();
    //     }, 1000);
    //   else {
    //     engine.home.data.state.value = 'pending';
    //     engine.$set('home');
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>

</style>
