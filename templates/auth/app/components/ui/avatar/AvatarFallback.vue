<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { AvatarFallback } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	delayMs?: number;
	asChild?: boolean;
	class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <AvatarFallback
    :delay-ms="props.delayMs"
    :as-child="props.asChild"
    :class="
      cn(
        'flex h-full w-full items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-xs font-medium uppercase',
        props.class,
      )
    "
  >
    <slot />
  </AvatarFallback>
</template>
