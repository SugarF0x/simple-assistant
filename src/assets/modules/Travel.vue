<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="data.isAuto"></label>
      <span>Take steps on cooldown</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="data.attackEncounters"></label>
      <span>Attack encountered NPCs</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="data.stopOnEncounters"></label>
      <span>Pause auto-step on enemy encounter</span>
    </div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="data.slowMode"></label>
      <span>Continue walking when out of steps</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Travel",

  data() {
    return {
      data: {
        isAuto:           false,
        attackEncounters: false,
        stopOnEncounters: false,
        slowMode:         false
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
