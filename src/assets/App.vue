<template>
  <div class="kt-portlet">
    <div class="row">
      <div class="col test">
        test
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "App",
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