<script setup lang="ts">
import { Card } from "@/components"

defineEmits<{
  (e: "dismiss"): void
}>()
</script>

<template>
  <Card>
    <h2 v-if="$slots.title" class="titleWrapper">
      <slot name="title"></slot>
    </h2>
    <div v-if="$slots.text" class="textWrapper">
      <slot name="text"></slot>
    </div>
    <div v-if="$slots.actions" class="actionsWrapper">
      <slot name="actions"></slot>
    </div>
    <button class="dismissButton" @click="$emit('dismiss')">X</button>
  </Card>
</template>

<style lang="scss" scoped>
.dismissButton {
  position: absolute;
  top: -6px;
  right: -6px;
  border-radius: 50%;
  color: black;
  background-color: white;
  outline: 2px solid black;
  vertical-align: center;
  text-align: center;
  width: 24px;
  height: 24px;

  &:hover {
    background-color: lightgray;
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
