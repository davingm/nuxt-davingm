<script setup lang="ts">
const overview = await useUserOverview();
const { testimonials } = overview;
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ testimonials.heading }}
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        {{ testimonials.subheading }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiCard v-for="(t, idx) in testimonials.items" :key="idx" padding="md" class="flex flex-col justify-between space-y-4">
        <blockquote class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
          "{{ t.quote }}"
        </blockquote>
        <div class="flex items-center gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
          <img :src="t.avatar" :alt="t.author" class="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700" loading="lazy" />
          <div>
            <div class="text-xs font-semibold text-neutral-900 dark:text-neutral-100">{{ t.author }}</div>
            <div class="text-[11px] text-neutral-500 dark:text-neutral-400">
              {{ t.role }} · <span class="text-neutral-700 dark:text-neutral-300">{{ t.company }}</span>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>
