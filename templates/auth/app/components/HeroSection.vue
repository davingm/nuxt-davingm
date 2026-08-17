<script setup lang="ts">
</script>

<template>
  <section id="center">
    <div class="hero">
      <div class="hero-icons">
        <Icon name="simple-icons:nuxt" class="hero-brand-icon nuxt-icon" />
        <span class="hero-icon-divider">+</span>
        <Icon name="simple-icons:vite" class="hero-brand-icon vite-icon" />
      </div>
      <span class="hero-badge">
        <Icon name="simple-icons:nuxt" class="badge-icon" />
        Nuxt 4 Starter Template
      </span>
    </div>
    
    <div class="hero-text">
      <h1>Get Started</h1>
      <p>Edit <code>app/pages/index.vue</code> and save to test <code>HMR</code></p>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.hero-icons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hero-brand-icon {
  width: 48px;
  height: 48px;
  color: var(--text-h);
}

.hero-icon-divider {
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--text);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 6px 16px;
  background: var(--card-bg);
  color: var(--text-h);
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow: var(--shadow);
}

.badge-icon {
  width: 16px;
  height: 16px;
}

.hero-text {
  text-align: center;
  max-width: 700px;
}
</style>
