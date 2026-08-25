<script setup lang="ts">
import type { NavItem } from "./NavMain.vue";

defineProps<{
	items: NavItem[];
	class?: string;
}>();
</script>

<template>
  <SidebarGroup :class="['p-2 group-data-[collapsible=icon]:p-0', $props.class]">
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <SidebarMenuButton
            as-child
            size="sm"
            :tooltip="item.title"
            class="text-muted-foreground hover:text-foreground"
          >
            <a :href="item.href" target="_blank" rel="noopener noreferrer">
              <component :is="item.icon" v-if="item.icon" class="size-4 shrink-0" />
              <span class="text-xs">{{ item.title }}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>
