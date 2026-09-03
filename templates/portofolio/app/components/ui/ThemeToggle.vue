<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === "dark";
	},
	set(val: boolean) {
		colorMode.preference = val ? "dark" : "light";
	},
});

const toggleTheme = () => {
	isDark.value = !isDark.value;
};
</script>

<template>
  <button
    type="button"
    class="relative inline-flex items-center justify-center p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors cursor-pointer border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <ClientOnly>
      <Icon
        v-if="isDark"
        name="lucide:moon"
        class="w-4 h-4 transition-transform rotate-0"
      />
      <Icon
        v-else
        name="lucide:sun"
        class="w-4 h-4 transition-transform rotate-0"
      />
      <template #fallback>
        <div class="w-4 h-4" />
      </template>
    </ClientOnly>
  </button>
</template>
