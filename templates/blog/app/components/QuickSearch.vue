<script setup lang="ts">
const isOpen = ref(false);
const query = ref("");
const selectedIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);

const site = await useUserSite();
const social = await useUserSocial();

const socialItems = computed(() => [
	{
		title: "GitHub Profile",
		subtitle: social.github,
		to: social.github,
		icon: "simple-icons:github",
		category: "Social",
	},
	{
		title: "X (Twitter)",
		subtitle: social.twitter,
		to: social.twitter,
		icon: "simple-icons:x",
		category: "Social",
	},
]);

// All searchable items — built at mount time, no network calls on every keystroke
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

// Group results by category
const groupedItems = computed(() => {
	const groups: Record<string, typeof filteredItems.value> = {};
	for (const item of filteredItems.value) {
		if (!groups[item.category]) groups[item.category] = [];
		groups[item.category].push(item);
	}
	return groups;
});

// Flat list for keyboard navigation
const flatItems = computed(() => filteredItems.value);

const open = () => {
	isOpen.value = true;
	query.value = "";
	selectedIndex.value = 0;
	nextTick(() => inputRef.value?.focus());
};

const close = () => {
	isOpen.value = false;
};

const navigate = (to: string) => {
	close();
	if (to.startsWith("http")) window.open(to, "_blank");
	else navigateTo(to);
};

const handleKeydown = (e: KeyboardEvent) => {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		e.preventDefault();
		isOpen.value ? close() : open();
		return;
	}
	if (!isOpen.value) return;

	if (e.key === "Escape") { close(); return; }
	if (e.key === "ArrowDown") {
		e.preventDefault();
		selectedIndex.value = (selectedIndex.value + 1) % flatItems.value.length;
	}
	if (e.key === "ArrowUp") {
		e.preventDefault();
		selectedIndex.value = (selectedIndex.value - 1 + flatItems.value.length) % flatItems.value.length;
	}
	if (e.key === "Enter" && flatItems.value[selectedIndex.value]) {
		navigate(flatItems.value[selectedIndex.value].to);
	}
};

// Reset selected index when query changes
watch(query, () => { selectedIndex.value = 0; });

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

defineExpose({ open });

// Helper: get flat index of item in grouped view
const getFlatIndex = (item: (typeof allItems.value)[0]) =>
	flatItems.value.findIndex((i) => i.to === item.to && i.title === item.title);
</script>

<template>
  <div>
    <!-- Trigger button -->
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
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-[0.98]"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-[0.98]"
      >
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="close" />

          <!-- Modal -->
          <div class="relative w-full max-w-2xl rounded-xl bg-white dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10">

            <!-- Search input row -->
            <div class="flex items-center gap-3 px-4 py-3.5 border-b border-neutral-200 dark:border-neutral-800">
              <Icon name="lucide:search" class="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                ref="inputRef"
                v-model="query"
                type="text"
                :placeholder="site.search.placeholder"
                class="w-full bg-transparent border-none p-0 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-0"
              />
              <button
                v-if="query"
                type="button"
                class="shrink-0 p-0.5 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                @click="query = ''"
              >
                <Icon name="lucide:x" class="w-3.5 h-3.5" />
              </button>
              <UiKbd class="cursor-pointer shrink-0" @click="close">ESC</UiKbd>
            </div>

            <!-- Results -->
            <div class="max-h-[420px] overflow-y-auto overscroll-contain">
              <!-- Empty state -->
              <div v-if="filteredItems.length === 0" class="py-12 text-center space-y-1.5">
                <Icon name="lucide:search-x" class="w-8 h-8 mx-auto text-neutral-300 dark:text-neutral-600" />
                <p class="text-sm text-neutral-500">{{ site.search.empty }} "<span class="text-neutral-700 dark:text-neutral-300">{{ query }}</span>"</p>
              </div>

              <!-- No query: show all grouped -->
              <div v-else class="p-2 space-y-1">
                <template v-for="(items, category) in groupedItems" :key="category">
                  <!-- Category header -->
                  <div class="px-2 pt-3 pb-1 first:pt-2">
                    <span class="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-mono">
                      {{ category }}
                    </span>
                  </div>

                  <!-- Items in category -->
                  <div
                    v-for="item in items"
                    :key="item.title"
                    class="group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors"
                    :class="[
                      getFlatIndex(item) === selectedIndex
                        ? 'bg-neutral-900 dark:bg-neutral-100'
                        : 'hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
                    ]"
                    @click="navigate(item.to)"
                    @mouseenter="selectedIndex = getFlatIndex(item)"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div
                        class="p-1.5 rounded-md shrink-0 transition-colors"
                        :class="[
                          getFlatIndex(item) === selectedIndex
                            ? 'bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300',
                        ]"
                      >
                        <Icon :name="item.icon" class="w-3.5 h-3.5" />
                      </div>
                      <div class="min-w-0">
                        <div
                          class="text-sm font-medium truncate transition-colors"
                          :class="[
                            getFlatIndex(item) === selectedIndex
                              ? 'text-white dark:text-neutral-900'
                              : 'text-neutral-900 dark:text-neutral-100',
                          ]"
                        >
                          {{ item.title }}
                        </div>
                        <div
                          v-if="item.subtitle"
                          class="text-xs truncate transition-colors"
                          :class="[
                            getFlatIndex(item) === selectedIndex
                              ? 'text-neutral-300 dark:text-neutral-600'
                              : 'text-neutral-500 dark:text-neutral-400',
                          ]"
                        >
                          {{ item.subtitle }}
                        </div>
                      </div>
                    </div>

                    <Icon
                      name="lucide:corner-down-left"
                      class="w-3.5 h-3.5 shrink-0 ml-3 transition-opacity"
                      :class="[
                        getFlatIndex(item) === selectedIndex
                          ? 'opacity-100 text-white dark:text-neutral-900'
                          : 'opacity-0',
                      ]"
                    />
                  </div>
                </template>
              </div>
            </div>

            <!-- Footer hints -->
            <div class="flex items-center justify-between px-4 py-2.5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40">
              <div class="flex items-center gap-3 text-[10px] text-neutral-400 font-mono">
                <span class="flex items-center gap-1">
                  <UiKbd>↑</UiKbd><UiKbd>↓</UiKbd> to navigate
                </span>
                <span class="flex items-center gap-1">
                  <UiKbd>↵</UiKbd> to select
                </span>
                <span class="flex items-center gap-1">
                  <UiKbd>ESC</UiKbd> to close
                </span>
              </div>
              <div class="text-[10px] text-neutral-400 font-mono">
                {{ filteredItems.length }} result{{ filteredItems.length !== 1 ? 's' : '' }}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
