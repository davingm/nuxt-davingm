<script setup lang="ts">
const data = await useUserGallery();

useSeoMeta({
	title: data.seo.title,
	description: data.seo.description,
});

const activeCategory = ref("All");
const selectedPhoto = ref<any>(null);

const filteredPhotos = computed(() => {
	if (activeCategory.value === "All") return data.items;
	return data.items.filter((p: any) => p.category === activeCategory.value);
});

const openPhoto = (photo: any) => {
	selectedPhoto.value = photo;
};

const closePhoto = () => {
	selectedPhoto.value = null;
};

// Keyboard close
const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "Escape") closePhoto();
};
onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="space-y-6 sm:space-y-8">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        {{ data.heading }}
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        {{ data.subheading }}
      </p>
    </div>

    <!-- Category filter -->
    <div class="flex flex-wrap items-center gap-1.5 pb-4 border-b border-neutral-200 dark:border-neutral-800">
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

    <!-- Instagram-style grid: pure images, no text -->
    <div class="grid grid-cols-3 gap-0.5 sm:gap-1">
      <div
        v-for="photo in filteredPhotos"
        :key="photo.id"
        class="group relative aspect-square overflow-hidden cursor-pointer bg-neutral-100 dark:bg-neutral-900"
        @click="openPhoto(photo)"
      >
        <img
          :src="photo.image"
          :alt="photo.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <!-- Hover overlay — just a subtle dim, no text -->
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
          <Icon
            name="lucide:zoom-in"
            class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-md"
          />
        </div>
        <!-- Multi-image indicator (if needed in future) -->
        <div
          v-if="photo.images && photo.images.length > 1"
          class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="lucide:copy" class="w-4 h-4 text-white drop-shadow-md" />
        </div>
      </div>
    </div>
  </div>

  <!-- Instagram-style detail lightbox -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedPhoto"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        @click.self="closePhoto"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm" @click="closePhoto" />

        <!-- Modal panel — Instagram layout: image left, details right on desktop -->
        <div class="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row rounded-xl overflow-hidden bg-white dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 shadow-2xl max-h-[90vh]">

          <!-- Image side -->
          <div class="sm:w-[58%] bg-black flex items-center justify-center shrink-0">
            <img
              :src="selectedPhoto.image"
              :alt="selectedPhoto.title"
              class="w-full max-h-[50vh] sm:max-h-[90vh] object-contain"
            />
          </div>

          <!-- Details side -->
          <div class="sm:w-[42%] flex flex-col overflow-y-auto">
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
              <UiBadge variant="subtle" size="sm">{{ selectedPhoto.category }}</UiBadge>
              <button
                type="button"
                class="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                @click="closePhoto"
              >
                <Icon name="lucide:x" class="w-4 h-4" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-5 space-y-4 flex-1">
              <div>
                <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {{ selectedPhoto.title }}
                </h3>
                <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  {{ selectedPhoto.description }}
                </p>
              </div>

              <!-- Meta details -->
              <div class="space-y-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                <div class="flex items-start gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <Icon name="lucide:camera" class="w-3.5 h-3.5 mt-0.5 shrink-0 text-neutral-400" />
                  <span class="font-mono leading-relaxed">{{ selectedPhoto.camera }}</span>
                </div>
                <div class="flex items-center gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <Icon name="lucide:map-pin" class="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>{{ selectedPhoto.location }}</span>
                </div>
                <div class="flex items-center gap-2.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <Icon name="lucide:calendar" class="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                  <span>{{ selectedPhoto.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Close hint -->
        <button
          type="button"
          class="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors z-20"
          @click="closePhoto"
        >
          <Icon name="lucide:x" class="w-4 h-4" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
