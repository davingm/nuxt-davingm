<script setup lang="ts">
useSeoMeta({
	title: "Blog & Technical Articles — Davin",
	description:
		"Articles on Nuxt 4, full-stack architecture, DevOps automation, and minimalist design systems.",
});

const staticArticles = [
	{
		path: "/blog/building-modern-cli-templates",
		title: "Architecting Developer-First Nuxt Starter Templates",
		description:
			"How to build modular, production-ready Nuxt 4 templates with VitePress design principles and built-in DevOps.",
		date: "Aug 20, 2026",
		readTime: "5 min read",
		tags: ["Nuxt", "CLI", "Architecture", "TypeScript"],
	},
	{
		path: "/blog/mastering-nuxt-4-and-ssg",
		title: "Deep Dive into Nuxt 4 Architecture and Zero-Config SSG",
		description:
			"Optimizing static generation with Nitro engine, prerendering pipelines, and modern composable architecture.",
		date: "Aug 14, 2026",
		readTime: "7 min read",
		tags: ["Nuxt 4", "SSG", "Performance", "Nitro"],
	},
	{
		path: "/blog/streamlining-devops-with-docker-and-actions",
		title: "Minimalist Docker & CI/CD Pipelines for Modern Web Apps",
		description:
			"Achieving ultra-fast builds and bulletproof reliability with GitHub Actions, Vitest, and lightweight Nginx containers.",
		date: "Jul 28, 2026",
		readTime: "6 min read",
		tags: ["DevOps", "Docker", "CI/CD", "GitHub Actions"],
	},
	{
		path: "/blog/the-art-of-minimalist-ui-design",
		title:
			"Geist Principles: Crafting Clean, Distraction-Free Developer Portfolios",
		description:
			"Why less is more: using intentional typography, crisp borders, and dark mode restraint to let your work shine.",
		date: "Jul 10, 2026",
		readTime: "4 min read",
		tags: ["Design", "Geist", "CSS", "VitePress"],
	},
];

const { data: articles } = await useAsyncData("all-blog-articles", async () => {
	try {
		if (typeof queryCollection === "function") {
			const items = await queryCollection("blog").order("date", "DESC").all();
			if (items && items.length > 0) {
				return items.map((item: any) => ({
					path: item.path || `/blog/${item.stem?.replace("blog/", "")}`,
					title: item.title,
					description: item.description,
					date: item.date,
					readTime: item.readTime || "5 min read",
					tags: item.tags || [],
				}));
			}
		}
	} catch (e) {
		// fallback
	}
	return staticArticles;
});

const activeTag = ref<string>("All");
const searchQuery = ref("");

const allTags = computed(() => {
	const list = articles.value || staticArticles;
	const set = new Set<string>();
	list.forEach((a) => a.tags?.forEach((t: string) => set.add(t)));
	return ["All", ...Array.from(set)];
});

const filteredArticles = computed(() => {
	const list = articles.value || staticArticles;
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
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
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
    <div v-if="filteredArticles.length === 0" class="py-16 text-center text-sm text-neutral-500">
      No articles found matching your criteria.
    </div>

    <div v-else class="space-y-4">
      <NuxtLink
        v-for="article in filteredArticles"
        :key="article.path"
        :to="article.path"
        class="group block p-5 sm:p-6 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#181818] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-150 shadow-xs"
      >
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
          <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {{ article.title }}
          </h2>
          <div class="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
            <span>{{ article.date }}</span>
            <span>•</span>
            <span>{{ article.readTime }}</span>
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
      </NuxtLink>
    </div>
  </div>
</template>
