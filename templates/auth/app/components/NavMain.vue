<script setup lang="ts">
export interface NavItem {
    title: string;
    href: string;
    icon?: string; 
}

defineProps<{
    items: NavItem[];
}>();

const route = useRoute();

const isCurrentRoute = (href: string) => {
    if (href === "/dashboard") return route.path === "/dashboard";
    return route.path.startsWith(href);
};
</script>

<template>
  <SidebarGroup class="px-2 py-0">
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <SidebarMenuButton
          as-child
          :is-active="isCurrentRoute(item.href)"
          :tooltip="item.title"
        >
          <NuxtLink :to="item.href">
            <!-- Tambahkan shrink-0 -->
              <Icon v-if="item.icon" :name="item.icon" class="size-4 shrink-0" />
            <span class="text-xs font-medium">{{ item.title }}</span>
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>