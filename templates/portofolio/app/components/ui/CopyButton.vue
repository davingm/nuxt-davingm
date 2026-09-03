<script setup lang="ts">
interface Props {
	text: string;
	label?: string;
	successLabel?: string;
	variant?: "button" | "code-box" | "icon-only";
}

const props = withDefaults(defineProps<Props>(), {
	variant: "button",
});

const copied = ref(false);

const copy = async () => {
	try {
		await navigator.clipboard.writeText(props.text);
		copied.value = true;
		setTimeout(() => {
			copied.value = false;
		}, 2000);
	} catch (err) {
		console.error("Failed to copy", err);
	}
};
</script>

<template>
  <!-- Code box variant (e.g. npx nuxt-davingm@latest) -->
  <div
    v-if="variant === 'code-box'"
    class="group inline-flex items-center gap-3 px-3.5 py-2 rounded-lg bg-neutral-100 dark:bg-[#1c1c1e] border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
    @click="copy"
  >
    <span class="text-neutral-400 select-none">$</span>
    <span class="truncate">{{ text }}</span>
    <span
      class="ml-auto inline-flex items-center gap-1 text-xs text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors shrink-0"
    >
      <Icon
        :name="copied ? 'lucide:check' : 'lucide:copy'"
        class="w-3.5 h-3.5"
        :class="copied && 'text-emerald-500 dark:text-emerald-400'"
      />
      <span class="hidden sm:inline">{{ copied ? (successLabel || 'Copied!') : (label || 'Copy') }}</span>
    </span>
  </div>

  <!-- Icon-only variant -->
  <button
    v-else-if="variant === 'icon-only'"
    type="button"
    class="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
    :title="copied ? 'Copied!' : 'Copy to clipboard'"
    @click="copy"
  >
    <Icon
      :name="copied ? 'lucide:check' : 'lucide:copy'"
      class="w-4 h-4"
      :class="copied && 'text-emerald-500 dark:text-emerald-400'"
    />
  </button>

  <!-- Default button variant -->
  <button
    v-else
    type="button"
    class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors cursor-pointer"
    @click="copy"
  >
    <Icon
      :name="copied ? 'lucide:check' : 'lucide:copy'"
      class="w-3.5 h-3.5"
      :class="copied && 'text-emerald-500 dark:text-emerald-400'"
    />
    <span>{{ copied ? (successLabel || 'Copied!') : (label || 'Copy') }}</span>
  </button>
</template>
