<script setup lang="ts">
const [profile, site] = await Promise.all([useUserProfile(), useUserSite()]);

useHead({
	titleTemplate: (titleChunk) =>
		titleChunk ? titleChunk : `${profile.name} — ${profile.role}`,
	htmlAttrs: { lang: "en" },
	link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
	meta: [{ name: "description", content: site.seo.description }],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
