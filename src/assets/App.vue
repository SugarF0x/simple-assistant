<template>
  <div class="kt-portlet">
    <div class="row">
      <div class="col sad">
        <Header :module="module"/>
        <Home></Home>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';

import Home   from './modules/Home.vue';
import Travel from './modules/Travel.vue';
import Quests from './modules/Quests.vue';
import Arena  from './modules/Arena.vue';
import Battle from './modules/Battle.vue';
import Job    from './modules/Job.vue';

import Gamble5050 from './modules/Gamble5050.vue';

export default {
  name: "App",

  components: {
    Header,

    Home,
    Travel,
    Quests,
    Arena,
    Battle,
    Job,
    Gamble5050
  },

  data() {
    return {
      tab: window.location.pathname,
      /* TODO: have this be global stats
          and pass them as props to components
          namely
            * tab
            * isWorking
            * isAlive
            * questPoints
            * energy
            * steps
       */
    }
  },

  computed: {
    module() {
      return 'testing';
    }
  },

  mounted() {

  }
}
</script>

<style lang="less" scoped>
  .col {
    padding: 1rem;
  }
</style>

<style lang="less">
  .sad {
    > * > * {
      margin: .3rem 0;
    }
    label {
      padding: 0;
      margin: 0 .5rem 0 0;
    }
    .display {
      font-size: 1.2em;
      font-weight: bold;
    }
    .checkbox, label {
      display: flex;
      align-items: center;
    }
  }
</style>