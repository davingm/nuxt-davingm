<script setup lang="ts">
// Hero Section
const cliCommand = "npx nuxt-davingm@latest init my-portfolio";
</script>

<template>
  <section class="space-y-8 sm:space-y-10">
    <!-- Status & Available Pill -->
    <div class="flex flex-wrap items-center gap-3">
      <UiBadge variant="success" size="md" :dot="true">
        Available for open source & freelance projects
      </UiBadge>
      <UiBadge variant="subtle" size="md">
        Jakarta, ID (UTC+7)
      </UiBadge>
    </div>

    <!-- Title & Main Bio -->
    <div class="space-y-4 max-w-3xl">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.15]">
        Building elegant web experiences & modern developer tools.
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
        Hi, I'm <span class="text-neutral-900 dark:text-neutral-200 font-medium">Davin</span> — a Full-Stack Engineer specializing in
        <span class="text-neutral-900 dark:text-neutral-200 font-medium">Nuxt 4</span>,
        <span class="text-neutral-900 dark:text-neutral-200 font-medium">Vue.js</span>,
        <span class="text-neutral-900 dark:text-neutral-200 font-medium">TypeScript</span>, and
        <span class="text-neutral-900 dark:text-neutral-200 font-medium">DevOps automation</span>.
        I craft minimalist, fast, and accessible digital products following modern web standards.
      </p>
    </div>

    <!-- CLI Starter Callout (VitePress/Geist style) -->
    <div class="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
          <Icon name="lucide:terminal" class="w-3.5 h-3.5 text-emerald-500" />
          <span>Quickstart via CLI</span>
        </div>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
          Scaffold this exact portfolio starter directly with one terminal command:
        </p>
      </div>

      <UiCopyButton
        :text="cliCommand"
        variant="code-box"
        label="Copy command"
        success-label="Copied!"
      />
    </div>

    <!-- Action Buttons & Socials -->
    <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
      <UiButton to="/projects" variant="primary" size="md" trailing-icon="lucide:arrow-right">
        Explore Projects
      </UiButton>
      <UiButton to="/blog" variant="outline" size="md">
        Read Blog
      </UiButton>
      <UiButton href="https://github.com/davingm" variant="ghost" size="md" icon="simple-icons:github">
        GitHub
      </UiButton>
      <UiButton href="https://x.com/davingm" variant="ghost" size="md" icon="simple-icons:x">
        Twitter
      </UiButton>
      <UiButton href="https://linkedin.com" variant="ghost" size="md" icon="simple-icons:linkedin">
        LinkedIn
      </UiButton>
    </div>
  </section>
</template>
