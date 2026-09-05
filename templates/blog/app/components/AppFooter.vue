<script setup lang="ts">
const currentYear = new Date().getFullYear();
const [profile, site] = await Promise.all([useUserProfile(), useUserSite()]);
</script>

<template>
  <footer class="mt-20 border-t border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#151515]/50 transition-colors">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 dark:text-neutral-400">
      <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span class="text-neutral-700 dark:text-neutral-300 font-medium">{{ site.footer.status }}</span>
        </div>
        <span class="hidden sm:inline text-neutral-300 dark:text-neutral-700">|</span>
        <span>© {{ currentYear }} {{ profile.name }}. {{ site.footer.credit }}</span>
      </div>

      <div class="flex items-center gap-5">
        <template v-for="link in site.footer.links" :key="link.label">
          <NuxtLink
            v-if="link.to && !link.to.startsWith('http')"
            :to="link.to"
            class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
          <a
            v-else
            :href="link.to || site.cliRepoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors flex items-center gap-1"
          >
            <span>{{ link.label }}</span>
            <Icon name="lucide:arrow-up-right" class="w-3 h-3" />
          </a>
        </template>

        <!-- Travellings 开往 badge -->
        <a
          href="https://www.travellings.cn/go"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="开往 Travellings"
          title="开往 Travellings"
        >
          <img
            src="https://www.travellings.cn/assets/logo.gif"
            alt="开往 Travellings"
            class="h-5 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  </footer>
</template>
