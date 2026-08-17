<script setup lang="ts">
import { TooltipProvider } from "radix-vue";

interface Props {
	delayDuration?: number;
	skipDelayDuration?: number;
	disableHoverableContent?: boolean;
	disableClosingTrigger?: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <TooltipProvider v-bind="props">
    <slot />
  </TooltipProvider>
</template>
