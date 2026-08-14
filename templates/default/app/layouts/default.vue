<script setup lang="ts">
</script>

<template>
  <div id="app">
    <AppHeader />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
#app {
  width: 1400px;
  max-width: 95%;
  margin: 0 auto;
  border-inline: 1px solid var(--border);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: var(--bg);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
