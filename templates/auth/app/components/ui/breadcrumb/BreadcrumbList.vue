<script lang="ts" setup>
import { cn } from "~/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <ol
    :class="
      cn(
        'flex flex-wrap items-center gap-1.5 break-words text-xs text-muted-foreground sm:gap-2.5',
        props.class,
      )
    "
  >
    <slot />
  </ol>
</template>
