<script setup lang="ts">
import { PanelLeft } from "@lucide/vue";
import { cn } from "~/lib/utils";
import { useSidebar } from "./utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();

const { toggleSidebar } = useSidebar();
</script>

<template>
  <button
    data-sidebar="trigger"
    type="button"
    :class="cn('sidebar-trigger', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft class="h-4 w-4" />
    <span class="sr-only">Toggle Sidebar</span>
  </button>
</template>

<style scoped>
.sidebar-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}

.sidebar-trigger:hover {
  background: var(--inset-surface);
  color: var(--text-h);
}
</style>
