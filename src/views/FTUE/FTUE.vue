<script setup lang="ts">
import { SButton } from "@/components"

import { useFtueStore } from "./store"
import { storeToRefs } from "pinia"

const ftueStore = useFtueStore()
const { isDismissed } = storeToRefs(ftueStore)
</script>

<template>
  <Teleport to="body" v-if="!isDismissed">
    <div class="wrapper">
      <div class="card">
        <h1>Welcome!</h1>
        <div class="textContainer">
          <p>Looks like this is your first time using Simple Assistant, so here you have a quick rundown:</p>
          <ul>
            <li>All features are optional and are disabled by default</li>
            <li>Enabling certain features might require a page refresh</li>
          </ul>
          <h2>WARNING</h2>
          <p>
            This plugin was developed with no association with the Simple MMO developers. The plugin developer bears no
            responsibility for the usage of this plugin and the consequences it may bring.
          </p>
          <p>
            That being said, no actions are automatic and everything still requires user input, giving users no
            advantage over other players and in no way impacting their experience, which <b>should</b> be fine.
          </p>
          <p class="condition">By clicking "DISMISS" button below you consent to the implied risks</p>
        </div>
        <div class="actions">
          <SButton autofocus @click="isDismissed = true">DISMISS</SButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.card {
  padding: 2rem;
  margin: 1rem;
  background-color: white;
  border-radius: 16px;
  max-width: 767px;
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
    font-size: 24px;
  }
}

.condition {
  text-align: center;
  font-style: italic;
  opacity: 0.5;
}

h1 {
  font-size: 36px;
}

.actions {
  display: flex;
  justify-content: center;

  > * + * {
    margin-left: 1rem;
  }
}
</style>
