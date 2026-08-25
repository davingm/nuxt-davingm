<script lang="ts" setup>
import { Primitive } from "radix-vue";
import { cn } from "~/lib/utils";

interface Props {
	as?: any;
	asChild?: boolean;
	class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
	as: "a",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn('transition-colors hover:text-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>
