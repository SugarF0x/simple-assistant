<template>
  <div class="kt-portlet">
    <div class="row">
      <div class="col test">
        test
      </div>
      <Home/>
    </div>
  </div>
</template>

<script lang="ts">
import Home from './modules/Home.vue';

export default {
  name: "App",
  components: {
    Home
  },
  data() {
    return {
      tab: window.location.pathname,
      paths: {
        module: 'Home',

      }
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