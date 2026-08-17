<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { DropdownMenuLabel, useForwardProps } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	asChild?: boolean;
	class?: HTMLAttributes["class"];
	inset?: boolean;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwarded"
    :class="
      cn('px-2 py-1.5 text-xs font-semibold', inset && 'pl-8', props.class)
    "
  >
    <slot />
  </DropdownMenuLabel>
</template>
