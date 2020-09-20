<template>
  <div>
    <button class="btn btn-primary" @click="work" :disabled="isWorking">Work</button>
  </div>
</template>

<script lang="ts">
import module from '../mixins/module';

export default {
  name: "Job",
  mixins: [module],

  data() {
    return {
      isWorking: document.querySelectorAll('.kt-portlet.kt-portlet--fit.kt-portlet--head-lg.kt-portlet--head-overlay').length > 0
    }
  },

  methods: {
    work() {
      localStorage.setItem('SA_Job_temp', JSON.stringify({work:'pending'}));
      if (window.location.href.indexOf('viewall') !== -1) {
        let buttons = Array.prototype.slice.call(document.querySelectorAll('a.btn-success'));
        buttons.forEach((entry: HTMLElement) => {
          if (entry.textContent.indexOf('your job') !== -1) entry.click();
        });
      } else {
        this.init();
      }

      //          Legacy Cycle
      // else if (engine.home.data.state.value === 'disabled')
      //   engine.job.init();
    },
    init() {
      let temp = JSON.parse(localStorage.getItem('SA_Job_temp')) || {work: false};

      //          Legacy Cycle
      // if (engine.home.data.stage.value === 4
      //     && engine.home.data.state.value === 'standby'
      //     && !temp.work) {
      //   engine.job.data.work.action();
      // }

      if (temp.work === 'pending') {
        setTimeout(() => {
          let buttons = Array.prototype.slice.call(document.querySelectorAll('a.btn-success'));
          buttons.forEach((entry: HTMLElement) => {
            if (entry.textContent.indexOf('Start') !== -1) entry.click();
          });
          localStorage.setItem('SA_Job_temp', JSON.stringify({work:'working'}));
          setTimeout(() => {
            let input = document.querySelectorAll('input[type=range]')[0] as HTMLInputElement;
            input.value = '5';
            let button = document.getElementsByClassName('swal2-confirm')[0] as HTMLButtonElement;
            button.click()
          },500)
        }, 500)
      } else if (temp.work === 'working') {
        localStorage.removeItem('SA_Job_temp');
        let time = 50;
        let textPill = document.getElementsByClassName('btn-pill')[0];
        textPill.textContent = 'Simple Assistant is currently working for you';
        setInterval(() => {
          let timer = document.getElementsByClassName('kt-portlet__foot')[0].children[1];
          timer.textContent = time.toString();
          time--;
        }, 1000 * 60);

        //          Legacy Cycle
        // setTimeout(() => {
        //   engine.home.data.state.value = 'finished';
        //   engine.$set('home');
        // }, 1000 * 60 * 51)
      }
    }
  },

  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>

</style>
