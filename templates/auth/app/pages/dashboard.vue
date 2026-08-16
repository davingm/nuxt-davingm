<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

const { user, logout } = useAuth();
const isLoggingOut = ref(false);

const handleLogout = async () => {
	isLoggingOut.value = true;
	await logout();
};
</script>

<template>
  <div class="dashboard-page">
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div class="user-greeting">
          <div class="avatar-circle">
            {{ user?.name?.charAt(0).toUpperCase() || 'U' }}
          </div>
          <div>
            <h1 class="welcome-title">Halo, {{ user?.name }}!</h1>
            <p class="welcome-subtitle">Selamat datang di Dasbor Anda</p>
          </div>
        </div>

        <button class="btn-logout" :disabled="isLoggingOut" @click="handleLogout">
          <Icon name="heroicons:arrow-right-on-rectangle-20-solid" class="btn-icon" />
          <span>{{ isLoggingOut ? 'Keluar...' : 'Keluar' }}</span>
        </button>
      </div>

      <div class="cards-grid">
        <div class="info-card">
          <div class="card-icon-wrapper">
            <Icon name="heroicons:user-20-solid" class="card-icon" />
          </div>
          <div class="card-content">
            <span class="card-label">Nama Pengguna</span>
            <span class="card-value">{{ user?.name }}</span>
          </div>
        </div>

        <div class="info-card">
          <div class="card-icon-wrapper">
            <Icon name="heroicons:envelope-20-solid" class="card-icon" />
          </div>
          <div class="card-content">
            <span class="card-label">Alamat Email</span>
            <span class="card-value">{{ user?.email }}</span>
          </div>
        </div>

        <div class="info-card">
          <div class="card-icon-wrapper">
            <Icon name="heroicons:identification-20-solid" class="card-icon" />
          </div>
          <div class="card-content">
            <span class="card-label">ID Pengguna</span>
            <span class="card-value">#{{ user?.id }}</span>
          </div>
        </div>

        <div class="info-card">
          <div class="card-icon-wrapper">
            <Icon name="heroicons:check-badge-20-solid" class="card-icon" />
          </div>
          <div class="card-content">
            <span class="card-label">Status Sesi</span>
            <span class="status-badge">Terotentikasi</span>
          </div>
        </div>
      </div>

      <div class="details-section">
        <h2 class="section-title">Informasi Sistem Starter Kit</h2>
        <div class="system-box">
          <p>Sistem otentikasi ini dikonfigurasi dengan modularitas database penuh:</p>
          <ul>
            <li><strong>Driver Default:</strong> SQLite (lokal, tanpa instalasi server DB eksternal)</li>
            <li><strong>Konfigurasi Berkelanjutan:</strong> Menggunakan variabel lingkungan <code>.env</code> seperti Laravel (<code>DB_CONNECTION</code>, <code>DB_HOST</code>, <code>DB_PORT</code>, dll.)</li>
            <li><strong>Optimasi Paket:</strong> Ringan dan berjalan sepenuhnya di mesin pengguna.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 32px;
  background: var(--card-bg, #1a1a1a);
  border: 1px solid var(--border, #333);
  border-radius: 16px;
  backdrop-filter: blur(12px);
}

.user-greeting {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #09ff00, #048200);
  color: #000;
  font-weight: 800;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(9, 255, 0, 0.2);
}

.welcome-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-h, #ffffff);
  margin: 0 0 4px 0;
}

.welcome-subtitle {
  font-size: 0.9rem;
  color: var(--text, #a1a1aa);
  margin: 0;
}

.btn-logout {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #ef4444;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #ef4444;
    color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: var(--card-bg, #1a1a1a);
  border: 1px solid var(--border, #333);
  border-radius: 12px;
}

.card-icon-wrapper {
  padding: 12px;
  background: rgba(9, 255, 0, 0.08);
  border-radius: 10px;
  color: #09ff00;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  width: 22px;
  height: 22px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.card-label {
  font-size: 0.8rem;
  color: var(--text, #a1a1aa);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-h, #ffffff);
}

.status-badge {
  display: inline-block;
  padding: 2px 10px;
  background: rgba(9, 255, 0, 0.15);
  color: #09ff00;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.details-section {
  background: var(--card-bg, #1a1a1a);
  border: 1px solid var(--border, #333);
  border-radius: 16px;
  padding: 28px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-h, #ffffff);
  margin-bottom: 16px;
}

.system-box {
  color: var(--text, #a1a1aa);
  font-size: 0.95rem;
  line-height: 1.6;

  code {
    background: var(--bg, #0b0b0b);
    padding: 2px 8px;
    border-radius: 4px;
    color: #09ff00;
    font-family: monospace;
  }

  ul {
    margin-top: 12px;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
