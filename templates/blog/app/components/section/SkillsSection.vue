<script setup lang="ts">
const overview = await useUserOverview();
const { skills } = overview;
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ skills.heading }}
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        {{ skills.subheading }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UiCard v-for="cat in skills.categories" :key="cat.title" padding="md" class="flex flex-col justify-between">
        <div class="space-y-3">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              <Icon :name="cat.icon" class="w-4 h-4" />
            </div>
            <h3 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {{ cat.title }}
            </h3>
          </div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {{ cat.description }}
          </p>
        </div>

        <div class="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-2 gap-2">
          <div v-for="skill in cat.skills" :key="skill.name" class="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300 py-1">
            <Icon
              :name="skill.icon"
              class="w-3.5 h-3.5 shrink-0"
              :class="skill.highlight ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-400'"
            />
            <span :class="skill.highlight && 'font-semibold text-neutral-900 dark:text-neutral-100'">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>
