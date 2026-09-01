<script setup lang="ts">
const { theme, toggleTheme, initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <NuxtLink to="/" class="logo-link">
          <Icon name="simple-icons:nuxtdotjs" class="brand-icon" />
          <span class="brand-title">Default Starter</span>
        </NuxtLink>
      </div>

      <div class="right-actions">
        <nav class="nav-links">
          <NuxtLink to="/" class="nav-item" exact-active-class="active">Home</NuxtLink>
          <a href="https://nuxt.com/docs" target="_blank" rel="noopener" class="nav-item">Docs</a>
          <a href="https://github.com/vitejs/vite" target="_blank" rel="noopener" class="nav-item">GitHub</a>
        </nav>

        <button
          type="button"
          class="theme-toggle"
          :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
          @click="toggleTheme"
        >
          <Icon v-if="theme === 'dark'" name="heroicons:sun-20-solid" class="theme-icon" />
          <Icon v-else name="heroicons:moon-20-solid" class="theme-icon" />
          <span class="theme-label">{{ theme === 'light' ? 'Dark' : 'Light' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 18px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .header-container {
    padding: 16px 20px;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--text-h);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: -0.3px;
}

.brand-icon {
  width: 24px;
  height: 24px;
  color: #09ff00;
}

.brand-title {
  font-family: var(--heading);
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-item {
  color: var(--text);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover,
  &.active {
    color: var(--text-h);
  }
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  color: var(--text-h);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--text-h);
  transform: translateY(-1px);
  box-shadow: var(--shadow);
}

.theme-icon {
  width: 18px;
  height: 18px;
}
</style>
