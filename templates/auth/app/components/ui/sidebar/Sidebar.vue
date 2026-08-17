<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import { SIDEBAR_WIDTH_MOBILE, useSidebar } from "./utils";

defineOptions({
	inheritAttrs: false,
});

const props = withDefaults(
	defineProps<{
		side?: "left" | "right";
		variant?: "sidebar" | "floating" | "inset";
		collapsible?: "offcanvas" | "icon" | "none";
		class?: HTMLAttributes["class"];
	}>(),
	{
		side: "left",
		variant: "sidebar",
		collapsible: "offcanvas",
	},
);

const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
</script>

<template>
  <div
    v-if="collapsible === 'none'"
    :class="
      cn(
        'flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>

  <div
    v-else-if="isMobile"
    v-bind="$attrs"
  >
    <!-- Mobile overlay -->
    <div
      v-if="openMobile"
      class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs transition-opacity duration-300"
      @click="setOpenMobile(false)"
    />
    <!-- Mobile sidebar drawer -->
    <div
      :class="
        cn(
          'fixed inset-y-0 z-50 flex h-full flex-col bg-sidebar p-0 text-sidebar-foreground shadow-lg transition-transform duration-300 ease-in-out',
          side === 'left' ? 'left-0' : 'right-0',
          openMobile
            ? 'translate-x-0'
            : side === 'left'
              ? '-translate-x-full'
              : 'translate-x-full',
          props.class,
        )
      "
      :style="{ width: SIDEBAR_WIDTH_MOBILE }"
    >
      <div class="flex h-full w-full flex-col">
        <slot />
      </div>
    </div>
  </div>

  <div
    v-else
    class="group peer hidden md:block text-sidebar-foreground"
    :data-state="state"
    :data-collapsible="state === 'collapsed' ? collapsible : ''"
    :data-variant="variant"
    :data-side="side"
  >
    <!-- Gap element to keep layout in place -->
    <div
      :class="
        cn(
          'duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4))]'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
        )
      "
    />
    <div
      :class="
        cn(
          'duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+theme(spacing.4)+2px)]'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l border-sidebar-border',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <div
        data-sidebar="sidebar"
        class="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
