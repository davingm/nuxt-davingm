<script setup lang="ts">
import { AvatarRoot } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	class?: HTMLAttributes["class"];
}

const props = defineProps<Props>();
</script>

<template>
  <AvatarRoot
    :class="
      cn(
        'relative flex h-8 w-8 shrink-0 overflow-hidden rounded-lg',
        props.class,
      )
    "
  >
    <slot />
  </AvatarRoot>
</template>
