<script setup lang="ts">
import { defineProps, defineEmits } from "vue"

defineProps(["modelValue"])
defineEmits(["update:modelValue"])
</script>

<template>
  <div class="wrapper">
    <label class="inputLabel" :class="$attrs.disabled && 'disabledLabel'">
      <input
        type="checkbox"
        class="labelCheckbox"
        :checked="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="labelText">
        <slot />
      </span>
    </label>
    <span class="subtitle">
      <slot name="subtitle" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-flow: column;
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

.subtitle {
  font-size: 0.8em;
  font-style: italic;
  opacity: 0.5;
  text-align: center;
}

.disabledLabel {
  cursor: unset;
  opacity: 0.4;
}
</style>
