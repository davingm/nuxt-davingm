<script setup lang="ts">
interface SearchItem {
	title: string;
	subtitle?: string;
	to: string;
	icon: string;
	category: "Pages" | "Projects" | "Blog" | "Social";
}

const isOpen = ref(false);
const query = ref("");

const items: SearchItem[] = [
	{
		title: "Home",
		subtitle: "Overview, skills, timeline, and FAQ",
		to: "/",
		icon: "lucide:home",
		category: "Pages",
	},
	{
		title: "Projects",
		subtitle: "Open source tools, web apps & libraries",
		to: "/projects",
		icon: "lucide:folder-git-2",
		category: "Pages",
	},
	{
		title: "Blog",
		subtitle: "Articles on Nuxt, DevOps & architecture",
		to: "/blog",
		icon: "lucide:newspaper",
		category: "Pages",
	},
	{
		title: "Gallery",
		subtitle: "Workstations, gear & visual snapshots",
		to: "/gallery",
		icon: "lucide:image",
		category: "Pages",
	},
	{
		title: "Friends & Blogroll",
		subtitle: "Developer community network",
		to: "/friends",
		icon: "lucide:users",
		category: "Pages",
	},
	// Projects
	{
		title: "Nuxt Davingm Starter",
		subtitle: "Production-ready CLI starter for Nuxt 4",
		to: "/projects",
		icon: "simple-icons:nuxtdotjs",
		category: "Projects",
	},
	{
		title: "Kestra DevOps Workflow",
		subtitle: "Automated CI/CD orchestrator with Docker",
		to: "/projects",
		icon: "simple-icons:docker",
		category: "Projects",
	},
	{
		title: "Vercel Geist Design System",
		subtitle: "Minimalist Vue 3 UI primitives kit",
		to: "/projects",
		icon: "simple-icons:vuedotjs",
		category: "Projects",
	},
	// Blog
	{
		title: "Architecting Developer-First Nuxt Starter Templates",
		subtitle: "Nuxt 4 architecture and design guide",
		to: "/blog/building-modern-cli-templates",
		icon: "lucide:file-text",
		category: "Blog",
	},
	{
		title: "Deep Dive into Nuxt 4 Architecture and Zero-Config SSG",
		subtitle: "Static site generation with Nitro",
		to: "/blog/mastering-nuxt-4-and-ssg",
		icon: "lucide:file-text",
		category: "Blog",
	},
	{
		title: "Minimalist Docker & CI/CD Pipelines for Modern Web Apps",
		subtitle: "DevOps best practices & Dockerfile",
		to: "/blog/streamlining-devops-with-docker-and-actions",
		icon: "lucide:file-text",
		category: "Blog",
	},
	// Social
	{
		title: "GitHub Profile",
		subtitle: "Explore open source repositories",
		to: "https://github.com/davingm",
		icon: "simple-icons:github",
		category: "Social",
	},
	{
		title: "X (Twitter)",
		subtitle: "Follow for tech thoughts & updates",
		to: "https://x.com/davingm",
		icon: "simple-icons:x",
		category: "Social",
	},
];

const filteredItems = computed(() => {
	if (!query.value.trim()) return items;
	const q = query.value.toLowerCase();
	return items.filter(
		(item) =>
			item.title.toLowerCase().includes(q) ||
			(item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
			item.category.toLowerCase().includes(q),
	);
});

const open = () => {
	isOpen.value = true;
	query.value = "";
};

const close = () => {
	isOpen.value = false;
};

const navigate = (to: string) => {
	close();
	if (to.startsWith("http")) {
		window.open(to, "_blank");
	} else {
		navigateTo(to);
	}
};

// Global shortcut cmd+k / ctrl+k
const handleKeydown = (e: KeyboardEvent) => {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		e.preventDefault();
		isOpen.value = !isOpen.value;
	}
};

onMounted(() => {
	window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeydown);
});

defineExpose({ open });
</script>

<template>
  <div>
    <!-- Trigger Button -->
    <button
      type="button"
      class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-neutral-300 dark:hover:border-neutral-700 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      @click="open"
    >
      <Icon name="lucide:search" class="w-3.5 h-3.5" />
      <span class="hidden sm:inline">Search...</span>
      <UiKbd class="hidden sm:inline">⌘K</UiKbd>
    </button>

    <!-- Modal Command Palette -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4"
      >
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-sm"
          @click="close"
        />

        <div
          class="relative w-full max-w-lg rounded-xl bg-white dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10"
        >
          <!-- Input bar -->
          <div class="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <Icon name="lucide:search" class="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              v-model="query"
              type="text"
              placeholder="Type a command or search..."
              class="w-full bg-transparent border-none p-0 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-0"
              autofocus
            />
            <UiKbd class="cursor-pointer" @click="close">ESC</UiKbd>
          </div>

          <!-- List -->
          <div class="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/40">
            <div v-if="filteredItems.length === 0" class="py-8 text-center text-xs text-neutral-500">
              No results found for "{{ query }}"
            </div>

            <div
              v-for="item in filteredItems"
              :key="item.title"
              class="group flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800/60 cursor-pointer transition-colors"
              @click="navigate(item.to)"
            >
              <div class="flex items-center gap-3">
                <div class="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white">
                  <Icon :name="item.icon" class="w-4 h-4" />
                </div>
                <div>
                  <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {{ item.title }}
                  </div>
                  <div v-if="item.subtitle" class="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-xs sm:max-w-sm">
                    {{ item.subtitle }}
                  </div>
                </div>
              </div>
              <span class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                {{ item.category }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
