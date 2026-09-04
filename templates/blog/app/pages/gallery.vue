<script setup lang="ts">
const data = await useUserGallery();

useSeoMeta({
	title: data.seo.title,
	description: data.seo.description,
});

const activeCategory = ref("All");
const selectedPhoto = ref<any>(null);
const isModalOpen = ref(false);

const filteredPhotos = computed(() => {
	if (activeCategory.value === "All") return data.items;
	return data.items.filter((p: any) => p.category === activeCategory.value);
});

const openPhoto = (photo: any) => {
	selectedPhoto.value = photo;
	isModalOpen.value = true;
};
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ data.heading }}
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        {{ data.subheading }}
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-1.5 pb-2 border-b border-neutral-200 dark:border-neutral-800">
      <button
        v-for="cat in data.categories"
        :key="cat"
        type="button"
        class="px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer"
        :class="[
          activeCategory === cat
            ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/60',
        ]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="photo in filteredPhotos"
        :key="photo.id"
        class="group relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] overflow-hidden cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 shadow-xs"
        @click="openPhoto(photo)"
      >
        <div class="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-4/3">
          <img :src="photo.image" :alt="photo.title" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div class="p-2 rounded-full bg-white/90 text-neutral-900 shadow-lg">
              <Icon name="lucide:zoom-in" class="w-4 h-4" />
            </div>
          </div>
          <span class="absolute top-2.5 left-2.5 text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white">
            {{ photo.category }}
          </span>
        </div>
        <div class="p-3.5 space-y-1">
          <h3 class="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">{{ photo.title }}</h3>
          <div class="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>{{ photo.location }}</span>
            <span>{{ photo.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <UiModal v-model="isModalOpen" max-width="4xl">
      <div v-if="selectedPhoto" class="space-y-4">
        <div class="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
          <img :src="selectedPhoto.image" :alt="selectedPhoto.title" class="w-full max-h-[70vh] object-contain mx-auto" />
        </div>
        <div class="space-y-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{ selectedPhoto.title }}</h3>
            <UiBadge variant="subtle" size="sm">{{ selectedPhoto.category }}</UiBadge>
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ selectedPhoto.description }}</p>
          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <div class="flex items-center gap-1.5">
              <Icon name="lucide:camera" class="w-3.5 h-3.5" />
              <span>{{ selectedPhoto.camera }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span>{{ selectedPhoto.location }}</span>
              <span>•</span>
              <span>{{ selectedPhoto.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </UiModal>
  </div>
</template>
