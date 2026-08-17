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
	if (
		!name.value ||
		!email.value ||
		!password.value ||
		!passwordConfirmation.value
	) {
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
  <div class="flex items-center justify-center min-h-screen w-full relative overflow-y-auto bg-[var(--bg)]">

    <!-- Logo kiri atas -->
    <div class="absolute top-6 left-8 z-10 flex items-center max-[480px]:top-4 max-[480px]:left-5">
      <NuxtLink to="/">
        <Icon name="simple-icons:nuxtdotjs" class="w-[26px] h-[26px] text-[var(--text-h)]" />
      </NuxtLink>
    </div>

    <!-- Form container -->
    <div class="w-full max-w-[420px] px-6 py-8 max-[480px]:px-4 max-[480px]:py-6">
      <div class="w-full flex flex-col">

        <h1 class="text-2xl font-bold text-[var(--text-h)] mb-2 -tracking-[0.4px] leading-tight">Buat akun baru</h1>
        <p class="text-sm text-[var(--text-muted)] mb-6 leading-[1.45]">
          Sudah punya akun? <NuxtLink to="/login" class="text-[var(--text-h)] font-semibold no-underline transition-opacity duration-150 hover:opacity-70">Masuk di sini</NuxtLink>
        </p>

        <!-- Social Login -->
        <div class="grid grid-cols-3 gap-2 mb-2">
          <button type="button" class="social-btn" @click="() => {}">
            <Icon name="simple-icons:google" class="w-4 h-4 shrink-0" />
            <span class="-tracking-[0.01em] max-[480px]:hidden">Google</span>
          </button>
          <button type="button" class="social-btn" @click="() => {}">
            <Icon name="simple-icons:apple" class="w-4 h-4 shrink-0" />
            <span class="-tracking-[0.01em] max-[480px]:hidden">Apple</span>
          </button>
          <button type="button" class="social-btn" @click="() => {}">
            <Icon name="simple-icons:github" class="w-4 h-4 shrink-0" />
            <span class="-tracking-[0.01em] max-[480px]:hidden">GitHub</span>
          </button>
        </div>

        <button type="button" class="sso-btn" @click="() => {}">
          <Icon name="heroicons:arrow-right-on-rectangle-20-solid" class="w-[15px] h-[15px] shrink-0 opacity-60" />
          <span class="-tracking-[0.01em]">Lanjutkan dengan SSO</span>
        </button>

        <!-- Divider -->
        <div class="flex items-center gap-[14px] mb-5">
          <span class="flex-1 h-px bg-[var(--border)]" />
          <span class="text-xs font-[450] text-[var(--text-muted)] tracking-[0.02em] shrink-0 whitespace-nowrap max-[480px]:text-[0.6875rem]">atau daftar dengan email</span>
          <span class="flex-1 h-px bg-[var(--border)]" />
        </div>

        <!-- Error -->
        <div v-if="errorMessage" class="flex items-start gap-[10px] px-[14px] py-[11px] bg-red-500/[0.06] border border-red-500/20 rounded-lg text-red-600 text-[0.8125rem] mb-4 leading-[1.45]" role="alert">
          <Icon name="heroicons:exclamation-circle-20-solid" class="w-4 h-4 shrink-0 mt-[1px]" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Form -->
        <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
          <div class="flex flex-col gap-[6px]">
            <label for="name" class="text-[0.8125rem] font-[550] text-[var(--text-h)] -tracking-[0.01em]">Nama Lengkap</label>
            <input
              id="name"
              v-model="name"
              type="text"
              placeholder="John Doe"
              autocomplete="name"
              required
              class="input-field"
            />
          </div>

          <div class="flex flex-col gap-[6px]">
            <label for="email" class="text-[0.8125rem] font-[550] text-[var(--text-h)] -tracking-[0.01em]">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="nama@email.com"
              autocomplete="email"
              required
              class="input-field"
            />
          </div>

          <div class="flex flex-col gap-[6px]">
            <label for="password" class="text-[0.8125rem] font-[550] text-[var(--text-h)] -tracking-[0.01em]">Password</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimal 6 karakter"
                autocomplete="new-password"
                required
                class="input-field pr-10"
              />
              <button
                type="button"
                class="absolute right-[10px] top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-[3px] text-[var(--text-muted)] flex items-center transition-colors duration-150 hover:text-[var(--text-h)]"
                :aria-label="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
                @click="showPassword = !showPassword"
              >
                <Icon
                  :name="showPassword ? 'heroicons:eye-slash-20-solid' : 'heroicons:eye-20-solid'"
                  class="w-4 h-4"
                />
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-[6px]">
            <label for="password_confirmation" class="text-[0.8125rem] font-[550] text-[var(--text-h)] -tracking-[0.01em]">Konfirmasi Password</label>
            <div class="relative">
              <input
                id="password_confirmation"
                v-model="passwordConfirmation"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ulangi password"
                autocomplete="new-password"
                required
                class="input-field"
              />
            </div>
          </div>

          <button type="submit" :disabled="isLoading" class="flex justify-center items-center gap-2 w-full py-[10px] mt-[2px] bg-[var(--text-h)] text-[var(--bg)] text-sm font-semibold font-[var(--sans)] border-none rounded-lg cursor-pointer -tracking-[0.01em] transition-opacity duration-150 hover:not-disabled:opacity-85 active:not-disabled:opacity-75 disabled:opacity-45 disabled:cursor-not-allowed">
            <Icon v-if="isLoading" name="heroicons:arrow-path-20-solid" class="w-[15px] h-[15px] animate-[spin_0.8s_linear_infinite]" />
            <span>{{ isLoading ? "Memproses..." : "Buat Akun" }}</span>
          </button>
        </form>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Hanya bagian yang tidak bisa diwakili Tailwind murni ─────────────── */

/* Social & SSO button — menggunakan color-mix untuk hover */
.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 0;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-h);
  font-family: var(--sans);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.social-btn:hover {
  background: color-mix(in srgb, var(--text-h) 5%, transparent);
  border-color: color-mix(in srgb, var(--text-h) 20%, var(--border));
}

.sso-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 9px 16px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-h);
  font-family: var(--sans);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.sso-btn:hover {
  background: color-mix(in srgb, var(--text-h) 5%, transparent);
  border-color: color-mix(in srgb, var(--text-h) 20%, var(--border));
}

/* Input — focus ring pakai color-mix */
.input-field {
  width: 100%;
  padding: 9px 13px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-h);
  font-size: 0.875rem;
  font-family: var(--sans);
  letter-spacing: -0.01em;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;
}
.input-field::placeholder {
  color: var(--text-muted);
  opacity: 0.7;
}
.input-field:focus {
  outline: none;
  border-color: var(--text-h);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--text-h) 8%, transparent);
}
</style>