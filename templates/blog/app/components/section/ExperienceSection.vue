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
      <UiCard v-for="(exp, idx) in experiences" :key="idx" padding="md" class="space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {{ exp.role }}
            </h3>
            <div class="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              <span class="text-neutral-800 dark:text-neutral-200">{{ exp.company }}</span>
              <span>•</span>
              <span>{{ exp.location }}</span>
            </div>
          </div>
          <UiBadge variant="subtle" size="sm" class="self-start sm:self-center">
            {{ exp.period }}
          </UiBadge>
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
