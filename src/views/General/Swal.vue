<script setup lang="ts">
import { ref, watch } from "vue"
import { useSwalObserver } from "@/hooks"
import { Checkbox, Controls } from "@/components"
import { useGeneralStore } from "@/views/General/store"
import { storeToRefs } from "pinia"

const generalStore = useGeneralStore()
const { shouldDisableSwalGloom } = storeToRefs(generalStore)

const shouldTeleport = ref(false)
useSwalObserver({
  onOpen: () => {
    shouldTeleport.value = true
  },
  onClose: () => {
    shouldTeleport.value = false
  },
})

watch(
  shouldDisableSwalGloom,
  (val) => {
    if (val) document.body.classList.add("swal-gloom-override")
    else document.body.classList.remove("swal-gloom-override")
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <Controls v-if="shouldTeleport" to=".swal2-content">
    <Checkbox v-model="shouldDisableSwalGloom">
      <template #default> Replace background gloom with blur </template>
      <template #subtitle> Save yourself from epilepsy </template>
    </Checkbox>
  </Controls>
</template>

<style lang="scss">
.swal-gloom-override {
  .swal2-container.swal2-shown {
    background-color: transparent !important;
    backdrop-filter: blur(2px);
  }

  div[aria-describedby="swal2-content"] {
    box-shadow: 0 0 16px 0 black;
  }
}
</style>
