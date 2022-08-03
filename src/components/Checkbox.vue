<script setup lang="ts">
import Subtitle from "./Subtitle.vue"
import { computed, useAttrs } from "vue"
import { Button } from "@/components"

const props = withDefaults(
  defineProps<{
    parent?: boolean
    modelValue?: boolean
    pos?: "left" | "right"
  }>(),
  {
    parent: true,
  }
)

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void
  (e: "enable-required"): void
}>()

const attrs = useAttrs()

const isDisabled = computed(() => attrs.disabled || !props.parent)
const isChecked = computed(() => (!props.parent ? false : props.modelValue))
</script>

<template>
  <div class="wrapper" :class="{ left: pos === 'left', right: pos === 'right' }">
    <label class="inputLabel" :class="{ disabledLabel: isDisabled }">
      <input
        type="checkbox"
        class="labelCheckbox"
        :checked="isChecked"
        :disabled="isDisabled"
        v-bind="$attrs"
        @input="emit('update:modelValue', $event.target.checked)"
      />
      <span class="labelText">
        <slot />
      </span>
    </label>
    <Subtitle :class="{ fade: isDisabled }" :style="{ textAlign: pos }">
      <slot name="subtitle" />
    </Subtitle>
    <div v-if="!parent" class="requires">
      <div class="requires-text">
        <slot name="requires" />
      </div>
      <Button class="requires-enable" @click="emit('enable-required')"> Enable </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  &.left {
    align-items: flex-start;
  }
  &.right {
    align-items: flex-end;
  }

  & + & {
    margin-top: 0.25rem;
  }

  .dark & {
    color: white;
  }
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

.requires {
  display: flex;
  align-items: center;

  &-text {
    color: darkred;
    font-size: 0.8rem;

    &:hover {
      color: red;
    }
  }

  &-enable {
    padding: 0 4px;
    font-size: 0.75rem;
    margin-left: 0.5rem;
  }
}
</style>
