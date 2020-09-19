<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="isAuto"></label>
      <span>Auto-accept enemy generation prompts</span>
    </div>
    <button class="btn btn-primary" @click="fightAll">Auto fight</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Arena",

  data() {
    return {
      isAuto: false
    }
  },

  methods: {
    fightAll() {
      // spend all power on fighting at arena

      //          Legacy code
      // localStorage.setItem('SA_arena_tmp', JSON.stringify({fightAll:true}));
      // $('.btn-custom')[0].click();
    }
  }
}
</script>

<style lang="less" scoped>

</style>
