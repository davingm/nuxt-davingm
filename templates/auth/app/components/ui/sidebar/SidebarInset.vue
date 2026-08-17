<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <main
    :class="
      cn(
        'sidebar-inset relative flex min-h-svh flex-1 flex-col',
        'peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))]',
        'md:peer-data-[variant=inset]:m-2',
        'md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2',
        'md:peer-data-[variant=inset]:ml-0',
        'md:peer-data-[variant=inset]:rounded-xl',
        'md:peer-data-[variant=inset]:shadow-sm',
        props.class,
      )
    "
  >
    <slot />
  </main>
</template>

<style scoped>
.sidebar-inset {
  background-color: var(--inset-bg);
  color: var(--text);
  border: 1px solid var(--inset-border-color);
}
</style>
