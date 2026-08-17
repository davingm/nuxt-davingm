<script setup lang="ts">
export interface BreadcrumbItemType {
    title: string;
    href?: string;
}

const props = defineProps<{
    breadcrumbs?: BreadcrumbItemType[];
}>();

const route = useRoute();
const { theme, toggleTheme } = useTheme();

const defaultBreadcrumbs = computed<BreadcrumbItemType[]>(() => {
    if (props.breadcrumbs && props.breadcrumbs.length > 0) {
        return props.breadcrumbs;
    }
    if (route.path.startsWith("/dashboard/settings")) {
        return [
            { title: "Platform", href: "/dashboard" },
            { title: "Profile settings" },
        ];
    }
    return [{ title: "Dashboard" }];
});
</script>

<template>
  <header class="dash-header transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div class="flex flex-1 items-center gap-2">
      <SidebarTrigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4 !bg-[var(--inset-border-color)]" />
      <Breadcrumb>
        <BreadcrumbList>
          <template v-for="(item, index) in defaultBreadcrumbs" :key="item.title">
            <BreadcrumbItem>
              <template v-if="index === defaultBreadcrumbs.length - 1 || !item.href">
                <BreadcrumbPage class="!text-[var(--text-h)]">{{ item.title }}</BreadcrumbPage>
              </template>
              <template v-else>
                <BreadcrumbLink as-child class="!text-[var(--text)]">
                  <NuxtLink :to="item.href">{{ item.title }}</NuxtLink>
                </BreadcrumbLink>
              </template>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="index < defaultBreadcrumbs.length - 1" class="!text-[var(--text)]" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>

    <button
      type="button"
      class="theme-toggle"
      :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
      @click="toggleTheme"
    >
      <!-- ClientOnly mencegah hydration mismatch karena theme dibaca dari localStorage -->
      <ClientOnly>
        <Icon v-if="theme === 'dark'" name="heroicons:sun-20-solid" class="size-4" />
        <Icon v-else name="heroicons:moon-20-solid" class="size-4" />
        <template #fallback>
          <Icon name="heroicons:moon-20-solid" class="size-4" />
        </template>
      </ClientOnly>
    </button>
  </header>
</template>

<style scoped>
.dash-header {
  display: flex;
  height: 3rem;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  background-color: var(--inset-bg);
  border-bottom: 1px solid var(--inset-border-color);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  background: transparent;
  border: 1px solid var(--inset-border-color);
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}

.theme-toggle:hover {
  color: var(--text-h);
  background: var(--inset-surface);
}
</style>