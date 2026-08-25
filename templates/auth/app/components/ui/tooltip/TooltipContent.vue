<script setup lang="ts">
import { TooltipContent, TooltipPortal, useForwardPropsEmits } from "radix-vue";
import { cn } from "~/lib/utils";

defineOptions({
	inheritAttrs: false,
});

interface Props {
	sideOffset?: number;
	alignOffset?: number;
	side?: "top" | "right" | "bottom" | "left";
	align?: "start" | "center" | "end";
	class?: HTMLAttributes["class"];
	asChild?: boolean;
	hidden?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	sideOffset: 4,
});

const emits = defineEmits<{
	escapeKeyDown: [event: KeyboardEvent];
	pointerDownOutside: [event: Event];
}>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TooltipPortal>
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <slot />
    </TooltipContent>
  </TooltipPortal>
</template>
