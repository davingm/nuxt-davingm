<script setup lang="ts">
interface Props {
	modelValue: boolean;
	title?: string;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	maxWidth: "lg",
});

const emit = defineEmits<{
	"update:modelValue": [value: boolean];
}>();

const close = () => {
	emit("update:modelValue", false);
};

const maxWidthClass = computed(() => {
	switch (props.maxWidth) {
		case "sm":
			return "max-w-sm";
		case "md":
			return "max-w-md";
		case "xl":
			return "max-w-xl";
		case "2xl":
			return "max-w-2xl";
		case "4xl":
			return "max-w-4xl";
		default:
			return "max-w-lg";
	}
});

// Close on escape key
const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "Escape" && props.modelValue) {
		close();
	}
};

onMounted(() => {
	window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
	window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
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
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="close"
        />

        <!-- Dialog Box -->
        <div
          class="relative w-full rounded-xl bg-white dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10"
          :class="maxWidthClass"
        >
          <!-- Header -->
          <div
            v-if="title || $slots.header"
            class="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800"
          >
            <slot name="header">
              <h3 class="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {{ title }}
              </h3>
            </slot>
            <button
              type="button"
              class="p-1 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              @click="close"
            >
              <Icon name="lucide:x" class="w-4 h-4" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-3 px-6 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-800"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
