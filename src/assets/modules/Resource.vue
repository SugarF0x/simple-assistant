<template>
  <div>

    <div class="checkbox">
      <label><input type="checkbox" v-model="options.isAuto"></label>
      <span>Automatically collect resources</span>
    </div>

    <div class="checkbox">
      <label><input type="checkbox" v-model="options.goBack"></label>
      <span>Go back after the resources have been collected</span>
    </div>

  </div>
</template>

<script lang="ts">
import module from '../mixins/module';

export default {
  name: "Resource",
  mixins: [module],

  data() {
    return {
      version: 1,
      options: {
        isAuto: true,
        goBack: true
      },
    };
  },

  methods: {
    perform() {
      function triggerMouseEvent(node: Node, eventType: string) {
        let clickEvent = document.createEvent('MouseEvents');
        clickEvent.initEvent(eventType, true, true);
        node.dispatchEvent(clickEvent);
      }

      let targetNode = document.querySelector("#action_button") as HTMLElement;
      if (targetNode && targetNode.innerText.indexOf('Press and hold') !== -1) {
        triggerMouseEvent(targetNode, "mouseover");
        setTimeout(() => {
          triggerMouseEvent(targetNode, "mousedown");
          let interval = setInterval(() => {
            if (targetNode.innerText.indexOf('Release') !== -1) {
              clearInterval(interval);
              triggerMouseEvent(targetNode, "mouseup");
              if (this.options.isAuto) {
                this.perform();
              }
            }
          }, 1000+Math.floor(Math.random()*500))
        }, 500)
        triggerMouseEvent (targetNode, "mouseup");
      } else if (this.options.goBack) {
        window.history.back();
      }
    },
    init() {
      let proceed = true;
      Array.prototype.slice.call(document.querySelectorAll('button.btn.btn-success')).forEach((e: HTMLElement) => {
        if (e.innerText.indexOf('enough') !== -1) {
          proceed = false;
        }
      })

      setTimeout(() => {
        if (proceed && this.options.isAuto) {
          this.perform();
        }
      }, 1250)
    },
  },

  mounted() {
    this.init();
  }
}
</script>

<style lang="less" scoped>

</style>
