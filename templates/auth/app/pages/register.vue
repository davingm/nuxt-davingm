<script setup lang="ts">
definePageMeta({
	middleware: "guest",
	layout: "auth",
});

const { register } = useAuth();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const handleRegister = async () => {
	if (!name.value || !email.value || !password.value || !passwordConfirmation.value) {
		errorMessage.value = "Silakan isi semua bidang.";
		return;
	}

	if (password.value !== passwordConfirmation.value) {
		errorMessage.value = "Konfirmasi password tidak cocok.";
		return;
	}

	if (password.value.length < 6) {
		errorMessage.value = "Password minimal 6 karakter.";
		return;
	}

	isLoading.value = true;
	errorMessage.value = "";

	try {
		await register({
			name: name.value,
			email: email.value,
			password: password.value,
			password_confirmation: passwordConfirmation.value,
		});
		router.push("/dashboard");
	} catch (err: unknown) {
		const e = err as { data?: { statusMessage?: string }; message?: string };
		errorMessage.value =
			e.data?.statusMessage ||
			e.message ||
			"Registrasi gagal. Silakan coba lagi.";
	} finally {
		isLoading.value = false;
	}
};
</script>

<template>
  <div class="split-screen">

    <!-- Kiri: Form -->
    <div class="form-side">
      <div class="form-inner">

        <!-- Logo -->
        <div class="brand">
          <div class="brand-icon">
            <Icon name="simple-icons:nuxtdotjs" class="brand-logo" />
          </div>
        </div>

        <h1 class="form-title">Buat akun baru</h1>
        <p class="form-subtitle">Sudah punya akun? <NuxtLink to="/login" class="link">Masuk di sini</NuxtLink></p>

        <!-- Error -->
        <div v-if="errorMessage" class="error-box" role="alert">
          <Icon name="heroicons:exclamation-circle-20-solid" class="error-icon" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Form -->
        <form class="form" @submit.prevent="handleRegister">
          <div class="field">
            <label for="name" class="label">Nama Lengkap</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="John Doe"
              autocomplete="name"
              required
              class="input"
            />
          </div>

          <div class="field">
            <label for="email" class="label">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="nama@email.com"
              autocomplete="email"
              required
              class="input"
            />
          </div>

          <div class="field">
            <label for="password" class="label">Password</label>
            <div class="input-wrap">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimal 6 karakter"
                autocomplete="new-password"
                required
                class="input"
              />
              <button
                type="button"
                class="eye-btn"
                :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                @click="showPassword = !showPassword"
              >
                <Icon
                  :name="showPassword ? 'heroicons:eye-slash-20-solid' : 'heroicons:eye-20-solid'"
                  class="eye-icon"
                />
              </button>
            </div>
          </div>

          <div class="field">
            <label for="password_confirmation" class="label">Konfirmasi Password</label>
            <div class="input-wrap">
              <input
                id="password_confirmation"
                v-model="passwordConfirmation"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ulangi password"
                autocomplete="new-password"
                required
                class="input"
              />
            </div>
          </div>

          <button type="submit" :disabled="isLoading" class="btn-submit">
            <Icon v-if="isLoading" name="heroicons:arrow-path-20-solid" class="spin-icon" />
            <span>{{ isLoading ? "Memproses..." : "Buat Akun" }}</span>
          </button>
        </form>

      </div>
    </div>

    <!-- Kanan: Panel dekoratif -->
    <div class="deco-side" aria-hidden="true">
      <div class="deco-content">
        <div class="dot-grid" />
        <div class="deco-text">
          <p class="deco-label">Nuxt Auth Starter</p>
          <h2 class="deco-heading">Satu langkah untuk memulai.</h2>
          <p class="deco-desc">Buat akun dan langsung eksplorasi. Tidak ada konfigurasi rumit, tidak ada server database eksternal yang diperlukan.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ─── Layout ─────────────────────────────────────────────────────────────── */
.split-screen {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* ─── Kiri: Form Side ────────────────────────────────────────────────────── */
.form-side {
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  background-color: var(--bg);
  box-sizing: border-box;
  overflow-y: auto;
}

.form-inner {
  width: 100%;
  max-width: 360px;
  padding: 8px 0;
}

/* Brand */
.brand {
  margin-bottom: 32px;
}

.brand-icon {
  display: inline-flex;
  padding: 10px;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 12px;
}

.brand-logo {
  width: 28px;
  height: 28px;
  color: var(--accent);
}

/* Heading */
.form-title {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.form-subtitle {
  font-size: 0.875rem;
  color: var(--text);
  margin: 0 0 32px;
}

.link {
  color: var(--text-h);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.link:hover {
  opacity: 0.75;
}

/* Error */
.error-box {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 8px;
  color: #dc2626;
  font-size: 0.875rem;
  margin-bottom: 20px;
}

.error-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-h);
  letter-spacing: 0.2px;
}

.input {
  width: 100%;
  padding: 10px 14px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-h);
  font-size: 0.9rem;
  font-family: var(--sans);
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.input::placeholder {
  color: var(--text);
  opacity: 0.6;
}

.input:focus {
  outline: none;
  border-color: var(--text-h);
  box-shadow: 0 0 0 3px var(--accent-bg);
}

/* Password wrapper */
.input-wrap {
  position: relative;
}

.input-wrap .input {
  padding-right: 42px;
}

.eye-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: var(--text);
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.eye-btn:hover {
  color: var(--text-h);
}

.eye-icon {
  width: 17px;
  height: 17px;
}

/* Submit button */
.btn-submit {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 11px;
  margin-top: 4px;
  background: var(--text-h);
  color: var(--bg);
  font-size: 0.9rem;
  font-weight: 600;
  font-family: var(--sans);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.85;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spin-icon {
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Kanan: Deco Side ───────────────────────────────────────────────────── */
.deco-side {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: var(--text-h);
  display: flex;
  align-items: flex-end;
}

.deco-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 56px 52px;
  box-sizing: border-box;
}

/* Dot grid pattern */
.dot-grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
    circle,
    color-mix(in srgb, var(--bg) 18%, transparent) 1px,
    transparent 1px
  );
  background-size: 24px 24px;
  opacity: 0.7;
}

/* Glow blob */
.deco-content::before {
  content: "";
  position: absolute;
  top: -80px;
  right: -80px;
  width: 480px;
  height: 480px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--bg) 12%, transparent) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.deco-text {
  position: relative;
  z-index: 1;
  max-width: 400px;
}

.deco-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--bg) 50%, transparent);
  margin-bottom: 12px;
}

.deco-heading {
  font-size: 2.1rem;
  font-weight: 700;
  line-height: 1.15;
  color: var(--bg);
  margin: 0 0 16px;
  letter-spacing: -0.5px;
}

.deco-desc {
  font-size: 0.95rem;
  line-height: 1.65;
  color: color-mix(in srgb, var(--bg) 65%, transparent);
}

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .split-screen {
    flex-direction: column;
  }

  .form-side {
    max-width: 100%;
    padding: 40px 24px;
  }

  .deco-side {
    min-height: 200px;
    flex: none;
    order: -1;
  }

  .deco-content {
    padding: 32px 28px;
  }

  .deco-heading {
    font-size: 1.5rem;
  }
}
</style>
