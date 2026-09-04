<script setup lang="ts">
interface Props {
	hover?: boolean;
	padding?: "none" | "sm" | "md" | "lg";
}

withDefaults(defineProps<Props>(), {
	hover: true,
	padding: "md",
});
</script>

<template>
  <div
    class="relative rounded-lg border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#181818] transition-all duration-200"
    :class="[
      hover && 'hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm',
      padding === 'sm' && 'p-4',
      padding === 'md' && 'p-5 sm:p-6',
      padding === 'lg' && 'p-6 sm:p-8',
    ]"
  >
    <slot />
  </div>
</template>
