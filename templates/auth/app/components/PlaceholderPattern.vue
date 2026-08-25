<script setup lang="ts">
// useId di-auto-import oleh Nuxt dari Vue 3.5+
const patternId = useId();
</script>

<template>
  <svg
    class="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20"
    fill="none"
  >
    <defs>
      <pattern
        :id="patternId"
        x="0"
        y="0"
        width="8"
        height="8"
        patternUnits="userSpaceOnUse"
      >
        <path d="M-1 1 l2 -2 M0 8 l8 -8 M7 9 l2 -2" stroke-width="1" />
      </pattern>
    </defs>
    <rect
      stroke="none"
      :fill="`url(#${patternId})`"
      width="100%"
      height="100%"
    />
  </svg>
</template>
