<script setup lang="ts">
const { theme, toggleTheme, initTheme } = useTheme();
const { user, isAuthenticated, logout } = useAuth();

onMounted(() => {
	initTheme();
});
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="brand">
        <NuxtLink to="/" class="logo-link">
          <Icon name="simple-icons:nuxtdotjs" class="brand-icon" />
          <span class="brand-title">Nuxt Auth Starter</span>
        </NuxtLink>
      </div>

      <div class="right-actions">
        <nav class="nav-links">
          <NuxtLink to="/" class="nav-item" exact-active-class="active">Home</NuxtLink>
          <NuxtLink v-if="isAuthenticated" to="/dashboard" class="nav-item" exact-active-class="active">Dashboard</NuxtLink>
          <a href="https://nuxt.com/docs" target="_blank" rel="noopener" class="nav-item">Docs</a>
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
  gap: 20px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
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

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.user-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #09ff00;
  color: #000;
  font-weight: 700;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-h);
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn-sm-logout {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    color: #fff;
  }
}

.auth-btn-icon {
  width: 16px;
  height: 16px;
}

.btn-login {
  color: var(--text-h);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background: var(--card-bg);
  }
}

.btn-register {
  background: #09ff00;
  color: #000000;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #07d600;
    transform: translateY(-1px);
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
