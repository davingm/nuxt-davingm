<script setup lang="ts">
interface Experience {
	role: string;
	company: string;
	location: string;
	period: string;
	description: string;
	achievements: string[];
	skills: string[];
}

const experiences: Experience[] = [
	{
		role: "Lead Frontend Engineer & Creator",
		company: "Nuxt Davingm Ecosystem",
		location: "Remote",
		period: "2024 — Present",
		description:
			"Spearheading open-source developer tooling, starter templates, and CLI ecosystem for modern Nuxt applications.",
		achievements: [
			"Designed high-performance SSG & SSR starters downloaded by thousands of developers worldwide.",
			"Configured automated CI/CD DevOps workflows, Docker multi-stage builds, and Biome linting pipelines.",
			"Authored comprehensive documentation and guides on VitePress and Nuxt 4 best practices.",
		],
		skills: [
			"Nuxt 4",
			"Vue 3",
			"TypeScript",
			"Docker",
			"GitHub Actions",
			"Biome",
		],
	},
	{
		role: "Senior Full-Stack Developer",
		company: "Vortex Digital Labs",
		location: "Jakarta / Hybrid",
		period: "2022 — 2024",
		description:
			"Engineered high-concurrency web applications, microservices, and internal dashboards.",
		achievements: [
			"Reduced client load times by 45% using hybrid SSG/ISR caching with Nitro engine.",
			"Implemented automated integration testing suite with Vitest and Playwright.",
			"Mentored 6 junior engineers and standardized frontend component library across 4 teams.",
		],
		skills: [
			"Vue.js",
			"Node.js",
			"PostgreSQL",
			"Redis",
			"TailwindCSS",
			"Vitest",
		],
	},
	{
		role: "Frontend Developer",
		company: "PixelCraft Studio",
		location: "Bandung",
		period: "2020 — 2022",
		description:
			"Built bespoke web applications, e-commerce platforms, and interactive client portals.",
		achievements: [
			"Delivered 20+ responsive web projects on time with 100% client satisfaction score.",
			"Pioneered dark mode design systems and accessible ARIA compliant components.",
		],
		skills: ["JavaScript", "Vue.js", "SCSS", "REST APIs", "Webpack/Vite"],
	},
];
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

    <!-- Timeline List -->
    <div class="space-y-4">
      <UiCard
        v-for="(exp, idx) in experiences"
        :key="idx"
        padding="md"
        class="space-y-4"
      >
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

        <!-- Bullet Highlights -->
        <ul class="space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400 list-disc list-inside">
          <li v-for="(ach, aIdx) in exp.achievements" :key="aIdx" class="leading-relaxed">
            {{ ach }}
          </li>
        </ul>

        <!-- Tech Stack Tags -->
        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
          <UiBadge
            v-for="s in exp.skills"
            :key="s"
            variant="outline"
            size="sm"
            class="text-[11px]"
          >
            {{ s }}
          </UiBadge>
        </div>
      </UiCard>
    </div>
  </section>
</template>
