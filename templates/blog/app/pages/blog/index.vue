<script setup lang="ts">
useSeoMeta({
	title: "Blog & Technical Articles — Davin",
	description:
		"Articles on Nuxt 4, Frontend architecture, DevOps automation, and minimalist design systems.",
});

const { data: articles } = await useAsyncData("all-blog-articles", () =>
	queryCollection("blog").order("date", "DESC").all(),
);

const activeTag = ref<string>("All");
const searchQuery = ref("");

const allTags = computed(() => {
	const list = articles.value ?? [];
	const set = new Set<string>();
	list.forEach((a) => a.tags?.forEach((t: string) => set.add(t)));
	return ["All", ...Array.from(set)];
});

const filteredArticles = computed(() => {
	const list = articles.value ?? [];
	return list.filter((article) => {
		const matchesTag =
			activeTag.value === "All" || article.tags?.includes(activeTag.value);
		const matchesSearch =
			!searchQuery.value.trim() ||
			article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			article.description
				.toLowerCase()
				.includes(searchQuery.value.toLowerCase());
		return matchesTag && matchesSearch;
	});
});

const isEmpty = computed(() => (articles.value ?? []).length === 0);
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Blog & Articles
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        Thoughts, architectural case studies, and engineering breakdowns on modern web development.
      </p>
    </div>

    <!-- Filter Bar -->
    <div v-if="!isEmpty" class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
      <!-- Tag Pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="tag in allTags"
          :key="tag"
          type="button"
          class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
          :class="[
            activeTag === tag
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
          ]"
          @click="activeTag = tag"
        >
          {{ tag === 'All' ? 'All Posts' : `#${tag}` }}
        </button>
      </div>

      <!-- Search Input -->
      <div class="relative min-w-[200px] sm:w-64">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search articles..."
          class="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
        />
      </div>
    </div>

    <!-- Articles List -->
    <div v-if="isEmpty" class="py-20 text-center space-y-3">
      <Icon name="lucide:file-text" class="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-600" />
      <p class="text-base font-medium text-neutral-900 dark:text-neutral-100">No articles yet</p>
      <p class="text-sm text-neutral-500 dark:text-neutral-400">
        Create your first post in <code class="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">content/blog/</code>
      </p>
    </div>

    <div v-else-if="filteredArticles.length === 0" class="py-16 text-center text-sm text-neutral-500">
      No articles found matching your criteria.
    </div>

    <div v-else class="space-y-4">
      <NuxtLink
        v-for="article in filteredArticles"
        :key="article.path"
        :to="article.path"
        class="group block rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#181818] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-150 shadow-xs overflow-hidden"
      >
        <!-- Cover image -->
        <div v-if="article.image" class="w-full h-44 sm:h-52 overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <div class="p-5 sm:p-6">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
            <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {{ article.title }}
            </h2>
            <div class="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
              <span>{{ article.date }}</span>
              <span>•</span>
              <span>{{ article.readTime || '5 min read' }}</span>
            </div>
          </div>

          <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {{ article.description }}
          </p>

          <div class="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/60 text-xs">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                #{{ tag }}
              </span>
            </div>

            <span class="inline-flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200 group-hover:translate-x-0.5 transition-transform text-xs">
              <span>Read full article</span>
              <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
