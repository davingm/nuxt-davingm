<script setup lang="ts">
const userService = useUserService();

const {
	data: users,
	pending,
	error,
} = await useAsyncData("users", () => userService.getAll());
</script>

<template>
  <section class="user-section">
    <div class="section-header">
      <h2>Users API Demo</h2>
      <p class="section-desc">Sample data fetched using <code>useUserService()</code></p>
    </div>

    <div v-if="pending" class="user-status loading">
      <span>Loading users...</span>
    </div>

    <div v-else-if="error" class="user-status error">
      <p>Failed to load users from API.</p>
      <span class="error-detail">{{ error.message }}</span>
    </div>

    <div v-else-if="users && users.length" class="user-grid">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-avatar">
          {{ user.name.charAt(0) }}
        </div>
        <div class="user-info">
          <h3 class="user-name">{{ user.name }}</h3>
          <p v-if="user.email" class="user-email">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <div v-else class="user-status empty">
      <p>No users found.</p>
    </div>
  </section>
</template>

<style scoped>
.user-section {
  padding: 32px;
  border-top: 1px solid var(--border);
}

.section-header {
  text-align: center;
  margin-bottom: 24px;
}

.section-desc {
  font-size: 0.95rem;
  color: var(--text);
  margin-top: 4px;
}

.user-status {
  text-align: center;
  padding: 24px;
  background: var(--code-bg);
  border-radius: 8px;
  color: var(--text-h);
}

.user-status.error {
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #ef4444;
}

.error-detail {
  display: block;
  font-size: 0.85rem;
  margin-top: 6px;
  opacity: 0.8;
}

.user-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  background: var(--social-bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-bg);
  color: var(--accent);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-info {
  overflow: hidden;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--text-h);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.85rem;
  color: var(--text);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
