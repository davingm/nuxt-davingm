<script setup lang="ts">
import type { NavItem } from "./NavMain.vue";

defineProps<{
    items: NavItem[];
    class?: string;
}>();
</script>

<template>
  <!-- 
    PADDING DIUBAH: 
    Saat normal: p-2 (atas bawah kiri kanan).
    Saat collapse: px-2 py-0 (meniru NavMain agar tidak bergeser ke kiri).
  -->
  <SidebarGroup :class="['p-2 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-0', $props.class]">
    <SidebarGroupContent>
      <SidebarMenu>
        <SidebarMenuItem v-for="item in items" :key="item.title">
          <!-- SIZE="SM" DIHAPUS: Agar ukuran tombol sama persis dengan NavMain -->
          <SidebarMenuButton
            as-child
            :tooltip="item.title"
            class="text-muted-foreground hover:text-foreground"
          >
            <!-- CLASS FLEX DIHAPUS: Meniru struktur NuxtLink di NavMain -->
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon v-if="item.icon" :name="item.icon" class="size-4 shrink-0" />
              <span class="truncate text-xs font-medium">{{ item.title }}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
</template>