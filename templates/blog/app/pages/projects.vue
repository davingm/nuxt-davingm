<script setup lang="ts">
const data = await useUserProjects();

useSeoMeta({
	title: data.seo.title,
	description: data.seo.description,
});

const activeCategory = ref("All");
const searchQuery = ref("");

const filteredProjects = computed(() => {
	return (data.items ?? []).filter((project: any) => {
		const matchesCategory = activeCategory.value === "All" || project.category === activeCategory.value;
		const matchesSearch =
			!searchQuery.value.trim() ||
			project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			project.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			project.tags.some((t: string) => t.toLowerCase().includes(searchQuery.value.toLowerCase()));
		return matchesCategory && matchesSearch;
	});
});
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ data.heading }}
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        {{ data.subheading }}
      </p>
    </div>

    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="cat in data.categories"
          :key="cat"
          type="button"
          class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
          :class="[
            activeCategory === cat
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
          ]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <div class="relative min-w-[200px] sm:w-64">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="data.searchPlaceholder"
          class="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
        />
      </div>
    </div>

    <div v-if="filteredProjects.length === 0" class="py-16 text-center text-sm text-neutral-500">
      {{ data.emptyState }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiCard v-for="project in filteredProjects" :key="project.title" padding="md" class="flex flex-col justify-between group space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UiBadge variant="subtle" size="sm">{{ project.category }}</UiBadge>
              <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <div v-if="project.stars" class="flex items-center gap-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <Icon name="lucide:star" class="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{{ project.stars }}</span>
            </div>
          </div>

          <div>
            <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {{ project.title }}
            </h2>
            <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <ul class="space-y-1 text-xs text-neutral-500 dark:text-neutral-400 list-disc list-inside">
            <li v-for="(h, hIdx) in project.highlights" :key="hIdx">{{ h }}</li>
          </ul>
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in project.tags" :key="tag" class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center gap-2 pt-1">
            <UiButton v-if="project.demoUrl" :href="project.demoUrl" variant="outline" size="sm" trailing-icon="lucide:external-link" class="flex-1 text-xs">
              {{ data.actions.liveDemo }}
            </UiButton>
            <UiButton v-if="project.githubUrl" :href="project.githubUrl" variant="ghost" size="sm" icon="simple-icons:github" class="text-xs">
              {{ data.actions.source }}
            </UiButton>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>
