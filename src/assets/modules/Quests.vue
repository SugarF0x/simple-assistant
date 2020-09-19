<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Auto-repeat selected quest</span>
    </div>
    <button class="btn btn-primary" @click="selectLast">Select last incomplete</button>
  </div>
</template>

<script lang="ts">
import module from '../mixins/module.ts';

export default {
  name:   "Quests",
  mixins: [module],

  data() {
    return {
      version: 1,
      options: {
        isAuto: false,
      },
    };
  },

  methods: {
    selectLast() {
      let quests = Array.prototype.slice.call(document.getElementsByClassName('kt-widget5__title'));
      try {
        quests.reverse().forEach((entry: HTMLElement) => {
          if (!entry.children.length) {
            entry.parentElement.parentElement.parentElement.children[1].children[0].children[0].click();
            throw 'Break forEach';
          }
        });
      } catch {
      }
    },
  },

  mounted() {
    Array.prototype.slice.call(document.getElementsByClassName('btn-info')).forEach((entry: HTMLElement) => {
      entry.addEventListener('click', () => {
        if (this.options.isAuto) {
          setTimeout(() => {
            let interval = setInterval(() => {
              try {
                let button = document.getElementsByClassName('swal2-confirm')[0];
                let plug   = document.getElementsByClassName('swal2-validation-message')[0];
                if (plug.attributeStyleMap.size === 3) {
                  clearInterval(interval);
                  window.location.reload();
                } else if (button.innerText.indexOf('Repeat') !== -1 || button.innerText.indexOf('Perform') !== -1)
                  button.click();
              } catch (err) {
                clearInterval(interval);
              }
            }, 750 + Math.floor(Math.random() * 500));
          }, 500 + Math.floor(Math.random() * 500));
        }
      });
    });

    //          Legacy Cycle

    // if (engine.home.data.state.value === 'standby' && engine.home.data.stage.value === 1) {
    //   if (parseInt($('#current_quest_points').text()) > 0)
    //     setTimeout(() => {
    //       data.doLast.action();
    //     }, 1000);
    //   else {
    //     engine.home.data.state.value = 'pending';
    //     engine.$set('home');
    //   }
    // }
  },
};
</script>

<style lang="less" scoped>

</style>
