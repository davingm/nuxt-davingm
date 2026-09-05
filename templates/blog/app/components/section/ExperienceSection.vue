<script setup lang="ts">
const experiences = await useUserExperience();
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Work Experience & Career
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        A timeline of my professional journey in software engineering and open source.
      </p>
    </div>

    <div class="space-y-4">
      <UiCard v-for="(exp, idx) in experiences" :key="idx" padding="md" class="relative space-y-4">

        <!-- Logo: absolute, tidak mempengaruhi flow konten -->
        <img
          v-if="exp.logo"
          :src="exp.logo"
          :alt="exp.company"
          class="absolute top-4 right-4 w-20 h-20 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-700 opacity-90"
        />

        <!-- Header: pr-24 supaya teks tidak nabrak logo -->
        <div class="pr-24">
          <UiBadge variant="subtle" size="sm" class="mb-2">
            {{ exp.period }}
          </UiBadge>
          <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {{ exp.role }}
          </h3>
          <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
            <span class="text-neutral-800 dark:text-neutral-200">{{ exp.company }}</span>
            <span>•</span>
            <span>{{ exp.location }}</span>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          {{ exp.description }}
        </p>

        <ul class="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 list-disc list-inside">
          <li v-for="(ach, aIdx) in exp.achievements" :key="aIdx" class="leading-relaxed">
            {{ ach }}
          </li>
        </ul>

        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
          <UiBadge v-for="s in exp.skills" :key="s" variant="outline" size="sm" class="text-[11px]">
            {{ s }}
          </UiBadge>
        </div>
      </UiCard>
    </div>
  </section>
</template>
