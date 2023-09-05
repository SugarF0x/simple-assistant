<script setup lang="ts">
import { Button, Modal } from "@/components"
import { useFtueStore } from "./store"
import { storeToRefs } from "pinia"

const { isDismissed } = storeToRefs(useFtueStore())
</script>

<template>
  <Modal v-if="!isDismissed">
    <h1>Welcome!</h1>

    <div class="textContainer">
      <p>Looks like this is your first time using Simple Assistant or the message has updated, so here you have a quick rundown:</p>
      <ul>
        <li>All features are optional and are disabled by default</li>
        <li>Enabling certain features might require a page refresh (marked by *)</li>
        <li>
          No data is being collected. All your settings & stats are being stored locally and will not be accessible on
          another device
        </li>
        <li>
          The plugin was developed using dark theme at desktop resolution - some features may not be working as
          intended in light theme and/or small resolution, however i am doing my best to keep that working as well. Feel
          free to open an
          <a href="https://github.com/SugarF0x/simple-assistant/issues" target="_blank" class="text-indigo-600">
            issue
          </a>
          should you find a poorly themed component.
        </li>
        <li>Verification page will <b>never</b> have an assistance module</li>
      </ul>
      <p>
        If you find a bug or have a suggestion - feel free to report an
        <a href="https://github.com/SugarF0x/simple-assistant/issues" target="_blank" class="text-indigo-600">
          issue
        </a>
      </p>
      <p>
        You can open this window again by pressing <b>&lsaquo; show disclaimer &rsaquo;</b> at the top left corner
      </p>
      <h2>WARNING</h2>
      <p>
        Although Mike, the CEO of Simple MMO, is aware of this plugin as has not banned a single player yet for using it,
        myself included, the official seal of approval is yet to be acquired.
      </p>
      <p>
        If you enjoy using this plugin, feel free to write a review on its Google Chrome Store page or leave a comment on
        <a class="text-indigo-600" href="/user/view/656494">my SMMO page</a>
      </p>
      <p class="condition">By clicking "DISMISS" button below you consent to the implied risks</p>
    </div>
    <div class="actions">
      <Button autofocus @click="isDismissed = true">DISMISS</Button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  &.gloom {
    background-color: transparent;
    backdrop-filter: blur(2px);
  }
}

.textContainer {
  margin: 1rem 0;

  > * + * {
    margin-top: 1rem;
  }

  ul {
    padding-left: 1rem;
    list-style: initial;
  }

  h2 {
    text-align: center;
    font-size: 1.5em;
  }
}

.condition {
  text-align: center;
  font-style: italic;
  opacity: 0.5;
}

h1 {
  font-size: 2.25em;
}

.actions {
  display: flex;
  justify-content: center;

  > * + * {
    margin-left: 1rem;
  }
}
</style>
