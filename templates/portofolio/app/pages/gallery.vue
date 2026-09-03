<script setup lang="ts">
useSeoMeta({
	title: "Gallery & Visual Diary — Davin",
	description:
		"Visual snapshots of engineering workstations, hardware setups, architecture, and photography.",
});

interface PhotoItem {
	id: string;
	title: string;
	category: "Workspace" | "Gear" | "Architecture" | "Moments";
	date: string;
	location: string;
	camera: string;
	image: string;
	aspectRatio: string;
	description: string;
}

const photos: PhotoItem[] = [
	{
		id: "ws-1",
		title: "Minimalist Dual-Display Workstation",
		category: "Workspace",
		date: "August 2026",
		location: "Home Studio",
		camera: "Sony A7IV · 35mm f/1.8 · 1/125s ISO 100",
		image:
			"https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=85",
		aspectRatio: "aspect-4/3",
		description:
			"Ultra-clean walnut desk setup paired with 4K Studio display, custom mechanical keyboard, and ambient backlighting.",
	},
	{
		id: "gear-1",
		title: "Custom HHKB Mechanical Keyboard",
		category: "Gear",
		date: "July 2026",
		location: "Studio Desk",
		camera: "Fujifilm X-T5 · 23mm f/1.4 · 1/160s ISO 160",
		image:
			"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85",
		aspectRatio: "aspect-16/10",
		description:
			"Topre 45g silent switches with custom dye-sub PBT keycaps and matte black CNC machined aluminum chassis.",
	},
	{
		id: "arch-1",
		title: "Geometric Concrete & Shadows",
		category: "Architecture",
		date: "June 2026",
		location: "Modern Art Center",
		camera: "Leica Q2 · 28mm f/2.8 · 1/500s ISO 50",
		image:
			"https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
		aspectRatio: "aspect-4/3",
		description:
			"Brutalist architectural forms intersecting with crisp morning sunlight and geometric shadows.",
	},
	{
		id: "ws-2",
		title: "Nighttime Coding & Ambient Glow",
		category: "Workspace",
		date: "May 2026",
		location: "Night Lab",
		camera: "Sony A7IV · 50mm f/1.4 · 1/60s ISO 800",
		image:
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=85",
		aspectRatio: "aspect-16/9",
		description:
			"Deep focus nighttime development session working on Nuxt 4 core modules and CLI scaffolding logic.",
	},
	{
		id: "gear-2",
		title: "Everyday Developer Carry",
		category: "Gear",
		date: "April 2026",
		location: "Transit",
		camera: "Ricoh GR IIIx · 40mm f/2.8 · 1/200s ISO 200",
		image:
			"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85",
		aspectRatio: "aspect-4/3",
		description:
			"Apple Silicon M3 Max workstation, noise-cancelling headphones, and physical engineering notebook.",
	},
	{
		id: "moments-1",
		title: "Open Source Community Hackathon",
		category: "Moments",
		date: "March 2026",
		location: "Tech Hub",
		camera: "Sony A7IV · 24-70mm f/2.8 · 1/250s ISO 400",
		image:
			"https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
		aspectRatio: "aspect-16/10",
		description:
			"Collaborating on open-source web tooling and developer experience benchmarking with frontend enthusiasts.",
	},
];

const categories = [
	"All",
	"Workspace",
	"Gear",
	"Architecture",
	"Moments",
] as const;
const activeCategory = ref<string>("All");
const selectedPhoto = ref<PhotoItem | null>(null);
const isModalOpen = ref(false);

const filteredPhotos = computed(() => {
	if (activeCategory.value === "All") return photos;
	return photos.filter((p) => p.category === activeCategory.value);
});

const openPhoto = (photo: PhotoItem) => {
	selectedPhoto.value = photo;
	isModalOpen.value = true;
};
</script>

<template>
  <div class="space-y-8 sm:space-y-10">
    <!-- Header -->
    <div class="space-y-2">
      <h1 class="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Gallery & Visual Diary
      </h1>
      <p class="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
        A collection of engineering workspaces, physical hardware gear, and photography captures.
      </p>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex flex-wrap items-center gap-1.5 pb-2 border-b border-neutral-200 dark:border-neutral-800">
      <button
        v-for="cat in categories"
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

    <!-- Masonry/Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="photo in filteredPhotos"
        :key="photo.id"
        class="group relative rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] overflow-hidden cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200 shadow-xs"
        @click="openPhoto(photo)"
      >
        <div class="relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 aspect-4/3">
          <img
            :src="photo.image"
            :alt="photo.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
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
          <h3 class="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
            {{ photo.title }}
          </h3>
          <div class="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
            <span>{{ photo.location }}</span>
            <span>{{ photo.date }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Lightbox Modal -->
    <UiModal
      v-model="isModalOpen"
      max-width="4xl"
    >
      <div v-if="selectedPhoto" class="space-y-4">
        <div class="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
          <img
            :src="selectedPhoto.image"
            :alt="selectedPhoto.title"
            class="w-full max-h-[70vh] object-contain mx-auto"
          />
        </div>

        <div class="space-y-2">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {{ selectedPhoto.title }}
            </h3>
            <UiBadge variant="subtle" size="sm">
              {{ selectedPhoto.category }}
            </UiBadge>
          </div>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ selectedPhoto.description }}
          </p>

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
