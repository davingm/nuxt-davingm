<script setup lang="ts">
const [overview, profile, social] = await Promise.all([
	useUserOverview(),
	useUserProfile(),
	useUserSocial(),
]);

const { hero } = overview;
const socialMap: Record<string, string> = {
	github: social.github,
	twitter: social.twitter,
	linkedin: social.linkedin,
};
</script>

<template>
  <section class="space-y-8 sm:space-y-10">
    <div class="flex flex-wrap items-center gap-3">
      <UiBadge variant="success" size="md" :dot="true">
        {{ profile.availability }}
      </UiBadge>
      <UiBadge variant="subtle" size="md">
        {{ profile.location }}
      </UiBadge>
    </div>

    <div class="space-y-4 max-w-3xl">
      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.15]">
        {{ hero.heading }}
      </h1>
      <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
        Hi, I'm <span class="text-neutral-900 dark:text-neutral-200 font-medium">{{ profile.name }}</span> —
        {{ profile.bio }}
      </p>
    </div>

    <div class="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
          <Icon name="lucide:terminal" class="w-3.5 h-3.5 text-emerald-500" />
          <span>{{ hero.cli.label }}</span>
        </div>
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
          {{ hero.cli.description }}
        </p>
      </div>
      <UiCopyButton :text="hero.cli.command" variant="code-box" label="Copy command" success-label="Copied!" />
    </div>

    <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
      <template v-for="action in hero.actions" :key="action.label">
        <UiButton
          v-if="action.socialKey"
          :href="socialMap[action.socialKey]"
          :variant="action.variant"
          size="md"
          :icon="action.icon"
        >
          {{ action.label }}
        </UiButton>
        <UiButton
          v-else
          :to="action.to"
          :variant="action.variant"
          size="md"
          :icon="action.icon"
          :trailing-icon="action.trailingIcon"
        >
          {{ action.label }}
        </UiButton>
      </template>
    </div>
  </section>
</template>
