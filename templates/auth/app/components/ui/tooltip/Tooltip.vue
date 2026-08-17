<script setup lang="ts">
import { TooltipRoot, useForwardPropsEmits } from "radix-vue";

interface Props {
	defaultOpen?: boolean;
	open?: boolean;
	delayDuration?: number;
	disableHoverableContent?: boolean;
	disableClosingTrigger?: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<{
	"update:open": [open: boolean];
}>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TooltipRoot v-bind="forwarded">
    <slot />
  </TooltipRoot>
</template>
