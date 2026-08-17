<script setup lang="ts">
const { theme, toggleTheme } = useTheme();
const { user, isAuthenticated, logout } = useAuth();
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <NuxtLink to="/" class="logo-link">
          <Icon name="simple-icons:nuxt" class="brand-icon" />
          <span class="brand-title">Nuxt Auth Starter</span>
        </NuxtLink>
      </div>

      <div class="right-actions">
        <nav class="nav-links">
          <NuxtLink to="/" class="nav-item" exact-active-class="active">Home</NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/dashboard" class="nav-item" exact-active-class="active">Dashboard</NuxtLink>
          <a href="https://nuxt.davingm.com/templates/auth/getting-started.html" target="_blank" rel="noopener" class="nav-item">Docs</a>
        </nav>

        <div class="auth-buttons">
          <template v-if="isAuthenticated">
            <div class="user-badge">
              <span class="user-avatar">{{ user?.name?.charAt(0).toUpperCase() }}</span>
              <span class="user-name">{{ user?.name }}</span>
            </div>
            <button type="button" class="btn-sm-logout" title="Keluar" @click="logout">
              <Icon name="heroicons:arrow-right-on-rectangle-20-solid" class="auth-btn-icon" />
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn-login">Masuk</NuxtLink>
            <NuxtLink to="/register" class="btn-register">Daftar</NuxtLink>
          </template>
        </div>

        <button
          type="button"
          class="theme-toggle"
          :aria-label="`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`"
          @click="toggleTheme"
        >
          <ClientOnly>
            <Icon v-if="theme === 'dark'" name="heroicons:sun-20-solid" class="theme-icon" />
            <Icon v-else name="heroicons:moon-20-solid" class="theme-icon" />
            <span class="theme-label">{{ theme === 'light' ? 'Dark' : 'Light' }}</span>
            <template #fallback>
              <Icon name="heroicons:moon-20-solid" class="theme-icon" />
              <span class="theme-label">Dark</span>
            </template>
          </ClientOnly>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 80%, transparent);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border-bottom: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
  transition: background 0.3s ease, border-color 0.3s ease;
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .header-container {
    padding: 0 20px;
  }
}

.brand {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 9px;
  text-decoration: none;
  color: var(--text-h);
  font-weight: 600;
  font-size: 0.9375rem;
  letter-spacing: -0.02em;
  transition: opacity 0.15s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.brand-icon {
  width: 20px;
  height: 20px;
  color: #09ff00;
  flex-shrink: 0;
}

.brand-title {
  font-family: var(--heading);
  white-space: nowrap;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-item {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 450;
  padding: 6px 12px;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
  letter-spacing: -0.01em;
  line-height: 1.25rem;
}

.nav-item:hover {
  color: var(--text-h);
  background: color-mix(in srgb, var(--text-h) 6%, transparent);
}

.nav-item.active {
  color: var(--text-h);
  background: color-mix(in srgb, var(--text-h) 8%, transparent);
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: 6px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 3px 12px 3px 3px;
  background: color-mix(in srgb, var(--text-h) 5%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 100px;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.user-badge:hover {
  border-color: color-mix(in srgb, var(--border) 120%, transparent);
  background: color-mix(in srgb, var(--text-h) 7%, transparent);
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #09ff00;
  color: #000;
  font-weight: 600;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: -0.02em;
}

.user-name {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-h);
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.btn-sm-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-muted);
  border-radius: 8px;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}

.btn-sm-logout:hover {
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.auth-btn-icon {
  width: 15px;
  height: 15px;
}

.btn-login {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 450;
  padding: 6px 14px;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
  letter-spacing: -0.01em;
  line-height: 1.25rem;
}

.btn-login:hover {
  color: var(--text-h);
  background: color-mix(in srgb, var(--text-h) 6%, transparent);
}

.btn-register {
  background: var(--text-h);
  color: var(--bg);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 8px;
  transition: opacity 0.15s ease;
  letter-spacing: -0.01em;
  line-height: 1.25rem;
}

.btn-register:hover {
  opacity: 0.85;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  margin-left: 4px;
  background: transparent;
  border: 1px solid color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.8125rem;
  font-weight: 450;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
  letter-spacing: -0.01em;
  line-height: 1.25rem;
}

.theme-toggle:hover {
  color: var(--text-h);
  border-color: color-mix(in srgb, var(--border) 140%, transparent);
  background: color-mix(in srgb, var(--text-h) 5%, transparent);
}

.theme-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}
</style>