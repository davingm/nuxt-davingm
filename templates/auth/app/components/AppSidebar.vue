<script setup lang="ts">
import { BookOpen, Code2, LayoutGrid } from "@lucide/vue";
import type { NavItem } from "./NavMain.vue";

const mainNavItems: NavItem[] = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutGrid,
	},
];

const footerNavItems: NavItem[] = [
	{
		title: "Repository",
		href: "https://github.com/davingm/nuxt-davingm",
		icon: Code2,
	},
	{
		title: "Documentation",
		href: "https://nuxt.davingm.com",
		icon: BookOpen,
	},
];
</script>

<template>
  <Sidebar collapsible="icon" variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/dashboard">
              <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Icon name="simple-icons:nuxtdotjs" class="size-5 text-[#00dc82]" />
              </div>
              <div class="grid flex-1 text-left text-xs leading-tight">
                <span class="truncate font-semibold">nuxt-auth</span>
                <span class="truncate text-[11px] text-muted-foreground">Starter Kit</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <NavMain :items="mainNavItems" />
      <NavFooter :items="footerNavItems" class="mt-auto" />
    </SidebarContent>

    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
  </Sidebar>
</template>
