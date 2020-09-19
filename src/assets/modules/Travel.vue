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
export default {
  name: "Travel",

  data() {
    return {
      version: 1,
      options: {
        isAuto:           false,
        attackEncounters: false,
        stopOnEncounters: false,
        slowMode:         false
      }
    };
  },

  watch: {
    options: {
      handler() {
        this.set();
      },
      deep: true
    }
  },

  methods: {
    get() {
      let storage = JSON.parse(localStorage.getItem(`SA_${ this.$options.name }`));
      if (!storage || storage.version !== this.version) {
        this.set();
      } else {
        this.options = storage.options;
      }
    },

    set() {
      let data = {
        version: this.version,
        options: this.options,
      };
      localStorage.setItem(`SA_${ this.$options.name }`, JSON.stringify(data));
    },
  },

  created() {
    this.get();
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
        } else clearInterval(interval);

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
    }, 1100+Math.floor(Math.random()*500));
  },
};
</script>

<style lang="less" scoped>

</style>
