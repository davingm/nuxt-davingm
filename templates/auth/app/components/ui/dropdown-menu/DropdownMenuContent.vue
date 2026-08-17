<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import {
	DropdownMenuContent,
	DropdownMenuPortal,
	useForwardPropsEmits,
} from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	sideOffset?: number;
	alignOffset?: number;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	class?: HTMLAttributes["class"];
	asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	sideOffset: 4,
});

const emits = defineEmits<{
	escapeKeyDown: [event: KeyboardEvent];
	pointerDownOutside: [event: Event];
	focusOutside: [event: Event];
	interactOutside: [event: Event];
}>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
