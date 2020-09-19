<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="isAuto"></label>
      <span>Attack enemy on cooldown</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="goBack"></label>
      <span>Go back when enemy is defeated</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Battle",

  data() {
    return {
      isAuto: false,
      goBack: false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
