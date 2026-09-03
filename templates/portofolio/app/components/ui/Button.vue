<script setup lang="ts">
interface Props {
	variant?: "primary" | "secondary" | "outline" | "ghost";
	size?: "sm" | "md" | "lg";
	to?: string;
	href?: string;
	icon?: string;
	trailingIcon?: string;
	loading?: boolean;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const props = withDefaults(defineProps<Props>(), {
	variant: "secondary",
	size: "md",
	type: "button",
	loading: false,
	disabled: false,
});

const variantClasses = computed(() => {
	switch (props.variant) {
		case "primary":
			return "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white border border-transparent shadow-sm";
		case "outline":
			return "bg-transparent text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900/50";
		case "ghost":
			return "bg-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60";
		default: // secondary
			return "bg-neutral-100 text-neutral-900 hover:bg-neutral-200/80 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700/80 border border-neutral-200/70 dark:border-neutral-700/60";
	}
});

const sizeClasses = computed(() => {
	switch (props.size) {
		case "sm":
			return "text-xs px-2.5 py-1.5 gap-1.5";
		case "lg":
			return "text-sm px-5 py-2.5 gap-2.5";
		default:
			return "text-sm px-3.5 py-2 gap-2";
	}
});
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 active:scale-[0.98] select-none"
    :class="[variantClasses, sizeClasses, disabled && 'opacity-50 pointer-events-none']"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4 shrink-0" />
    <slot />
    <Icon v-if="trailingIcon" :name="trailingIcon" class="w-4 h-4 shrink-0" />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 active:scale-[0.98] select-none"
    :class="[variantClasses, sizeClasses, disabled && 'opacity-50 pointer-events-none']"
  >
    <Icon v-if="icon" :name="icon" class="w-4 h-4 shrink-0" />
    <slot />
    <Icon v-if="trailingIcon" :name="trailingIcon" class="w-4 h-4 shrink-0" />
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 active:scale-[0.98] select-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variantClasses, sizeClasses]"
  >
    <Icon v-if="loading" name="lucide:loader-2" class="w-4 h-4 animate-spin shrink-0" />
    <Icon v-else-if="icon" :name="icon" class="w-4 h-4 shrink-0" />
    <slot />
    <Icon v-if="trailingIcon && !loading" :name="trailingIcon" class="w-4 h-4 shrink-0" />
  </button>
</template>
