<script setup lang="ts">
import { cn } from "~/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <li
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative list-none', props.class)"
  >
    <slot />
  </li>
</template>
