<script setup lang="ts">
// Default layout
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#121212] text-neutral-900 dark:text-neutral-100 transition-colors">
    <AppHeader />
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
