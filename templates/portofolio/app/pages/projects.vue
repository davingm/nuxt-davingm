<script setup lang="ts">
useSeoMeta({
	title: "Projects — Davin",
	description:
		"A curated showcase of open source developer tools, production web applications, and UI libraries.",
});

interface Project {
	title: string;
	description: string;
	category: "Open Source" | "Web Apps" | "CLI & DevTools" | "Libraries";
	tags: string[];
	stars?: number;
	demoUrl?: string;
	githubUrl?: string;
	highlights: string[];
	status: "Active" | "Maintained" | "Beta";
}

const projects: Project[] = [
	{
		title: "nuxt-davingm CLI",
		description:
			"Production-ready CLI scaffolding tool for Nuxt 4 with pre-configured VitePress design system, Biome linting, Vitest testing, and Docker CI/CD.",
		category: "CLI & DevTools",
		tags: ["Nuxt 4", "TypeScript", "Docker", "Biome", "TailwindCSS"],
		stars: 342,
		demoUrl: "https://nuxt.davingm.com",
		githubUrl: "https://github.com/davingm/nuxt-davingm",
		highlights: [
			"Zero-config SSG prerender pipeline",
			"Biome sub-millisecond linting",
			"Alpine multi-stage Docker build",
		],
		status: "Active",
	},
	{
		title: "Kestra DevOps Orchestrator",
		description:
			"Automated CI/CD workflow pipeline orchestrating automated test execution, multi-architecture Docker image builds, and zero-downtime static deployment.",
		category: "CLI & DevTools",
		tags: ["DevOps", "Docker", "GitHub Actions", "Linux", "Vitest"],
		stars: 189,
		demoUrl: "https://demo.davingm.com/devops",
		githubUrl: "https://github.com/davingm/devops-pipeline",
		highlights: [
			"GitHub Actions matrix testing",
			"Automated security auditing",
			"Lightweight Nginx production container",
		],
		status: "Active",
	},
	{
		title: "Geist Minimalist UI Primitives",
		description:
			"A pure, distraction-free Vue 3 & Nuxt 4 component library adhering to Vercel Geist design guidelines without bulky runtime dependencies.",
		category: "Libraries",
		tags: ["Vue 3", "Nuxt 4", "Geist Font", "Accessibility"],
		stars: 215,
		demoUrl: "https://geist-ui.davingm.com",
		githubUrl: "https://github.com/davingm/geist-ui-vue",
		highlights: [
			"Fully keyboard navigable",
			"Zero layout shift",
			"Light and dark mode tailored tokens",
		],
		status: "Active",
	},
	{
		title: "DevPulse Analytics Dashboard",
		description:
			"Privacy-focused web telemetry and performance analytics dashboard for indie developers and micro-SaaS founders.",
		category: "Web Apps",
		tags: ["Nuxt 4", "PostgreSQL", "Nitro", "TailwindCSS", "Redis"],
		stars: 94,
		demoUrl: "https://pulse.davingm.com",
		githubUrl: "https://github.com/davingm/devpulse",
		highlights: [
			"Real-time SSE event streaming",
			"Sub-50ms query response with Redis caching",
			"Minimalist charts",
		],
		status: "Maintained",
	},
	{
		title: "VitePress Portfolio Theme",
		description:
			"Official portfolio and documentation starter inspired by VitePress aesthetic and Vercel Geist clean typography.",
		category: "Open Source",
		tags: ["VitePress", "Vue 3", "Markdown", "SSG"],
		stars: 156,
		demoUrl: "https://vitepress.davingm.com",
		githubUrl: "https://github.com/davingm/vitepress-portfolio-theme",
		highlights: [
			"Full markdown content support",
			"Dynamic table of contents",
			"Instant client-side transitions",
		],
		status: "Active",
	},
	{
		title: "Nitro Cache Adapter for Redis",
		description:
			"High throughput memory caching driver for Nitro server engine with auto-invalidation and TTL compression.",
		category: "Libraries",
		tags: ["Nitro", "Redis", "TypeScript", "Node.js"],
		stars: 78,
		githubUrl: "https://github.com/davingm/nitro-redis-cache",
		highlights: [
			"Brotli payload compression",
			"Graceful cluster reconnects",
			"Zero external runtime bloat",
		],
		status: "Maintained",
	},
];

const categories = [
	"All",
	"CLI & DevTools",
	"Web Apps",
	"Libraries",
	"Open Source",
] as const;
const activeCategory = ref<string>("All");
const searchQuery = ref("");

const filteredProjects = computed(() => {
	return projects.filter((project) => {
		const matchesCategory =
			activeCategory.value === "All" ||
			project.category === activeCategory.value;
		const matchesSearch =
			!searchQuery.value.trim() ||
			project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
			project.description
				.toLowerCase()
				.includes(searchQuery.value.toLowerCase()) ||
			project.tags.some((t) =>
				t.toLowerCase().includes(searchQuery.value.toLowerCase()),
			);
		return matchesCategory && matchesSearch;
	});
});
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Projects & Open Source
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        A catalog of developer tools, production applications, and open-source packages I maintain.
      </p>
    </div>

    <!-- Filters & Search Bar -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200 dark:border-neutral-800">
      <!-- Category Tabs -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="cat in categories"
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

      <!-- Search Input -->
      <div class="relative min-w-[200px] sm:w-64">
        <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Filter by name or tech..."
          class="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 dark:focus:border-neutral-600 transition-colors"
        />
      </div>
    </div>

    <!-- Project List -->
    <div v-if="filteredProjects.length === 0" class="py-16 text-center text-sm text-neutral-500">
      No projects match your filter query.
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiCard
        v-for="project in filteredProjects"
        :key="project.title"
        padding="md"
        class="flex flex-col justify-between group space-y-4"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UiBadge variant="subtle" size="sm">
                {{ project.category }}
              </UiBadge>
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

          <!-- Feature Highlights -->
          <ul class="space-y-1 text-xs text-neutral-500 dark:text-neutral-400 list-disc list-inside">
            <li v-for="(h, hIdx) in project.highlights" :key="hIdx">
              {{ h }}
            </li>
          </ul>
        </div>

        <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex items-center gap-2 pt-1">
            <UiButton
              v-if="project.demoUrl"
              :href="project.demoUrl"
              variant="outline"
              size="sm"
              trailing-icon="lucide:external-link"
              class="flex-1 text-xs"
            >
              Live Demo
            </UiButton>
            <UiButton
              v-if="project.githubUrl"
              :href="project.githubUrl"
              variant="ghost"
              size="sm"
              icon="simple-icons:github"
              class="text-xs"
            >
              Source
            </UiButton>
          </div>
        </div>
      </UiCard>
    </div>
  </div>
</template>
