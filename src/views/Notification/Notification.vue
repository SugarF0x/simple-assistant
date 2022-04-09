<template>
  <Teleport to="main">
    <div id="notificationSlot" class="notificationWrapper"></div>
  </Teleport>
</template>

<style lang="scss" scoped>
.notificationSlot {
  position: fixed;
  top: 2rem;
  right: 2rem;

  display: flex;
  flex-flow: column;
  gap: 8px;

  z-index: 1000;
}
</style>
