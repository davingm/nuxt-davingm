<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <nav aria-label="breadcrumb" :class="cn(props.class)">
    <slot />
  </nav>
</template>
