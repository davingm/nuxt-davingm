<script setup lang="ts">
interface Testimonial {
	quote: string;
	author: string;
	role: string;
	company: string;
	avatar: string;
}

const testimonials: Testimonial[] = [
	{
		quote:
			"Davin's Nuxt CLI starter cuts project onboarding time by 80%. The attention to minimalism, type safety, and clean architecture is exceptional.",
		author: "Alexandre Moreau",
		role: "Staff Frontend Architect",
		company: "Hexa Systems",
		avatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80",
	},
	{
		quote:
			"Working with Davin was a breeze. He translated complex microservice requirements into clean Vue 3 primitives with incredible speed and zero regressions.",
		author: "Sarah Chen",
		role: "VP of Engineering",
		company: "CloudVantage",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
	},
];
</script>

<template>
  <section class="space-y-6">
    <div>
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Endorsements & Testimonials
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
        Words from team leads and open source collaborators.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiCard
        v-for="(t, idx) in testimonials"
        :key="idx"
        padding="md"
        class="flex flex-col justify-between space-y-4"
      >
        <blockquote class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
          "{{ t.quote }}"
        </blockquote>

        <div class="flex items-center gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
          <img
            :src="t.avatar"
            :alt="t.author"
            class="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
            loading="lazy"
          />
          <div>
            <div class="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              {{ t.author }}
            </div>
            <div class="text-[11px] text-neutral-500 dark:text-neutral-400">
              {{ t.role }} · <span class="text-neutral-700 dark:text-neutral-300">{{ t.company }}</span>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>
