<script setup lang="ts">
// Fallback sample posts if content query is loading or during SSG prerender
const staticPosts = [
	{
		path: "/blog/building-modern-cli-templates",
		title: "Architecting Developer-First Nuxt Starter Templates",
		description:
			"How to build modular, production-ready Nuxt 4 templates with VitePress design principles and built-in DevOps.",
		date: "Aug 20, 2026",
		readTime: "5 min read",
		tags: ["Nuxt", "CLI", "Architecture"],
	},
	{
		path: "/blog/mastering-nuxt-4-and-ssg",
		title: "Deep Dive into Nuxt 4 Architecture and Zero-Config SSG",
		description:
			"Optimizing static generation with Nitro engine, prerendering pipelines, and modern composable architecture.",
		date: "Aug 14, 2026",
		readTime: "7 min read",
		tags: ["Nuxt 4", "SSG", "Nitro"],
	},
	{
		path: "/blog/streamlining-devops-with-docker-and-actions",
		title: "Minimalist Docker & CI/CD Pipelines for Modern Web Apps",
		description:
			"Achieving ultra-fast builds and bulletproof reliability with GitHub Actions, Vitest, and lightweight Nginx containers.",
		date: "Jul 28, 2026",
		readTime: "6 min read",
		tags: ["DevOps", "Docker", "CI/CD"],
	},
];

// Query from Nuxt Content if available
const { data: posts } = await useAsyncData("latest-blog-posts", async () => {
	try {
		if (typeof queryCollection === "function") {
			const items = await queryCollection("blog")
				.order("date", "DESC")
				.limit(3)
				.all();
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
	return staticPosts;
});

const displayPosts = computed(() => posts.value || staticPosts);
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Latest Writing & Articles
        </h2>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Deep dives into software architecture, Nuxt ecosystems, and engineering workflows.
        </p>
      </div>
      <NuxtLink
        to="/blog"
        class="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <span>All articles</span>
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>

    <!-- Article Cards -->
    <div class="space-y-3">
      <NuxtLink
        v-for="post in displayPosts"
        :key="post.path"
        :to="post.path"
        class="group block p-4 sm:p-5 rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#181818] hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-150 shadow-xs"
      >
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
          <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {{ post.title }}
          </h3>
          <div class="flex items-center gap-2 text-xs font-mono text-neutral-400 dark:text-neutral-500 shrink-0">
            <span>{{ post.date }}</span>
            <span>•</span>
            <span>{{ post.readTime }}</span>
          </div>
        </div>

        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {{ post.description }}
        </p>

        <div class="flex items-center justify-between pt-3 mt-3 border-t border-neutral-100 dark:border-neutral-800/60 text-xs">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              #{{ tag }}
            </span>
          </div>

          <span class="inline-flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200 group-hover:translate-x-0.5 transition-transform text-xs">
            <span>Read post</span>
            <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
          </span>
        </div>
      </NuxtLink>
    </div>

    <div class="sm:hidden pt-2 text-center">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <span>View all articles</span>
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>
  </section>
</template>
