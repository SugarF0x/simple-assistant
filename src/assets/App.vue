<template>
  <div class="kt-portlet">
    <div class="row">
      <div class="col sad">
        <Header :module="module"/>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Header from './components/Header.vue';

export default {
  name: "App",

  components: {
    Header
  },

  data() {
    return {

    }
  },

  computed: {
    module() {
      if (this.$route.matched.length) {
        return this.$route.matched[0].components.default.name
      } else {
        return 'undefined'
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
