<script setup lang="ts">
import { TaskCategory } from "@/views/Tasks/store"

defineProps<{
  category: TaskCategory
}>()
</script>

<template>
  <div class="task-category" :class="category.toLowerCase()" :title="category">
    {{ category[0] }}
  </div>
</template>

<style lang="scss" scoped>
.task-category {
  border-radius: 50%;
  color: white;
  padding: .5rem;
  aspect-ratio: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.daily { background-color: saddlebrown }
.weekly { background-color: silver }
.monthly { background-color: goldenrod }
</style>
