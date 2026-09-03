<script setup lang="ts">
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk
			? `${titleChunk}`
			: "Davin — Full-Stack Engineer & Nuxt Creator";
	},
	htmlAttrs: {
		lang: "en",
	},
	link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>