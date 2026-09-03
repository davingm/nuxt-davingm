<script setup lang="ts">
const faqItems = [
	{
		title:
			"What tech stack do you recommend for high-performance portfolio sites?",
		content:
			"Nuxt 4 with static generation (SSG), TailwindCSS for utility-first styling, @nuxt/content for markdown management, and Nitro engine for zero-config prerendering. Deploying via Nginx or Vercel delivers sub-100ms global response times.",
	},
	{
		title: "How is this starter template structured for the nuxt-davingm CLI?",
		content:
			"This starter is built according to official Nuxt 4 conventions with the `app/` directory layout. Small UI components reside in `app/components/ui/`, reusable sections in `app/components/section/`, layouts in `app/layouts/`, and blog content in `content/`. It comes with Biome linting, Vitest tests, and Docker CI/CD.",
	},
	{
		title: "Are you available for consulting or contract engineering roles?",
		content:
			"Yes! I am open to select high-impact frontend architecture, Nuxt ecosystem consulting, design system implementation, and performance optimization contracts.",
	},
	{
		title: "How do you ensure zero AI slop and strictly minimalist design?",
		content:
			"By sticking strictly to Vercel Geist design principles: neutral charcoal dark tones (avoiding pitch black and avoiding blue tints), crisp geometric 1px borders, standard Geist typography, and using color only for intentional feedback.",
	},
];
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Frequently Asked Questions
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        Common inquiries regarding technical choices, CLI tooling, and collaborations.
      </p>
    </div>

    <UiAccordion :items="faqItems" :default-open="0" />
  </section>
</template>
