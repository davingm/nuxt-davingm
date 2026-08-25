<script setup lang="ts">
useHead({
	title: "nuxt-app",
	// Inline script dijalankan sebelum paint — cegah FOUC dan fix bfcache
	script: [
		{
			innerHTML: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='dark'||t==='light'){d.classList.add(t)}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){d.classList.add('dark')}else{d.classList.add('light')}}catch(e){}})()`,
			tagPosition: "head",
			tagPriority: "critical",
		},
	],
});
</script>

<template>
  <LoadingBar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>