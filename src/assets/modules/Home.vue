<template>
  <div>
    <h4>AFK Grind cycle is suspended until further notice</h4>
    <p>
      Since there is still no failsafe protection, the chances are - you get killed at some point
      and end up sitting there infinitely spamming single unavailable action thus drawing unwanted attention.
      For that reason I've disabled AFK Grind Cycle altogether until this issue if resolved.
      A couple of people were already punished for what most likely is this very issue
      and I dont want you to join their ranks.
    </p>
    <p>
      However, if you are feeling brave, you are free to hop onto
      <a href="https://github.com/SugarF0x/simple-assistant">GitHub</a>
      and get yourself <u>Simple Assistant v1.5.2</u> or older, where Cycle is still enabled.
    </p>
    <p>
      <b>You have been warned.</b>
    </p>
<!--    <h4 style="color:red;">!WARNING! AFK CYCLE LOOP MAY CAUSE SUSPICION AND LEAD TO YOUR ACCOUNT BEING LOCKED</h4>-->
<!--    <h4>A cycle is a completion of all available tasks in succession, namely:</h4>-->
<!--    <ul>-->
<!--      <li>Spend all quest points on latest incomplete quest</li>-->
<!--      <li>Spend all energy on arena</li>-->
<!--      <li>Take all steps</li>-->
<!--      <li>Go to work for 50 minutes</li>-->
<!--    </ul>-->
<!--    <div class="checkbox">-->
<!--      <label><input type="checkbox" v-model="isAuto"></label>-->
<!--      <span>Auto-repeat cycle (AFK grind loop)</span>-->
<!--    </div>-->
<!--    <div>-->
<!--      <button class="btn btn-primary">Start cycle</button>-->
<!--      <button class="btn btn-primary">Break cycle</button>-->
<!--    </div>-->
<!--    <div><span class="display">Stage:</span> {{ stage }}</div>-->
<!--    <div><span class="display">State:</span> {{ state }}</div>-->
  </div>
</template>

<script lang="ts">
// TODO: revise cycle functionality when fail-safes are in place
// TODO: change Home cycle list to checkboxes thus making cycle stages optional
// TODO: force default settings during cycle

import module from '../mixins/module';

export default {
  name: "Home",
  mixins: [module],

  // data() {
  //   return {
  //     version: 1,
  //     options: {
  //       isAuto: false,
  //       stage: 0,
  //       state: 'disabled'
  //     }
  //   }
  // },

  mounted() {
    //          Legacy Cycle
    // engine.$get('home');
    // let data = engine.home.data;
    //
    // let modules = [
    //   {
    //     page: 'home',
    //     href: '/'
    //   },
    //   {
    //     page: 'quests',
    //     href: '/quests/viewall'
    //   },
    //   {
    //     page: 'arena',
    //     href: '/battlearena'
    //   },
    //   {
    //     page: 'travel',
    //     href: '/travel'
    //   },
    //   {
    //     page: 'job',
    //     href: '/jobs/viewall'
    //   }
    // ];
    //
    // if (data.isAuto.value) {
    //   console.log('Proceeding with step in 3 seconds...');
    //   setTimeout(() => {
    //     switcher()
    //   }, 3000)
    // } else {
    //   switcher()
    // }
    //
    // /**
    //  * disabled - cycle not initiated
    //  * pending  - awaiting page change
    //  * standby  - on needed page, awaiting state change
    //  * finished - break cycle or repeat if isAuto
    //  */
    // function switcher(): void {
    //   switch (data.state.value) {
    //
    //       // TODO: fix this bit here as even when disabled it still proceedes given isAuto is true
    //     case 'disabled':
    //       if (data.isAuto.value) {
    //         data.state.value = 'pending';
    //         engine.$set('home');
    //         window.location.reload();
    //       }
    //       break;
    //     case 'pending':
    //       data.stage.value < 5 ? data.stage.value++ : data.stage.value = 1;
    //       data.state.value = 'standby';
    //       engine.$set('home');
    //       window.location.href=modules[data.stage.value].href;
    //       break;
    //     case 'standby':
    //       let interval = setInterval(() => {
    //         try {
    //           if (data.state.value !== 'standby') {
    //             window.location.reload();
    //           }
    //         } catch (err) {
    //           clearInterval(interval)
    //         }
    //       },1000);
    //       break;
    //     case 'finished':
    //       data.stage.value = 0;
    //       if (data.isAuto.value)
    //         data.state.value = 'pending';
    //       else
    //         data.state.value = 'disabled';
    //       engine.$set('home');
    //       window.location.href = '/';
    //       break;
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>

</style>
