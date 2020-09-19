<template>
  <div>
    <button class="btn btn-primary" @click="work">Work</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Job",

  data() {
    return {

    }
  },

  methods: {
    work() {
      // spend X time working or whatever

      //          Legacy Code
      // localStorage.setItem('SA_work_tmp', JSON.stringify({work:'pending'}));
      // if (contains(window.location.href, 'viewall'))
      //   $('a.btn-success')[0].click();
      // else if (engine.home.data.state.value === 'disabled')
      //   engine.job.init();
    }
  }
}
</script>

<style lang="less" scoped>

</style>
