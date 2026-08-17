<script setup lang="ts">
import { DropdownMenuTrigger, useForwardProps } from "radix-vue";

interface Props {
	asChild?: boolean;
	disabled?: boolean;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuTrigger v-bind="forwarded">
    <slot />
  </DropdownMenuTrigger>
</template>
