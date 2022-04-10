<script setup lang="ts">
import { Card } from "@/components"
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
  </Card>
</template>

<style lang="scss" scoped>
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
