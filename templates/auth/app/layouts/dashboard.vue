<script setup lang="ts">
</script>

<template>
  <div class="flex h-svh">
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppSidebarHeader />
        <div class="dashboard-content">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style scoped>
.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background-color: var(--inset-bg);
  color: var(--text);
  min-height: 0; 
}
</style>