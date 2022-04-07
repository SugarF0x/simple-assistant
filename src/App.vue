<script setup lang="ts">
import { Header, FTUE } from "@/views"
</script>

<template>
  <Header />
  <FTUE />
  <router-view />
</template>

<style>
/* this is here for css to generate even if empty */
.placeholder {
}
</style>
