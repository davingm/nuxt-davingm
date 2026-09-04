<script setup lang="ts">
const overview = await useUserOverview();
const { faq } = overview;
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ faq.heading }}
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        {{ faq.subheading }}
      </p>
    </div>
    <UiAccordion :items="faq.items" :default-open="0" />
  </section>
</template>
