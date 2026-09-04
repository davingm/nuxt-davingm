<script setup lang="ts">
const isOpen = ref(false);
const query = ref("");

const site = await useUserSite();
const social = await useUserSocial();

const socialItems = computed(() => [
	{ title: "GitHub Profile", subtitle: social.github, to: social.github, icon: "simple-icons:github", category: "Social" },
	{ title: "X (Twitter)", subtitle: social.twitter, to: social.twitter, icon: "simple-icons:x", category: "Social" },
]);

const allItems = computed(() => [...site.search.pages, ...socialItems.value]);

const filteredItems = computed(() => {
	if (!query.value.trim()) return allItems.value;
	const q = query.value.toLowerCase();
	return allItems.value.filter(
		(item) =>
			item.title.toLowerCase().includes(q) ||
			(item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
			item.category.toLowerCase().includes(q),
	);
});

const open = () => { isOpen.value = true; query.value = ""; };
const close = () => { isOpen.value = false; };

const navigate = (to: string) => {
	close();
	if (to.startsWith("http")) window.open(to, "_blank");
	else navigateTo(to);
};

const handleKeydown = (e: KeyboardEvent) => {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		e.preventDefault();
		isOpen.value = !isOpen.value;
	}
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

defineExpose({ open });
</script>

<template>
  <div>
    <button
      type="button"
      class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-neutral-300 dark:hover:border-neutral-700 text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      @click="open"
    >
      <Icon name="lucide:search" class="w-3.5 h-3.5" />
      <span class="hidden sm:inline">{{ site.search.trigger }}</span>
      <UiKbd class="hidden sm:inline">⌘K</UiKbd>
    </button>

    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="close" />
        <div class="relative w-full max-w-lg rounded-xl bg-white dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10">
          <div class="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
            <Icon name="lucide:search" class="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              v-model="query"
              type="text"
              :placeholder="site.search.placeholder"
              class="w-full bg-transparent border-none p-0 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-0"
              autofocus
            />
            <UiKbd class="cursor-pointer" @click="close">ESC</UiKbd>
          </div>

          <div class="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-100 dark:divide-neutral-800/40">
            <div v-if="filteredItems.length === 0" class="py-8 text-center text-xs text-neutral-500">
              {{ site.search.empty }} "{{ query }}"
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
                  <div class="text-sm font-medium text-neutral-900 dark:text-neutral-100">{{ item.title }}</div>
                  <div v-if="item.subtitle" class="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-xs sm:max-w-sm">{{ item.subtitle }}</div>
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
