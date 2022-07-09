<script setup lang="ts">
import { Card } from "@/components"

defineEmits<{
  (e: "dismiss"): void
}>()
</script>

<template>
  <Card shadow outline class="notification">
    <div class="background">
      <h2 v-if="$slots.title" class="titleWrapper">
        <slot name="title"></slot>
      </h2>
      <div v-if="$slots.text" class="textWrapper">
        <slot name="text"></slot>
      </div>
      <div v-if="$slots.actions" class="actionsWrapper">
        <slot name="actions"></slot>
      </div>
    </div>

    <button class="dismissButton" @click="$emit('dismiss')">X</button>
  </Card>
</template>

<style lang="scss" scoped>
.notification {
  position: relative;
  background-color: transparent;
  padding: 0;
  max-width: min(80vw, 365px);
}

.background {
  padding: 1rem;
  background-color: white;
  -webkit-mask: radial-gradient(circle 17px at top 0+6px right 0+6px, #0000 98%, blue);
  border-radius: 16px;

  .dark & {
    background-color: black;
  }
}

.dismissButton {
  position: absolute;
  top: -6px;
  right: -6px;
  border-radius: 50%;
  color: black;
  background-color: white;
  vertical-align: center;
  text-align: center;
  width: 24px;
  height: 24px;

  &:hover {
    background-color: lightgray;
  }

  &:active {
    background-color: darkgray;
  }

  -webkit-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);
  box-shadow: 0 0 16px 0 rgba(50, 50, 50, 0.75);

  .dark & {
    background-color: black;
    color: white;
  }
}

.titleWrapper {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.textWrapper {
  display: flex;
  flex-flow: column;
  gap: 1rem;
  text-align: center;
}

.actionsWrapper {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
</style>
