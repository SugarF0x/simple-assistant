<template>
  <div>
    <div class="checkbox">
      <label><input type="checkbox" v-model="isAuto"></label>
      <span>Auto-repeat selected quest</span>
    </div>
    <button class="btn btn-primary" @click="selectLast">Select last incomplete</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Quests",

  data() {
    return {
      isAuto: false
    }
  },

  methods: {
    selectLast() {
      // select last incomplete quest

      //                  Legacy code:
      // try {
      //   [].forEach.call([].reverse.call($('.kt-widget5__title')), (entry: any) => {
      //     if (!entry.children.length) {
      //       entry.parentElement.parentElement.parentElement.children[1].children[0].children[0].click();
      //       throw 'Break forEach'
      //     }
      //   });
      // } catch {}
    }
  }
}
</script>

<style lang="less" scoped>

</style>
