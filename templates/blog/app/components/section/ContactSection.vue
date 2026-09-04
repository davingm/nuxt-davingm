<script setup lang="ts">
const [overview, profile, social] = await Promise.all([
	useUserOverview(),
	useUserProfile(),
	useUserSocial(),
]);
const { contact } = overview;
</script>

<template>
  <section class="p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] shadow-xs space-y-6">
    <div class="space-y-2">
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ contact.heading }}
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
        {{ contact.subheading }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3 pt-2">
      <UiCopyButton :text="profile.email" variant="button" :label="contact.actions.copyEmail" :success-label="contact.actions.copyEmailSuccess" />
      <UiButton :href="`mailto:${profile.email}`" variant="primary" size="sm" icon="lucide:mail">
        {{ contact.actions.sendEmail }}
      </UiButton>
      <UiButton :href="social.twitter" variant="outline" size="sm" icon="simple-icons:x">
        {{ contact.actions.dmTwitter }}
      </UiButton>
      <UiButton :href="social.github" variant="ghost" size="sm" icon="simple-icons:github">
        {{ contact.actions.github }}
      </UiButton>
    </div>
  </section>
</template>
