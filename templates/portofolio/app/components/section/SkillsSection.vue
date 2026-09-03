<script setup lang="ts">
interface SkillCategory {
	title: string;
	icon: string;
	description: string;
	skills: {
		name: string;
		icon: string;
		highlight?: boolean;
	}[];
}

const categories: SkillCategory[] = [
	{
		title: "Frontend & UI",
		icon: "lucide:layout",
		description: "Modern reactive interfaces and minimalist design systems",
		skills: [
			{ name: "Nuxt 4", icon: "simple-icons:nuxtdotjs", highlight: true },
			{ name: "Vue 3", icon: "simple-icons:vuedotjs", highlight: true },
			{ name: "TypeScript", icon: "simple-icons:typescript", highlight: true },
			{ name: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
			{ name: "Vite", icon: "simple-icons:vite" },
			{ name: "HTML5/CSS3", icon: "simple-icons:html5" },
		],
	},
	{
		title: "Backend & Runtime",
		icon: "lucide:server",
		description: "High-performance microservices and REST/GraphQL APIs",
		skills: [
			{ name: "Nitro Engine", icon: "lucide:zap", highlight: true },
			{ name: "Node.js", icon: "simple-icons:nodedotjs" },
			{ name: "PostgreSQL", icon: "simple-icons:postgresql", highlight: true },
			{ name: "Redis", icon: "simple-icons:redis" },
			{ name: "SQLite", icon: "simple-icons:sqlite" },
			{ name: "Prisma / Drizzle", icon: "simple-icons:prisma" },
		],
	},
	{
		title: "DevOps & Tooling",
		icon: "lucide:cpu",
		description:
			"Automated CI/CD pipelines, containerization, and code quality",
		skills: [
			{ name: "Docker", icon: "simple-icons:docker", highlight: true },
			{
				name: "GitHub Actions",
				icon: "simple-icons:githubactions",
				highlight: true,
			},
			{ name: "Vitest", icon: "simple-icons:vitest" },
			{ name: "Biome", icon: "simple-icons:biome" },
			{ name: "Linux / Bash", icon: "simple-icons:gnubash" },
			{ name: "Vercel / Netlify", icon: "simple-icons:vercel" },
		],
	},
];
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Tech Stack & Skills
        </h2>
        <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Technologies and tools I use on a daily basis to build production products.
        </p>
      </div>
    </div>

    <!-- 3-Column Minimal Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <UiCard
        v-for="cat in categories"
        :key="cat.title"
        padding="md"
        class="flex flex-col justify-between"
      >
        <div class="space-y-3">
          <div class="flex items-center gap-2.5">
            <div class="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
              <Icon :name="cat.icon" class="w-4 h-4" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {{ cat.title }}
              </h3>
            </div>
          </div>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {{ cat.description }}
          </p>
        </div>

        <div class="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 grid grid-cols-2 gap-2">
          <div
            v-for="skill in cat.skills"
            :key="skill.name"
            class="flex items-center gap-2 text-xs font-mono text-neutral-700 dark:text-neutral-300 py-1"
          >
            <Icon
              :name="skill.icon"
              class="w-3.5 h-3.5 shrink-0"
              :class="skill.highlight ? 'text-neutral-900 dark:text-neutral-100 font-semibold' : 'text-neutral-400'"
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
