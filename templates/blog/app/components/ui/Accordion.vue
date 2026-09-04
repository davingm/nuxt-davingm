<script setup lang="ts">
interface Item {
	title: string;
	content: string;
}

interface Props {
	items: Item[];
	defaultOpen?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
	defaultOpen: 0,
});

const openIndex = ref<number | null>(props.defaultOpen);

const toggle = (idx: number) => {
	openIndex.value = openIndex.value === idx ? null : idx;
};
</script>

<template>
  <div class="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-white dark:bg-[#181818]">
    <div
      v-for="(item, idx) in items"
      :key="idx"
      class="group transition-colors"
    >
      <button
        type="button"
        class="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
        @click="toggle(idx)"
      >
        <span>{{ item.title }}</span>
        <Icon
          name="lucide:chevron-down"
          class="w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200"
          :class="openIndex === idx && 'rotate-180 text-neutral-900 dark:text-neutral-100'"
        />
      </button>

      <div
        v-show="openIndex === idx"
        class="px-4 sm:px-5 pb-5 pt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/20"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>
