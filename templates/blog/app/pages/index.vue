<script setup lang="ts">
const overview = await useUserOverview();

useSeoMeta({
	title: overview.seo.title,
	description: overview.seo.description,
	ogTitle: overview.seo.title,
	ogDescription: overview.seo.description,
	ogType: "website",
	twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="space-y-16 sm:space-y-20">
    <SectionHeroSection />
    <SectionSkillsSection />
    <SectionFeaturedProjectsSection />
    <SectionExperienceSection />
    <SectionLatestPostsSection />
    <SectionTestimonialsSection />
    <SectionFaqSection />
    <SectionContactSection />
  </div>
</template>
