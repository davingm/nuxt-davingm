<script setup lang="ts">
definePageMeta({
	middleware: "guest",
	layout: "auth",
});

const decoImageSrc = "/images/nuxt-nation.webp";

const { login } = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
	if (!email.value || !password.value) {
		errorMessage.value = "Silakan isi semua bidang.";
		return;
	}

	isLoading.value = true;
	errorMessage.value = "";

	try {
		await login({ email: email.value, password: password.value });
		router.push("/dashboard");
	} catch (err: unknown) {
		const e = err as { data?: { statusMessage?: string }; message?: string };
		errorMessage.value =
			e.data?.statusMessage ||
			e.message ||
			"Login gagal. Periksa kembali email dan password Anda.";
	} finally {
		isLoading.value = false;
	}
};
</script>

<template>
  <div class="flex min-h-screen w-full relative max-[768px]:flex-col">

    <!-- Logo kiri atas -->
    <div class="absolute top-6 left-8 z-10 flex items-center max-[768px]:top-4 max-[768px]:left-5">
      <NuxtLink to="/">
        <Icon name="simple-icons:nuxt" class="w-[26px] h-[26px] text-[var(--text-h)]" />
      </NuxtLink>
    </div>

    <!-- Kiri: Form -->
    <div class="w-full max-w-[520px] min-w-[400px] max-[1024px]:min-w-0 max-[768px]:max-w-full max-[768px]:min-w-0 flex items-center justify-center py-12 px-10 max-[768px]:px-6 max-[768px]:pb-10 max-[400px]:px-4 max-[400px]:pb-8 bg-[var(--bg)] box-border">
      <div class="w-full max-w-[400px] max-[768px]:max-w-full flex flex-col">

        <h1 class="text-2xl font-bold text-[var(--text-h)] mb-6 -tracking-[0.4px] leading-tight">Masuk ke Nuxt</h1>

        <!-- Social Login -->
        <div class="grid grid-cols-3 gap-2 mb-2 max-[400px]:gap-[6px]">
          <button type="button" class="social-btn" @click="() => {}">
            <Icon name="simple-icons:google" class="w-4 h-4 shrink-0" />
            <span class="-tracking-[0.01em] max-[400px]:hidden">Google</span>
          </button>
          <button type="button" class="social-btn" @click="() => {}">
            <Icon name="simple-icons:apple" class="w-4 h-4 shrink-0" />
            <span class="-tracking-[0.01em] max-[400px]:hidden">Apple</span>
          </button>
          <button type="button" class="social-btn" @click="() => {}">
            <Icon name="simple-icons:github" class="w-4 h-4 shrink-0" />
            <span class="-tracking-[0.01em] max-[400px]:hidden">GitHub</span>
          </button>
        </div>

        <button type="button" class="sso-btn" @click="() => {}">
          <Icon name="heroicons:arrow-right-on-rectangle-20-solid" class="w-[15px] h-[15px] shrink-0 opacity-60" />
          <span class="-tracking-[0.01em]">Lanjutkan dengan SSO</span>
        </button>

        <!-- Divider -->
        <div class="flex items-center gap-[14px] mb-5">
          <span class="flex-1 h-px bg-[var(--border)]" />
          <span class="text-xs font-[450] text-[var(--text-muted)] tracking-[0.02em] shrink-0">atau</span>
          <span class="flex-1 h-px bg-[var(--border)]" />
        </div>

        <!-- Error -->
        <div v-if="errorMessage" class="flex items-start gap-[10px] px-[14px] py-[11px] bg-red-500/[0.06] border border-red-500/20 rounded-lg text-red-600 text-[0.8125rem] mb-4 leading-[1.45]" role="alert">
          <Icon name="heroicons:exclamation-circle-20-solid" class="w-4 h-4 shrink-0 mt-[1px]" />
          <span>{{ errorMessage }}</span>
        </div>

        <!-- Form -->
        <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
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
                placeholder="••••••••"
                autocomplete="current-password"
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

          <button type="submit" :disabled="isLoading" class="flex justify-center items-center gap-2 w-full py-[10px] mt-[2px] bg-[var(--text-h)] text-[var(--bg)] text-sm font-semibold font-[var(--sans)] border-none rounded-lg cursor-pointer -tracking-[0.01em] transition-opacity duration-150 hover:not-disabled:opacity-85 active:not-disabled:opacity-75 disabled:opacity-45 disabled:cursor-not-allowed">
            <Icon v-if="isLoading" name="heroicons:arrow-path-20-solid" class="w-[15px] h-[15px] animate-[spin_0.8s_linear_infinite]" />
            <span>{{ isLoading ? "Memproses..." : "Masuk" }}</span>
          </button>
        </form>

        <!-- Bottom links -->
        <div class="flex items-center justify-center gap-3 mt-5">
          <NuxtLink to="/register" class="text-[var(--text-muted)] no-underline text-[0.8125rem] -tracking-[0.01em] transition-colors duration-150 hover:text-[var(--text-h)]">
            Belum punya akun? <strong class="text-[var(--text-h)] font-semibold">Daftar</strong>
          </NuxtLink>
          <span class="w-px h-3 bg-[var(--border)] shrink-0" />
          <a href="#" class="text-[var(--text-muted)] no-underline text-[0.8125rem] -tracking-[0.01em] transition-colors duration-150 hover:text-[var(--text-h)]">Lupa password?</a>
        </div>

      </div>
    </div>

    <!-- Kanan: Panel gambar + teks -->
    <div class="flex-1 relative overflow-hidden bg-[#0a0a0a] max-[768px]:min-h-[260px] max-[768px]:flex-none" aria-hidden="true">
      <div class="absolute inset-0 w-full h-full">
        <img
          :src="decoImageSrc"
          alt=""
          class="w-full h-full object-cover object-center block"
          width="960"
          height="1280"
          loading="eager"
          fetchpriority="high"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35 pointer-events-none z-[1]" />
      <div class="deco-edge-fade" />

      <div class="absolute bottom-0 left-0 right-0 z-[3] px-[52px] pb-14 pt-14 box-border max-w-[420px] max-[768px]:p-7 max-[400px]:p-5 max-[768px]:max-w-full">
        <p class="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-black/70 mb-[14px]">Nuxt Nation 2026</p>
        <h2 class="text-[2rem] font-bold leading-[1.15] text-[#f0f0f0] mb-5 -tracking-[0.4px] max-[768px]:text-2xl">Bergabung Dengan Para Insinyur Nuxt.</h2>
        <div class="flex flex-col gap-2 mb-7">
          <p class="flex items-center gap-2 text-sm text-white/55 -tracking-[0.01em]">
            <Icon name="heroicons:calendar-days-20-solid" class="w-[15px] h-[15px] shrink-0 opacity-65" />
            15 – 17 Oktober 2026
          </p>
          <p class="flex items-center gap-2 text-sm text-white/55 -tracking-[0.01em]">
            <Icon name="heroicons:map-pin-20-solid" class="w-[15px] h-[15px] shrink-0 opacity-65" />
            Bandung, Indonesia
          </p>
        </div>
        <a href="https://nuxt.com/nation" target="_blank" rel="noopener" class="group inline-flex items-center gap-[7px] px-5 py-[9px] bg-[#09ff00] text-[#050505] text-[0.8125rem] font-semibold rounded-lg no-underline -tracking-[0.01em] w-fit transition-opacity duration-150 hover:opacity-82">
          Daftar sekarang
          <Icon name="heroicons:arrow-right-20-solid" class="w-[14px] h-[14px] transition-transform duration-150 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Hanya bagian yang tidak bisa diwakili Tailwind murni ─────────────── */

/* Social button — color-mix hover */
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

/* SSO button — color-mix hover */
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

/* Input — color-mix focus ring */
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

/* Edge fade — arah gradient berubah drastis di mobile (horizontal → vertikal) */
.deco-edge-fade {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 120px;
  background: linear-gradient(
    90deg,
    #0a0a0a 0%,
    rgba(10, 10, 10, 0.35) 45%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 2;
}

@media (max-width: 768px) {
  .deco-edge-fade {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(10, 10, 10, 0.45) 55%,
      #0a0a0a 100%
    );
  }
}
</style>