<script setup lang="ts">
useSeoMeta({
	title: "Friends & Developer Network — Davin",
	description:
		"A curated blogroll and network of talented friends, builders, engineers, and open-source creators.",
});

interface Friend {
	name: string;
	handle: string;
	avatar: string;
	role: string;
	bio: string;
	location: string;
	siteUrl: string;
	githubUrl?: string;
	tags: string[];
}

const friends: Friend[] = [
	{
		name: "Ahmad Fauzi",
		handle: "@ahmadfauzi",
		avatar:
			"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
		role: "Cloud Architect & SRE",
		bio: "Kubernetes specialist, Go enthusiast, and author of automated observability runbooks.",
		location: "Bandung, ID",
		siteUrl: "https://fauzi.dev",
		githubUrl: "https://github.com/fauzi",
		tags: ["Kubernetes", "Go", "GCP", "Terraform"],
	},
	{
		name: "Elena Rostova",
		handle: "@elena_dev",
		avatar:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
		role: "Staff Frontend Engineer",
		bio: "Vue.js core contributor and accessibility advocate. Passionate about micro-interactions.",
		location: "Berlin, DE",
		siteUrl: "https://elena.codes",
		githubUrl: "https://github.com/elena",
		tags: ["Vue 3", "TypeScript", "A11y", "Tailwind"],
	},
	{
		name: "Kenji Sato",
		handle: "@kenjisato",
		avatar:
			"https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",
		role: "Full-Stack Developer",
		bio: "Building indie micro-SaaS with Nuxt, Nitro, and SQLite. Rust explorer on weekends.",
		location: "Tokyo, JP",
		siteUrl: "https://kenji.sh",
		githubUrl: "https://github.com/kenji",
		tags: ["Nuxt 4", "Rust", "SQLite", "Nitro"],
	},
	{
		name: "Rian Pratama",
		handle: "@rianpratama",
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
		role: "DevOps & Tooling Engineer",
		bio: "Specialist in developer experience, CI/CD speed optimization, and Docker orchestration.",
		location: "Jakarta, ID",
		siteUrl: "https://rian.dev",
		githubUrl: "https://github.com/rian",
		tags: ["Docker", "Actions", "Linux", "Biome"],
	},
	{
		name: "Chloe Tremblay",
		handle: "@chloe_ux",
		avatar:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
		role: "Design Systems Lead",
		bio: "Bridging design and engineering with Figma tokens, Geist typography, and Tailwind.",
		location: "Montreal, CA",
		siteUrl: "https://chloe.design",
		githubUrl: "https://github.com/chloe",
		tags: ["Design Systems", "Figma", "Geist", "CSS"],
	},
	{
		name: "Budi Santoso",
		handle: "@budisantoso",
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
		role: "Backend & Distributed Systems",
		bio: "Distributed caching, PostgreSQL tuning, and event-driven architecture with Apache Kafka.",
		location: "Surabaya, ID",
		siteUrl: "https://budi.id",
		githubUrl: "https://github.com/budi",
		tags: ["PostgreSQL", "Redis", "Kafka", "Go"],
	},
];

const isModalOpen = ref(false);
const copied = ref(false);

const prTemplate = `
- Name: Your Name
- Handle: @yourhandle
- Site: https://yourdomain.com
- Avatar: https://github.com/yourhandle.png
- Role: Your Role
- Bio: Short 1-2 sentence description
- Location: City, Country
- Tags: ["Tag1", "Tag2", "Tag3"]
`.trim();

const copyTemplate = async () => {
	try {
		await navigator.clipboard.writeText(prTemplate);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error(err);
	}
};
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Friends & Developer Network
        </h1>
        <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
          An open blogroll celebrating friends, mentors, and talented developers across the global ecosystem.
        </p>
      </div>

      <UiButton
        variant="primary"
        size="sm"
        icon="lucide:plus"
        @click="isModalOpen = true"
      >
        Join the Network
      </UiButton>
    </div>

    <!-- Friends Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiCard
        v-for="friend in friends"
        :key="friend.handle"
        padding="md"
        class="flex flex-col justify-between group space-y-4"
      >
        <div class="space-y-3">
          <!-- User header -->
          <div class="flex items-center gap-3">
            <img
              :src="friend.avatar"
              :alt="friend.name"
              class="w-11 h-11 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0"
              loading="lazy"
            />
            <div class="min-w-0">
              <h2 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                {{ friend.name }}
              </h2>
              <div class="text-xs text-neutral-500 dark:text-neutral-400 font-mono truncate">
                {{ friend.handle }}
              </div>
            </div>
          </div>

          <!-- Role & Bio -->
          <div class="space-y-1">
            <div class="text-xs font-medium text-neutral-800 dark:text-neutral-200">
              {{ friend.role }} · <span class="text-neutral-400 font-normal">{{ friend.location }}</span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
              {{ friend.bio }}
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
          <!-- Tags -->
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tag in friend.tags"
              :key="tag"
              class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex items-center justify-between pt-1 text-xs">
            <a
              :href="friend.siteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-4"
            >
              <span>Visit Website</span>
              <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
            </a>

            <a
              v-if="friend.githubUrl"
              :href="friend.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="GitHub profile"
            >
              <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </UiCard>
    </div>

    <!-- Join Network Modal -->
    <UiModal
      v-model="isModalOpen"
      title="Join the Developer Network"
      max-width="lg"
    >
      <div class="space-y-4">
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Want to be listed on this blogroll? Submit a quick Pull Request or send your profile details using the format below:
        </p>

        <div class="relative rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 font-mono text-xs text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">
          {{ prTemplate }}
        </div>

        <div class="flex items-center justify-between pt-2">
          <UiButton
            variant="outline"
            size="sm"
            :icon="copied ? 'lucide:check' : 'lucide:copy'"
            @click="copyTemplate"
          >
            {{ copied ? 'Copied Template!' : 'Copy Template' }}
          </UiButton>

          <UiButton
            href="https://github.com/davingm/nuxt-davingm/issues/new"
            variant="primary"
            size="sm"
            trailing-icon="lucide:arrow-up-right"
          >
            Submit via GitHub
          </UiButton>
        </div>
      </div>
    </UiModal>
  </div>
</template>
