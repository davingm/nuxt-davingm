<script setup lang="ts">
definePageMeta({
	middleware: "auth",
	layout: "dashboard",
});

const { user } = useAuth();
const { theme, toggleTheme } = useTheme();

// Active tab
const activeTab = ref<"profile" | "security" | "appearance">("profile");

// Profile form
const profileName = ref("");
const profileEmail = ref("");
const profileSaving = ref(false);
const profileSuccess = ref(false);

// Security form
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const securitySaving = ref(false);
const securityError = ref("");
const securitySuccess = ref(false);
const showCurrent = ref(false);
const showNew = ref(false);
const showConfirm = ref(false);

// Delete account
const showDeleteConfirm = ref(false);
const deleteInput = ref("");

// Sync user data to form when available
watchEffect(() => {
	if (user.value) {
		profileName.value = user.value.name ?? "";
		profileEmail.value = user.value.email ?? "";
	}
});

const saveProfile = async () => {
	profileSaving.value = true;
	profileSuccess.value = false;
	try {
		await $fetch("/api/auth/profile", {
			method: "PATCH",
			body: { name: profileName.value, email: profileEmail.value },
		});
		profileSuccess.value = true;
		setTimeout(() => {
			profileSuccess.value = false;
		}, 3000);
	} catch {
		// silently fail for now — handle in real impl
	} finally {
		profileSaving.value = false;
	}
};

const savePassword = async () => {
	securityError.value = "";
	securitySuccess.value = false;
	if (newPassword.value !== confirmPassword.value) {
		securityError.value = "New passwords do not match.";
		return;
	}
	if (newPassword.value.length < 6) {
		securityError.value = "Password must be at least 6 characters.";
		return;
	}
	securitySaving.value = true;
	try {
		await $fetch("/api/auth/password", {
			method: "PATCH",
			body: {
				current_password: currentPassword.value,
				password: newPassword.value,
			},
		});
		currentPassword.value = "";
		newPassword.value = "";
		confirmPassword.value = "";
		securitySuccess.value = true;
		setTimeout(() => {
			securitySuccess.value = false;
		}, 3000);
	} catch (e: any) {
		securityError.value =
			e?.data?.statusMessage ?? "Failed to update password.";
	} finally {
		securitySaving.value = false;
	}
};

const tabs = [
	{ id: "profile", label: "Profile" },
	{ id: "security", label: "Security" },
	{ id: "appearance", label: "Appearance" },
] as const;
</script>

<template>
  <div class="settings-page">
    <!-- Header -->
    <div class="settings-header">
      <h1 class="settings-title">Settings</h1>
      <p class="settings-desc">Manage your profile and account settings</p>
    </div>

    <div class="settings-body">
      <!-- Left: tabs -->
      <nav class="settings-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="settings-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </nav>

      <!-- Right: content -->
      <div class="settings-content">

        <!-- ── Profile ── -->
        <template v-if="activeTab === 'profile'">
          <section class="settings-section">
            <h2 class="section-title">Profile</h2>
            <p class="section-desc">Update your name and email address</p>

            <div class="form-fields">
              <div class="form-field">
                <label class="field-label" for="s-name">Name</label>
                <input
                  id="s-name"
                  v-model="profileName"
                  type="text"
                  class="field-input"
                  placeholder="Your name"
                  autocomplete="name"
                />
              </div>
              <div class="form-field">
                <label class="field-label" for="s-email">Email address</label>
                <input
                  id="s-email"
                  v-model="profileEmail"
                  type="email"
                  class="field-input"
                  placeholder="you@example.com"
                  autocomplete="email"
                />
              </div>
            </div>

            <div class="form-action">
              <Transition name="fade">
                <span v-if="profileSuccess" class="success-text">Saved successfully.</span>
              </Transition>
              <button class="btn-save" :disabled="profileSaving" @click="saveProfile">
                {{ profileSaving ? 'Saving...' : 'Save' }}
              </button>
            </div>
          </section>

          <!-- Delete account -->
          <section class="settings-section danger-zone">
            <h2 class="section-title">Delete account</h2>
            <p class="section-desc">Delete your account and all of its resources</p>

            <div class="danger-box">
              <div class="danger-box-header">
                <Icon name="heroicons:exclamation-triangle-20-solid" class="danger-icon" />
                <span class="danger-box-title">Warning</span>
              </div>
              <p class="danger-box-body">Please proceed with caution, this cannot be undone.</p>
              <button class="btn-delete" @click="showDeleteConfirm = true">
                Delete account
              </button>
            </div>
          </section>

          <!-- Delete confirm modal -->
          <Teleport to="body">
            <Transition name="fade">
              <div v-if="showDeleteConfirm" class="modal-backdrop" @click.self="showDeleteConfirm = false">
                <div class="modal">
                  <h3 class="modal-title">Are you sure?</h3>
                  <p class="modal-desc">Type <strong>DELETE</strong> to confirm account deletion. This action is irreversible.</p>
                  <input v-model="deleteInput" type="text" class="field-input" placeholder="DELETE" />
                  <div class="modal-actions">
                    <button class="btn-cancel" @click="showDeleteConfirm = false">Cancel</button>
                    <button class="btn-delete" :disabled="deleteInput !== 'DELETE'">Delete account</button>
                  </div>
                </div>
              </div>
            </Transition>
          </Teleport>
        </template>

        <!-- ── Security ── -->
        <template v-if="activeTab === 'security'">
          <section class="settings-section">
            <h2 class="section-title">Change password</h2>
            <p class="section-desc">Update your password to keep your account secure</p>

            <div class="form-fields">
              <div class="form-field">
                <label class="field-label" for="s-cur-pw">Current password</label>
                <div class="input-wrap">
                  <input
                    id="s-cur-pw"
                    v-model="currentPassword"
                    :type="showCurrent ? 'text' : 'password'"
                    class="field-input"
                    placeholder="••••••••"
                    autocomplete="current-password"
                  />
                  <button type="button" class="eye-btn" @click="showCurrent = !showCurrent">
                    <Icon :name="showCurrent ? 'heroicons:eye-slash-20-solid' : 'heroicons:eye-20-solid'" class="eye-icon" />
                  </button>
                </div>
              </div>
              <div class="form-field">
                <label class="field-label" for="s-new-pw">New password</label>
                <div class="input-wrap">
                  <input
                    id="s-new-pw"
                    v-model="newPassword"
                    :type="showNew ? 'text' : 'password'"
                    class="field-input"
                    placeholder="••••••••"
                    autocomplete="new-password"
                  />
                  <button type="button" class="eye-btn" @click="showNew = !showNew">
                    <Icon :name="showNew ? 'heroicons:eye-slash-20-solid' : 'heroicons:eye-20-solid'" class="eye-icon" />
                  </button>
                </div>
              </div>
              <div class="form-field">
                <label class="field-label" for="s-conf-pw">Confirm new password</label>
                <div class="input-wrap">
                  <input
                    id="s-conf-pw"
                    v-model="confirmPassword"
                    :type="showConfirm ? 'text' : 'password'"
                    class="field-input"
                    placeholder="••••••••"
                    autocomplete="new-password"
                  />
                  <button type="button" class="eye-btn" @click="showConfirm = !showConfirm">
                    <Icon :name="showConfirm ? 'heroicons:eye-slash-20-solid' : 'heroicons:eye-20-solid'" class="eye-icon" />
                  </button>
                </div>
              </div>
            </div>

            <Transition name="fade">
              <p v-if="securityError" class="error-text">{{ securityError }}</p>
            </Transition>

            <div class="form-action">
              <Transition name="fade">
                <span v-if="securitySuccess" class="success-text">Password updated.</span>
              </Transition>
              <button class="btn-save" :disabled="securitySaving || !currentPassword || !newPassword || !confirmPassword" @click="savePassword">
                {{ securitySaving ? 'Updating...' : 'Update password' }}
              </button>
            </div>
          </section>
        </template>

        <!-- ── Appearance ── -->
        <template v-if="activeTab === 'appearance'">
          <section class="settings-section">
            <h2 class="section-title">Appearance</h2>
            <p class="section-desc">Customize how the interface looks</p>

            <div class="appearance-option">
              <div class="appearance-option-text">
                <span class="field-label">Theme</span>
                <span class="appearance-option-desc">Choose between light and dark mode</span>
              </div>
              <div class="theme-switcher">
                <button
                  class="theme-btn"
                  :class="{ active: theme === 'light' }"
                  @click="theme !== 'light' && toggleTheme()"
                >
                  <Icon name="heroicons:sun-20-solid" class="theme-btn-icon" />
                  Light
                </button>
                <button
                  class="theme-btn"
                  :class="{ active: theme === 'dark' }"
                  @click="theme !== 'dark' && toggleTheme()"
                >
                  <Icon name="heroicons:moon-20-solid" class="theme-btn-icon" />
                  Dark
                </button>
              </div>
            </div>
          </section>
        </template>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─── Page ───────────────────────────────────────────────────────────────── */
.settings-page {
  max-width: 860px;
}

.settings-header {
  margin-bottom: 24px;
}

.settings-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0 0 4px;
  letter-spacing: -0.03em;
}

.settings-desc {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0;
}

/* ─── Layout ─────────────────────────────────────────────────────────────── */
.settings-body {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

/* ─── Tabs ───────────────────────────────────────────────────────────────── */
.settings-tabs {
  width: 140px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.settings-tab {
  display: block;
  width: 100%;
  padding: 6px 12px;
  border: none;
  background: none;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 450;
  color: var(--text-muted);
  cursor: pointer;
  text-align: left;
  font-family: var(--sans);
  transition: background 0.12s, color 0.12s;
  letter-spacing: -0.01em;
}

.settings-tab:hover {
  background: color-mix(in srgb, var(--text-h) 6%, transparent);
  color: var(--text-h);
}

.settings-tab.active {
  background: color-mix(in srgb, var(--text-h) 8%, transparent);
  color: var(--text-h);
  font-weight: 500;
}

/* ─── Content ────────────────────────────────────────────────────────────── */
.settings-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* ─── Section ────────────────────────────────────────────────────────────── */
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-h);
  margin: 0;
  letter-spacing: -0.02em;
}

.section-desc {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: -12px 0 0;
}

/* ─── Form ───────────────────────────────────────────────────────────────── */
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-h);
  letter-spacing: -0.01em;
}

.field-input {
  width: 100%;
  max-width: 380px;
  padding: 8px 12px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 7px;
  color: var(--text-h);
  font-size: 0.875rem;
  font-family: var(--sans);
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
  letter-spacing: -0.01em;
}

.field-input::placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

.field-input:focus {
  outline: none;
  border-color: color-mix(in srgb, var(--text-h) 40%, transparent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--text-h) 8%, transparent);
}

/* Password input wrapper */
.input-wrap {
  position: relative;
  max-width: 380px;
}

.input-wrap .field-input {
  max-width: 100%;
  padding-right: 38px;
}

.eye-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  transition: color 0.15s;
}

.eye-btn:hover { color: var(--text-h); }

.eye-icon {
  width: 15px;
  height: 15px;
}

/* Form actions */
.form-action {
  display: flex;
  align-items: center;
  gap: 12px;
}

.btn-save {
  padding: 7px 18px;
  background: var(--text-h);
  color: var(--bg);
  border: none;
  border-radius: 7px;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition: opacity 0.15s;
  letter-spacing: -0.01em;
}

.btn-save:hover:not(:disabled) { opacity: 0.85; }
.btn-save:disabled { opacity: 0.4; cursor: not-allowed; }

.success-text {
  font-size: 0.8125rem;
  color: #09ff00;
  font-weight: 500;
}

.error-text {
  font-size: 0.8125rem;
  color: #ef4444;
  margin: -8px 0 0;
}

/* ─── Danger Zone ────────────────────────────────────────────────────────── */
.danger-zone {
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.danger-box {
  background: rgba(239, 68, 68, 0.06);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 10px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 380px;
}

.danger-box-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.danger-icon {
  width: 16px;
  height: 16px;
  color: #ef4444;
  flex-shrink: 0;
}

.danger-box-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ef4444;
}

.danger-box-body {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0;
}

.btn-delete {
  padding: 7px 16px;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: 7px;
  font-size: 0.8125rem;
  font-weight: 600;
  font-family: var(--sans);
  cursor: pointer;
  transition: opacity 0.15s;
  width: fit-content;
  letter-spacing: -0.01em;
}

.btn-delete:hover:not(:disabled) { opacity: 0.85; }
.btn-delete:disabled { opacity: 0.4; cursor: not-allowed; }

/* ─── Appearance ─────────────────────────────────────────────────────────── */
.appearance-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 380px;
}

.appearance-option-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.appearance-option-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.theme-switcher {
  display: flex;
  gap: 4px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 3px;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background: none;
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--sans);
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  letter-spacing: -0.01em;
}

.theme-btn:hover { color: var(--text-h); }

.theme-btn.active {
  background: var(--bg);
  color: var(--text-h);
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.theme-btn-icon {
  width: 13px;
  height: 13px;
}

/* ─── Modal ──────────────────────────────────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-h);
  margin: 0;
}

.modal-desc {
  font-size: 0.8125rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 4px;
}

.btn-cancel {
  padding: 7px 16px;
  background: var(--card-bg);
  color: var(--text-h);
  border: 1px solid var(--border);
  border-radius: 7px;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: var(--sans);
  cursor: pointer;
  transition: background 0.15s;
  letter-spacing: -0.01em;
}

.btn-cancel:hover {
  background: color-mix(in srgb, var(--text-h) 6%, transparent);
}

/* ─── Transitions ────────────────────────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ─── Responsive ─────────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  .settings-body {
    flex-direction: column;
  }

  .settings-tabs {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  .settings-tab {
    white-space: nowrap;
  }
}
</style>
