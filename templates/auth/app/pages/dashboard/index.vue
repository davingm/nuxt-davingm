<script setup lang="ts">
definePageMeta({
    middleware: "auth",
    layout: "dashboard",
});
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div
        class="relative aspect-video overflow-hidden rounded-xl border border-[hsl(var(--inset-border))]"
      >
        <PlaceholderPattern />
      </div>
      <div
        class="relative aspect-video overflow-hidden rounded-xl border border-[hsl(var(--inset-border))]"
      >
        <PlaceholderPattern />
      </div>
      <div
        class="relative aspect-video overflow-hidden rounded-xl border border-[hsl(var(--inset-border))]"
      >
        <PlaceholderPattern />
      </div>
    </div>
    <div
      class="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-[hsl(var(--inset-border))] md:min-h-min"
    >
      <PlaceholderPattern />
    </div>
  </div>
</template>