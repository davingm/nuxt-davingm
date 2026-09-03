<script setup lang="ts">
// Index Page
useSeoMeta({
	title: "Davin — Full-Stack Engineer & Nuxt Creator",
	description:
		"Minimalist developer portfolio built with Nuxt 4, VitePress design philosophy, and Vercel Geist aesthetic.",
	ogTitle: "Davin — Full-Stack Engineer & Nuxt Creator",
	ogDescription:
		"Minimalist developer portfolio built with Nuxt 4, VitePress design philosophy, and Vercel Geist aesthetic.",
	ogType: "website",
	twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="space-y-16 sm:space-y-20">
    <!-- 1. Hero Section -->
    <SectionHeroSection />

    <!-- 2. Skills / Tech Stack -->
    <SectionSkillsSection />

    <!-- 3. Featured Projects -->
    <SectionFeaturedProjectsSection />

    <!-- 4. Career / Experience -->
    <SectionExperienceSection />

    <!-- 5. Latest Blog Posts -->
    <SectionLatestPostsSection />

    <!-- 6. Testimonials / Quotes -->
    <SectionTestimonialsSection />

    <!-- 7. FAQ -->
    <SectionFaqSection />

    <!-- 8. Contact & Connect -->
    <SectionContactSection />
  </div>
</template>