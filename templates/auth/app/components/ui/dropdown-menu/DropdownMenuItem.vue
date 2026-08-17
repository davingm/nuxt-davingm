<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { DropdownMenuItem, useForwardProps } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	asChild?: boolean;
	disabled?: boolean;
	textValue?: string;
	class?: HTMLAttributes["class"];
	inset?: boolean;
}

const props = defineProps<Props>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwarded"
    :class="
      cn(
        'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-xs outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0',
        inset && 'pl-8',
        props.class,
      )
    "
  >
    <slot />
  </DropdownMenuItem>
</template>
