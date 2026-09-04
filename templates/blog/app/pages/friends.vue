<script setup lang="ts">
const data = await useUserFriends();

useSeoMeta({
	title: data.seo.title,
	description: data.seo.description,
});

const isModalOpen = ref(false);
const copied = ref(false);

const copyTemplate = async () => {
	try {
		await navigator.clipboard.writeText(data.prTemplate);
		copied.value = true;
		setTimeout(() => { copied.value = false; }, 2000);
	} catch (err) {
		console.error(err);
	}
};
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {{ data.heading }}
        </h1>
        <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
          {{ data.subheading }}
        </p>
      </div>
      <UiButton variant="primary" size="sm" icon="lucide:plus" @click="isModalOpen = true">
        {{ data.joinButton }}
      </UiButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UiCard v-for="friend in data.items" :key="friend.handle" padding="md" class="flex flex-col justify-between group space-y-4">
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <img :src="friend.avatar" :alt="friend.name" class="w-11 h-11 rounded-full object-cover border border-neutral-200 dark:border-neutral-700 shrink-0" loading="lazy" />
            <div class="min-w-0">
              <h2 class="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">{{ friend.name }}</h2>
              <div class="text-xs text-neutral-500 dark:text-neutral-400 font-mono truncate">{{ friend.handle }}</div>
            </div>
          </div>
          <div class="space-y-1">
            <div class="text-xs font-medium text-neutral-800 dark:text-neutral-200">
              {{ friend.role }} · <span class="text-neutral-400 font-normal">{{ friend.location }}</span>
            </div>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">{{ friend.bio }}</p>
          </div>
        </div>

        <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 space-y-3">
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in friend.tags" :key="tag" class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {{ tag }}
            </span>
          </div>
          <div class="flex items-center justify-between pt-1 text-xs">
            <a :href="friend.siteUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100 hover:underline underline-offset-4">
              <span>{{ data.visitWebsite }}</span>
              <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
            </a>
            <a v-if="friend.githubUrl" :href="friend.githubUrl" target="_blank" rel="noopener noreferrer" class="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors" aria-label="GitHub profile">
              <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </UiCard>
    </div>

    <UiModal v-model="isModalOpen" :title="data.modal.title" max-width="lg">
      <div class="space-y-4">
        <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {{ data.modal.description }}
        </p>
        <div class="relative rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 font-mono text-xs text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">
          {{ data.prTemplate }}
        </div>
        <div class="flex items-center justify-between pt-2">
          <UiButton variant="outline" size="sm" :icon="copied ? 'lucide:check' : 'lucide:copy'" @click="copyTemplate">
            {{ copied ? data.modal.copySuccess : data.modal.copyButton }}
          </UiButton>
          <UiButton href="https://github.com/davingm/nuxt-davingm/issues/new" variant="primary" size="sm" trailing-icon="lucide:arrow-up-right">
            {{ data.modal.submitButton }}
          </UiButton>
        </div>
      </div>
    </UiModal>
  </div>
</template>
