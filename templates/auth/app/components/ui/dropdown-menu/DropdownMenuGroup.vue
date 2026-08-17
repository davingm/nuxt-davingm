<script setup lang="ts">
import { DropdownMenuGroup } from "radix-vue";

interface Props {
	asChild?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <DropdownMenuGroup :as-child="props.asChild">
    <slot />
  </DropdownMenuGroup>
</template>
