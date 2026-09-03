<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(`blog-${route.path}`, () => {
	if (typeof queryCollection === "function") {
		return queryCollection("blog").path(route.path).first();
	}
	return null;
});

// Dynamic SEO
useSeoMeta({
	title: computed(() =>
		page.value?.title ? `${page.value.title} — Davin` : "Blog Article — Davin",
	),
	description: computed(
		() => page.value?.description || "Technical article by Davin",
	),
	ogTitle: computed(() => page.value?.title),
	ogDescription: computed(() => page.value?.description),
});

const shareUrl = computed(() => {
	if (import.meta.client) {
		return window.location.href;
	}
	return "";
});
</script>

<template>
  <div class="max-w-3xl mx-auto space-y-8 sm:space-y-10">
    <!-- Back button -->
    <div>
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
      >
        <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
        <span>Back to all articles</span>
      </NuxtLink>
    </div>

    <!-- Article Header -->
    <header class="space-y-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
      <!-- Tag Pills -->
      <div v-if="page?.tags && page.tags.length" class="flex flex-wrap gap-1.5">
        <UiBadge
          v-for="tag in page.tags"
          :key="tag"
          variant="subtle"
          size="sm"
        >
          #{{ tag }}
        </UiBadge>
      </div>

      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight">
        {{ page?.title }}
      </h1>

      <p v-if="page?.description" class="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {{ page.description }}
      </p>

      <!-- Metadata & Author Card -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-neutral-500 dark:text-neutral-400">
        <div class="flex items-center gap-3">
          <img
            v-if="page?.author?.avatar"
            :src="page.author.avatar"
            :alt="page.author.name"
            class="w-8 h-8 rounded-full object-cover border border-neutral-200 dark:border-neutral-700"
          />
          <div>
            <div class="font-medium text-neutral-900 dark:text-neutral-100">
              {{ page?.author?.name || 'Davin' }}
            </div>
            <div class="text-[11px] text-neutral-400 font-mono">
              {{ page?.date }} · {{ page?.readTime || '5 min read' }}
            </div>
          </div>
        </div>

        <UiCopyButton
          v-if="shareUrl"
          :text="shareUrl"
          variant="button"
          label="Share link"
          success-label="Link copied!"
        />
      </div>
    </header>

    <!-- Main Content Renderer -->
    <article class="prose dark:prose-invert max-w-none">
      <ContentRenderer v-if="page" :value="page" />
      <div v-else class="py-12 text-center text-sm text-neutral-500">
        Article content is loading or unavailable.
      </div>
    </article>

    <!-- Bottom Navigation Footer -->
    <footer class="pt-8 mt-12 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
      <NuxtLink
        to="/blog"
        class="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium"
      >
        <Icon name="lucide:arrow-left" class="w-3.5 h-3.5" />
        <span>All articles</span>
      </NuxtLink>

      <a
        href="https://x.com/davingm"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
      >
        <span>Discuss on X</span>
        <Icon name="lucide:arrow-up-right" class="w-3.5 h-3.5" />
      </a>
    </footer>
  </div>
</template>
