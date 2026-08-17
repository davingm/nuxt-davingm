<script setup lang="ts">
import { DropdownMenuRoot, useForwardPropsEmits } from "radix-vue";

interface Props {
	defaultOpen?: boolean;
	open?: boolean;
	dir?: "ltr" | "rtl";
	modal?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<{
	"update:open": [open: boolean];
}>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuRoot v-bind="forwarded">
    <slot />
  </DropdownMenuRoot>
</template>
