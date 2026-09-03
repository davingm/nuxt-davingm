<script setup lang="ts">
interface Props {
	variant?: "default" | "outline" | "subtle" | "success" | "brand";
	size?: "sm" | "md";
	dot?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	variant: "default",
	size: "sm",
	dot: false,
});

const variantClasses = computed(() => {
	switch (props.variant) {
		case "outline":
			return "border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 bg-transparent";
		case "subtle":
			return "bg-neutral-100 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 border border-transparent";
		case "success":
			return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20";
		case "brand":
			return "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900";
		default:
			return "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-700/60";
	}
});

const sizeClasses = computed(() => {
	return props.size === "sm"
		? "text-xs px-2 py-0.5 font-medium"
		: "text-xs px-2.5 py-1 font-medium";
});
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full transition-colors font-mono"
    :class="[variantClasses, sizeClasses]"
  >
    <span
      v-if="dot"
      class="h-1.5 w-1.5 rounded-full"
      :class="variant === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-current opacity-70'"
    />
    <slot />
  </span>
</template>
