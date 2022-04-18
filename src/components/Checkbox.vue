<script setup lang="ts">
import Subtitle from "./Subtitle.vue"

import { computed, useAttrs } from "vue"

const props = withDefaults(
  defineProps<{
    parent?: boolean
    modelValue?: boolean
  }>(),
  {
    parent: true,
  }
)

defineEmits<{
  (e: "update:modelValue"): boolean
}>()

const attrs = useAttrs()

const isDisabled = computed(() => attrs.disabled || !props.parent)
const isChecked = computed(() => (!props.parent ? false : props.modelValue))
</script>

<template>
  <div class="wrapper">
    <label class="inputLabel" :class="{ disabledLabel: isDisabled }">
      <input
        type="checkbox"
        class="labelCheckbox"
        :checked="isChecked"
        :disabled="isDisabled"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.checked)"
      />
      <span class="labelText">
        <slot />
      </span>
    </label>
    <Subtitle :class="{ fade: isDisabled }">
      <slot name="subtitle" />
    </Subtitle>
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

.disabledLabel {
  cursor: unset;
  pointer-events: none;
}

.fade,
.disabledLabel {
  opacity: 0.4;
}
</style>
