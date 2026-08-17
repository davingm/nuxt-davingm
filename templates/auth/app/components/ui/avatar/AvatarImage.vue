<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { AvatarImage } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	src?: string;
	alt?: string;
	class?: HTMLAttributes["class"];
	asChild?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <AvatarImage
    :src="props.src"
    :alt="props.alt"
    :as-child="props.asChild"
    :class="cn('aspect-square h-full w-full object-cover', props.class)"
  />
</template>
