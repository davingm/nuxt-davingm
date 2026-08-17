<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import { DropdownMenuSeparator } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	class?: HTMLAttributes["class"];
	asChild?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuSeparator
    :as-child="props.asChild"
    :class="cn('-mx-1 my-1 h-px bg-border', props.class)"
  />
</template>
