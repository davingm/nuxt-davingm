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

const navActions = computed(() =>
	hero.actions.filter((a: any) => !a.socialKey),
);
const socialActions = computed(() =>
	hero.actions.filter((a: any) => !!a.socialKey),
);
</script>

<template>
  <section class="flex flex-col items-center text-center py-10 sm:py-16 space-y-7">
    <!-- Avatar -->
    <img
      :src="profile.avatar"
      :alt="profile.name"
      class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-neutral-200 dark:border-neutral-700 shadow-md"
    />

    <!-- Heading -->
    <div class="space-y-3 max-w-2xl">
      <h1 class="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-[1.2]">
        Hey, I'm {{ profile.name }}<br />
        <span class="text-neutral-500 dark:text-neutral-400 font-medium">{{ profile.role }}</span>
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg mx-auto">
        {{ profile.bio }}
      </p>
    </div>

    <!-- Primary actions + availability badge -->
    <div class="flex flex-wrap items-center justify-center gap-3">
      <template v-for="action in navActions" :key="action.label">
        <UiButton
          :to="action.to"
          :variant="action.variant"
          size="md"
          :icon="action.icon"
          :trailing-icon="action.trailingIcon"
        >
          {{ action.label }}
        </UiButton>
      </template>
      <UiBadge variant="success" size="md" :dot="true">
        {{ profile.availability }}
      </UiBadge>
    </div>

    <!-- Social icon links -->
    <div class="flex items-center justify-center gap-5">
      <a
        v-for="action in socialActions"
        :key="action.label"
        :href="socialMap[action.socialKey]"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="action.label"
        class="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <Icon :name="action.icon" class="w-5 h-5" />
      </a>
    </div>
  </section>
</template>
