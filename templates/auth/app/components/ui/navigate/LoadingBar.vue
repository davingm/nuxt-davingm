<script setup lang="ts">
const { isLoading, progress } = useLoadingIndicator()
</script>

<template>
  <div
    v-if="isLoading"
    class="loading-bar"
    :style="{ width: `${progress}%` }"
  />
</template>

<style scoped>
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;

  height: 3px;

  background: #22c55e;

  transition: width 200ms ease-out;

  box-shadow:
    0 0 8px rgba(34, 197, 94, 0.6),
    0 0 4px rgba(34, 197, 94, 0.4);
}
</style>
