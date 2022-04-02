<script setup lang="ts">
import { defineProps, defineEmits } from "vue"

defineProps(["modelValue"])
defineEmits(["update:modelValue"])
</script>

<template>
  <div class="wrapper">
    <label class="inputLabel">
      <input
        type="checkbox"
        class="labelCheckbox"
        :checked="modelValue"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="labelText">
        <slot />
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputLabel {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
}

.labelText {
  margin-left: 0.35rem;
}

.labelCheckbox {
  cursor: pointer;
}
</style>
