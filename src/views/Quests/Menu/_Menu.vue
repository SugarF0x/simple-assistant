<script setup lang="ts">
import { Autofocus } from "./Autofocus"
import { Elevate } from "./Elevate"
import { Controls, Card } from "@/components"
import { getQuestListElement, markQuests } from "./helpers"
import { storeToRefs } from "pinia"
import { useQuestsMenuStore } from "@/views/Quests/Menu/store"
import { computed, watchEffect } from "vue"

const UI_TOGGLE_CLASSNAME = "sa-quests-markup-enabled"

const { shouldAutoFocusLastIncompleteQuest, shouldAutoFocusTaskQuest, shouldElevateLastIncompleteQuest, shouldElevateTaskQuests } = storeToRefs(
  useQuestsMenuStore()
)
const shouldEnableMarkup = computed(() =>
  [shouldAutoFocusLastIncompleteQuest.value, shouldAutoFocusTaskQuest.value, shouldElevateLastIncompleteQuest.value, shouldElevateTaskQuests.value].some(
    Boolean
  )
)

markQuests()
watchEffect(() => {
  const questsListElement = getQuestListElement()
  if (shouldEnableMarkup.value) questsListElement.classList.add(UI_TOGGLE_CLASSNAME)
  else questsListElement.classList.remove(UI_TOGGLE_CLASSNAME)
})
</script>

<template>
  <Controls to="main .col-span-2">
    <Card class="card">
      <div id="elevation">
        <h2>Elevation</h2>
        <!--        <Elevate />-->
      </div>
      <div id="autofocus">
        <h2>Autofocus</h2>
        <Autofocus />
      </div>
    </Card>
  </Controls>
</template>

<style lang="scss" scoped>
.card {
  & > div {
    h2 {
      font-size: 2rem;
      border-bottom: 1px solid black;
      margin-bottom: 1rem;
    }

    & + & {
      margin-top: 1rem;
    }
  }
}
</style>

<style lang="scss">
// hopefully these wont impact any other pages
.col-span-2 {
  display: flex;
  flex-flow: column;

  & > .controls {
    order: -1;
    margin-top: 0;
    margin-bottom: 1rem;
  }
}

.sa-quests-markup-enabled {
  #last-incomplete-quest {
    box-shadow: 0 0 0 1px green;
  }
  .task-quest {
    box-shadow: 0 0 0 1px goldenrod;
  }
  .incomplete-quest {
  }
}
</style>
