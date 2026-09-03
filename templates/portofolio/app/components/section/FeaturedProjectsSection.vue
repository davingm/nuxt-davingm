<script setup lang="ts">
interface Project {
	title: string;
	description: string;
	tags: string[];
	stars?: number;
	demoUrl?: string;
	githubUrl?: string;
	status: "Production" | "Open Source" | "Beta";
	featured: boolean;
}

const projects: Project[] = [
	{
		title: "nuxt-davingm CLI",
		description:
			"Production-ready CLI starter generator for Nuxt 4 with pre-configured VitePress design system, Vitest, Biome, and Docker CI/CD.",
		tags: ["Nuxt 4", "TypeScript", "Docker", "Biome", "TailwindCSS"],
		stars: 342,
		demoUrl: "https://nuxt.davingm.com",
		githubUrl: "https://github.com/davingm/nuxt-davingm",
		status: "Open Source",
		featured: true,
	},
	{
		title: "Kestra DevOps Orchestrator",
		description:
			"Enterprise workflow pipeline orchestrating automated test execution, multi-arch Docker image builds, and zero-downtime deployment.",
		tags: ["DevOps", "Docker", "GitHub Actions", "Linux", "Vitest"],
		stars: 189,
		demoUrl: "https://demo.davingm.com/devops",
		githubUrl: "https://github.com/davingm/devops-pipeline",
		status: "Production",
		featured: true,
	},
	{
		title: "Geist Minimalist UI Primitives",
		description:
			"A pure, distraction-free Vue 3 & Nuxt 4 component library adhering to Vercel Geist design guidelines without heavy runtime dependencies.",
		tags: ["Vue 3", "Nuxt 4", "Geist Font", "Accessibility"],
		stars: 215,
		demoUrl: "https://geist-ui.davingm.com",
		githubUrl: "https://github.com/davingm/geist-ui-vue",
		status: "Open Source",
		featured: true,
	},
];
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Featured Projects
        </h2>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Hand-picked open source tools and production systems I've built.
        </p>
      </div>
      <NuxtLink
        to="/projects"
        class="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <span>View all</span>
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UiCard
        v-for="project in projects"
        :key="project.title"
        padding="md"
        class="flex flex-col justify-between group"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between gap-2">
            <UiBadge
              :variant="project.status === 'Open Source' ? 'brand' : 'subtle'"
              size="sm"
            >
              {{ project.status }}
            </UiBadge>

            <div v-if="project.stars" class="flex items-center gap-1 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <Icon name="lucide:star" class="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{{ project.stars }}</span>
            </div>
          </div>

          <div>
            <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
              {{ project.description }}
            </p>
          </div>
        </div>

        <div class="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tag in project.tags.slice(0, 3)"
              :key="tag"
              class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 pt-1">
            <UiButton
              v-if="project.demoUrl"
              :href="project.demoUrl"
              variant="outline"
              size="sm"
              trailing-icon="lucide:external-link"
              class="w-full text-xs"
            >
              Preview
            </UiButton>
            <UiButton
              v-if="project.githubUrl"
              :href="project.githubUrl"
              variant="ghost"
              size="sm"
              icon="simple-icons:github"
              class="text-xs"
            />
          </div>
        </div>
      </UiCard>
    </div>

    <div class="sm:hidden pt-2 text-center">
      <NuxtLink
        to="/projects"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <span>View all projects</span>
        <Icon name="lucide:arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>
  </section>
</template>
