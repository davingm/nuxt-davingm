<script setup lang="ts">
const route = useRoute();
const mobileMenuOpen = ref(false);

const [site, social] = await Promise.all([useUserSite(), useUserSocial()]);

const isActive = (to: string) => {
	if (to === "/") return route.path === "/";
	return route.path.startsWith(to);
};

watch(() => route.fullPath, () => { mobileMenuOpen.value = false; });
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md transition-colors">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
      <NuxtLink to="/" class="flex items-center gap-2.5 group font-medium text-neutral-900 dark:text-neutral-100">
        <div class="w-6 h-6 rounded flex items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 transition-transform group-hover:scale-105">
          <Icon name="lucide:terminal" class="w-3.5 h-3.5" />
        </div>
        <span class="font-semibold tracking-tight text-sm sm:text-base">
          {{ site.brandName }}<span class="text-neutral-400 dark:text-neutral-500 font-normal">.{{ site.brandDomain }}</span>
        </span>
        <UiBadge variant="subtle" size="sm" class="hidden sm:inline-flex text-[10px]">
          v{{ site.version }}
        </UiBadge>
      </NuxtLink>

      <nav class="hidden md:flex items-center gap-1">
        <NuxtLink
          v-for="link in site.nav"
          :key="link.to"
          :to="link.to"
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
          :class="[
            isActive(link.to)
              ? 'text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-800'
              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40',
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2">
        <QuickSearch />
        <div class="h-4 w-px bg-neutral-200 dark:border-neutral-800 hidden sm:block" />
        <a
          :href="social.github"
          target="_blank"
          rel="noopener noreferrer"
          class="p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors hidden sm:inline-flex"
          aria-label="GitHub Profile"
        >
          <Icon name="simple-icons:github" class="w-4 h-4" />
        </a>
        <UiThemeToggle />
        <button
          type="button"
          class="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] px-4 py-3 space-y-1 shadow-lg">
      <NuxtLink
        v-for="link in site.nav"
        :key="link.to"
        :to="link.to"
        class="block px-3 py-2 rounded-md text-sm font-medium transition-colors"
        :class="[
          isActive(link.to)
            ? 'text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-800'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800/40',
        ]"
      >
        {{ link.label }}
      </NuxtLink>
      <div class="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
        <span>Connect:</span>
        <div class="flex items-center gap-3">
          <a :href="social.github" target="_blank" class="hover:text-neutral-900 dark:hover:text-white">GitHub</a>
          <a :href="social.twitter" target="_blank" class="hover:text-neutral-900 dark:hover:text-white">X / Twitter</a>
        </div>
      </div>
    </div>
  </header>
</template>
