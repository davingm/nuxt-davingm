<script setup lang="ts">
interface Props {
	images: string[];
	alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
	alt: "Project image",
});

const current = ref(0);

const prev = (e: Event) => {
	e.preventDefault();
	e.stopPropagation();
	current.value = (current.value - 1 + props.images.length) % props.images.length;
};

const next = (e: Event) => {
	e.preventDefault();
	e.stopPropagation();
	current.value = (current.value + 1) % props.images.length;
};

const goTo = (i: number, e: Event) => {
	e.preventDefault();
	e.stopPropagation();
	current.value = i;
};
</script>

<template>
  <div class="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-t-lg group/carousel select-none">
    <!-- Images -->
    <div
      class="flex transition-transform duration-300 ease-in-out h-44 sm:h-52"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <img
        v-for="(img, i) in images"
        :key="i"
        :src="img"
        :alt="`${alt} ${i + 1}`"
        class="w-full h-full shrink-0 object-cover"
        loading="lazy"
        draggable="false"
      />
    </div>

    <!-- Prev/Next buttons — only show when multiple images -->
    <template v-if="images.length > 1">
      <button
        type="button"
        class="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
        @click="prev"
      >
        <Icon name="lucide:chevron-left" class="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10"
        @click="next"
      >
        <Icon name="lucide:chevron-right" class="w-3.5 h-3.5" />
      </button>

      <!-- Dots -->
      <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
        <button
          v-for="(_, i) in images"
          :key="i"
          type="button"
          class="w-1.5 h-1.5 rounded-full transition-all"
          :class="i === current ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'"
          @click="goTo(i, $event)"
        />
      </div>

      <!-- Counter badge -->
      <div class="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/40 text-white text-[10px] font-mono z-10">
        {{ current + 1 }}/{{ images.length }}
      </div>
    </template>
  </div>
</template>
