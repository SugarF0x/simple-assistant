<script setup lang="ts">
import { Autofocus } from "./Autofocus"
import { Elevate } from "./Elevate"
import { Controls, Card } from "@/components"
import { markQuests } from "./helpers"

markQuests()
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
</style>
