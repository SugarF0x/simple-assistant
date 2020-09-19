<template>
  <div>
    <h4 style="color:red;">!WARNING! AFK CYCLE LOOP MAY CAUSE SUSPICION AND LEAD TO YOUR ACCOUNT BEING LOCKED</h4>
    <h4>A cycle is a completion of all available tasks in succession, namely:</h4>
    <ul>
      <li>Spend all quest points on latest incomplete quest</li>
      <li>Spend all energy on arena</li>
      <li>Take all steps</li>
      <li>Go to work for 50 minutes</li>
    </ul>
    <div class="checkbox">
      <label><input type="checkbox" v-model="isAuto"></label>
      <span>Auto-repeat cycle (AFK grind loop)</span>
    </div>
    <div>
      <button class="btn btn-primary">Start cycle</button>
      <button class="btn btn-primary">Break cycle</button>
    </div>
    <div><span class="display">Stage:</span> {{ stage }}</div>
    <div><span class="display">State:</span> {{ state }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",

  data() {
    return {
      isAuto: false,
      stage: 0,
      state: 'disabled'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
