<script setup lang="ts">
const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <p>&copy; {{ year }} Nuxt Davingm Starter. Built with Nuxt & Vue 3.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid var(--border);
  margin-top: auto;
  background: var(--bg);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 40px;
  text-align: center;
}

@media (max-width: 1024px) {
  .footer-container {
    padding: 24px 20px;
  }
}

.footer-content p {
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 400;
}
</style>
