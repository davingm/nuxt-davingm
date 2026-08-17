<script setup lang="ts">
import { TooltipTrigger, useForwardProps } from "radix-vue";

interface Props {
	asChild?: boolean;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <TooltipTrigger v-bind="forwarded">
    <slot />
  </TooltipTrigger>
</template>
