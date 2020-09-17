<template>
  <div>
    <h2>
      <span>
        Simple Assistant v{{ version }}
      </span>
      <span class="module">
        {{ module }}
      </span>
    </h2>
  </div>
</template>

<script lang="ts">
export default {
  name: "Header",
  data() {
    return {
      version: chrome.runtime.getManifest().version_name
    }
  },
  props: [
      'module'
  ]
}
</script>

<style lang="less" scoped>
  h2 {
    display: flex;
    justify-content: space-between;
  }
  .module {
    opacity: .5;
    text-transform: uppercase;
  }
</style>