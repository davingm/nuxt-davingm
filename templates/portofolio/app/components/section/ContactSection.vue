<script setup lang="ts">
const email = "davin@davingm.com";
</script>

<template>
  <section class="p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#181818] shadow-xs space-y-6">
    <div class="space-y-2">
      <h2 class="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
        Let's build something remarkable together
      </h2>
      <p class="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed">
        Have an exciting project, open-source initiative, or architecture question? Feel free to reach out directly via email or on social platforms.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3 pt-2">
      <UiCopyButton
        :text="email"
        variant="button"
        label="Copy Email"
        success-label="Email copied!"
      />

      <UiButton
        :href="`mailto:${email}`"
        variant="primary"
        size="sm"
        icon="lucide:mail"
      >
        Send Email
      </UiButton>

      <UiButton
        href="https://x.com/davingm"
        variant="outline"
        size="sm"
        icon="simple-icons:x"
      >
        DM on X
      </UiButton>

      <UiButton
        href="https://github.com/davingm"
        variant="ghost"
        size="sm"
        icon="simple-icons:github"
      >
        GitHub
      </UiButton>
    </div>
  </section>
</template>
