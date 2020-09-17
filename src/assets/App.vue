<template>
  <div class="kt-portlet">
    <div class="row">
      <div class="col">
        <Header module="test"/>
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
      tab: window.location.pathname,
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