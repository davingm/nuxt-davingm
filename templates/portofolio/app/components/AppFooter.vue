<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#151515]/50 transition-colors">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 dark:text-neutral-400">
      <!-- Left Info -->
      <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-neutral-700 dark:text-neutral-300 font-medium">All systems operational</span>
        </div>
        <span class="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
        <span>© {{ currentYear }} Davin. Built with Nuxt 4 & Geist design.</span>
      </div>

      <!-- Right Links -->
      <div class="flex items-center gap-5">
        <NuxtLink to="/projects" class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
          Projects
        </NuxtLink>
        <NuxtLink to="/blog" class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
          Blog
        </NuxtLink>
        <NuxtLink to="/friends" class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
          Friends
        </NuxtLink>
        <a
          href="https://github.com/davingm/nuxt-davingm"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1"
        >
          <span>CLI Template</span>
          <Icon name="lucide:arrow-up-right" class="w-3 h-3" />
        </a>
      </div>
    </div>
  </footer>
</template>
