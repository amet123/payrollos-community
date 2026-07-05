<template>
  <div class="flex h-screen overflow-hidden" :class="{ dark: isDark }">
    <!-- Mobile sidebar overlay -->
    <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-black/50 md:hidden" @click="mobileMenuOpen = false" />

    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col bg-sidebar-gradient px-3 py-4 text-white transition-transform duration-200 md:relative md:translate-x-0"
      :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Brand -->
      <div class="flex items-center gap-3 px-2 pb-5">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
          <svg viewBox="0 0 24 24" class="h-5 w-5 text-white" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M4 7h16M4 12h10M4 17h7" stroke-linecap="round" />
          </svg>
        </div>
        <div class="flex-1 leading-tight">
          <div class="text-sm font-bold tracking-tight">PayrollOS</div>
          <div class="text-[11px] font-medium text-indigo-200/70">Community</div>
        </div>
        <button class="md:hidden text-indigo-200/70 hover:text-white" @click="mobileMenuOpen = false">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 space-y-1 overflow-y-auto pr-1">
        <template v-for="group in nav" :key="group.label">
          <div class="px-3 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-wider text-indigo-200/50">
            {{ group.label }}
          </div>
          <template v-for="item in group.items" :key="item.label">
            <router-link
              v-if="!item.pro"
              :to="item.to"
              class="po-nav"
              :class="{ 'po-nav-active': isActive(item) }"
              @click="mobileMenuOpen = false"
            >
              <span v-html="item.icon" class="shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]" />
              <span class="truncate">{{ item.label }}</span>
            </router-link>
            <router-link
              v-else-if="!session.proInstalled"
              :to="`/feature-locked/${item.proKey}`"
              class="po-nav opacity-50"
            >
              <span v-html="item.icon" class="shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]" />
              <span class="truncate">{{ item.label }}</span>
              <svg viewBox="0 0 24 24" class="ml-auto h-3.5 w-3.5 shrink-0 text-indigo-200/50" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </router-link>
            <a
              v-else
              :href="`/payrollos-pro${item.proPath}`"
              class="po-nav"
            >
              <span v-html="item.icon" class="shrink-0 [&>svg]:h-[18px] [&>svg]:w-[18px]" />
              <span class="truncate">{{ item.label }}</span>
            </a>
          </template>
        </template>
      </nav>

      <!-- User card + Dark mode toggle -->
      <div class="mt-3 space-y-2">
        <button @click="toggleDark"
          class="flex w-full items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs font-medium text-indigo-200/80 ring-1 ring-white/10 transition hover:bg-white/10">
          <svg v-if="isDark" viewBox="0 0 24 24" class="h-4 w-4 text-yellow-300" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          <svg v-else viewBox="0 0 24 24" class="h-4 w-4 text-indigo-200/70" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </button>

        <div class="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-2.5 ring-1 ring-white/10">
          <div class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold shrink-0">
            {{ initials }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="truncate text-sm font-semibold">{{ session.fullName || session.user }}</div>
            <div class="truncate text-[11px] text-indigo-200/60">{{ session.proInstalled ? 'Pro' : 'Community' }}</div>
          </div>
          <button class="text-indigo-200/70 transition hover:text-white shrink-0" title="Sign out" @click="onLogout">
            <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 17l5-5-5-5M21 12H9M12 19H6a2 2 0 01-2-2V7a2 2 0 012-2h6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <!-- Top bar -->
      <header class="flex h-14 shrink-0 items-center gap-3 border-b px-4 backdrop-blur sm:h-16 sm:px-6"
        :class="isDark ? 'border-slate-700 bg-slate-900/80' : 'border-gray-100 bg-white/80'">
        <button class="rounded-xl p-2 transition hover:bg-gray-100 md:hidden"
          :class="isDark ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600'"
          @click="mobileMenuOpen = true">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>

        <div class="flex items-center gap-2 md:hidden">
          <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gradient shadow-glow">
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 7h16M4 12h10M4 17h7" stroke-linecap="round" /></svg>
          </div>
          <span class="text-sm font-bold" :class="isDark ? 'text-white' : 'text-gray-900'">PayrollOS</span>
        </div>

        <div class="hidden md:block">
          <h1 class="text-base font-bold tracking-tight" :class="isDark ? 'text-white' : 'text-gray-900'">{{ pageTitle }}</h1>
          <p class="text-xs text-gray-400">{{ todayStr }}</p>
        </div>

        <div class="ml-auto flex items-center gap-2">
          <span v-if="!session.proInstalled" class="hidden sm:inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-600">
            Community Edition
          </span>

          <div class="relative" ref="settingsWrap">
            <button @click="settingsOpen = !settingsOpen"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-glow ring-2 ring-transparent transition hover:ring-indigo-400">
              {{ initials }}
            </button>

            <Teleport to="body">
              <Transition name="fade-down">
                <div v-if="settingsOpen"
                  :style="dropdownStyle"
                  class="fixed z-[9999] w-52 rounded-2xl border shadow-2xl overflow-hidden"
                  :class="isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'">

                  <div class="px-4 py-3 border-b" :class="isDark ? 'border-slate-700' : 'border-gray-100'">
                    <div class="text-xs font-bold truncate" :class="isDark ? 'text-white' : 'text-gray-900'">
                      {{ session.fullName || session.user }}
                    </div>
                    <div class="text-[10px] truncate mt-0.5 text-gray-400">
                      {{ session.user }}
                    </div>
                  </div>

                  <div class="py-1.5">
                    <button @click="settingsOpen = false; showChangePwd = true"
                      class="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-semibold transition"
                      :class="isDark ? 'text-gray-200 hover:bg-slate-700' : 'text-gray-700 hover:bg-gray-50'">
                      <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      Change Password
                    </button>

                    <div class="my-1 border-t" :class="isDark ? 'border-slate-700' : 'border-gray-100'"/>

                    <button @click="settingsOpen = false; onLogout()"
                      class="flex w-full items-center gap-3 px-4 py-2.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 transition">
                      <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 17l5-5-5-5M21 12H9M12 19H6a2 2 0 01-2-2V7a2 2 0 012-2h6"/></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </Transition>
            </Teleport>
          </div>
        </div>
      </header>

      <!-- Change Password Modal -->
      <Transition name="fade">
        <div v-if="showChangePwd" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closePwdModal"/>
          <div class="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div class="flex items-center justify-between mb-5">
              <div>
                <h3 class="text-base font-bold text-gray-900">Change Password</h3>
                <p class="text-[11px] text-gray-400 mt-0.5">{{ session.user }}</p>
              </div>
              <button @click="closePwdModal" class="text-gray-400 hover:text-gray-600">
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Current Password</label>
                <input v-model="pwdForm.current" type="password" autocomplete="current-password"
                  placeholder="Enter current password"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">New Password</label>
                <input v-model="pwdForm.new1" type="password" autocomplete="new-password"
                  placeholder="Min 8 characters"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"/>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Confirm New Password</label>
                <input v-model="pwdForm.new2" type="password" autocomplete="new-password"
                  placeholder="Repeat new password"
                  class="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-indigo-400 focus:outline-none"
                  @keydown.enter="onChangePwd"/>
              </div>

              <p v-if="pwdError" class="text-xs text-rose-600 font-medium">{{ pwdError }}</p>
              <p v-if="pwdSuccess" class="text-xs text-emerald-600 font-medium">{{ pwdSuccess }}</p>

              <button @click="onChangePwd" :disabled="pwdLoading"
                class="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition disabled:opacity-50">
                {{ pwdLoading ? 'Updating…' : 'Update Password' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Routed page -->
      <main class="flex-1 overflow-y-auto px-3 py-4 pb-20 sm:px-6 sm:py-6 sm:pb-6"
        :class="isDark ? 'bg-slate-950' : 'bg-gray-50'">
        <router-view />
      </main>

      <!-- Mobile bottom nav -->
      <nav class="po-bottom-nav" :class="isDark ? '!bg-slate-900/95 !border-slate-700' : ''">
        <router-link
          v-for="item in mobileNav"
          :key="item.to"
          :to="item.to"
          class="po-bottom-nav-item"
          :class="{ active: route.path.startsWith(item.to) }"
        >
          <span v-html="item.icon" class="[&>svg]:h-5 [&>svg]:w-5" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { session, logout } from "@/data/session"
import { NAV, MOBILE_NAV } from "@/data/nav"

const route = useRoute()
const mobileMenuOpen = ref(false)
const nav = NAV
const mobileNav = MOBILE_NAV

const settingsWrap = ref(null)
const settingsOpen = ref(false)

const dropdownStyle = computed(() => {
	if (!settingsWrap.value) return {}
	const r = settingsWrap.value.getBoundingClientRect()
	return { top: (r.bottom + 8) + "px", right: (window.innerWidth - r.right) + "px" }
})

const showChangePwd = ref(false)
const pwdForm = ref({ current: "", new1: "", new2: "" })
const pwdError = ref("")
const pwdSuccess = ref("")
const pwdLoading = ref(false)

function closePwdModal() {
	showChangePwd.value = false
	pwdForm.value = { current: "", new1: "", new2: "" }
	pwdError.value = ""
	pwdSuccess.value = ""
}

async function onChangePwd() {
	pwdError.value = ""
	pwdSuccess.value = ""
	const { current, new1, new2 } = pwdForm.value
	if (!current) { pwdError.value = "Current password is required."; return }
	if (new1.length < 8) { pwdError.value = "New password must be at least 8 characters."; return }
	if (new1 !== new2) { pwdError.value = "Passwords do not match."; return }

	pwdLoading.value = true
	try {
		const body = new FormData()
		body.append("old_password", current)
		body.append("new_password", new1)
		const res = await fetch(
			"/api/method/frappe.core.doctype.user.user.update_password",
			{
				method: "POST",
				headers: { "X-Frappe-CSRF-Token": window.csrf_token || "" },
				body,
			}
		)
		const data = await res.json()
		if (res.ok && !data.exc) {
			pwdSuccess.value = "Password updated successfully!"
			pwdForm.value = { current: "", new1: "", new2: "" }
			setTimeout(closePwdModal, 1800)
		} else {
			pwdError.value = data.exc_type === "AuthenticationError"
				? "Current password is incorrect."
				: (data._server_messages ? JSON.parse(data._server_messages)?.[0]?.message || "Failed to update password." : "Failed to update password.")
		}
	} catch {
		pwdError.value = "Network error. Please try again."
	}
	pwdLoading.value = false
}

function handleClickOutside(e) {
	if (settingsWrap.value && !settingsWrap.value.contains(e.target)) settingsOpen.value = false
}
onMounted(() => document.addEventListener("mousedown", handleClickOutside))
onUnmounted(() => document.removeEventListener("mousedown", handleClickOutside))

const isDark = ref(localStorage.getItem("po-dark") === "1")
function toggleDark() {
	isDark.value = !isDark.value
	localStorage.setItem("po-dark", isDark.value ? "1" : "0")
}

const pageTitle = computed(() => route.meta.title || "Dashboard")
const initials = computed(() => {
	const n = session.fullName || session.user || "?"
	return n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
})
const todayStr = new Date().toLocaleDateString("en-IN", {
	weekday: "long", day: "numeric", month: "long", year: "numeric",
})

function isActive(item) {
	if (route.path === item.to) return true
	return route.path.startsWith(item.to + "/")
}
function onLogout() {
	logout()
}
</script>

<style scoped>
.fade-down-enter-active, .fade-down-leave-active { transition: opacity .15s ease, transform .15s ease; }
.fade-down-enter-from, .fade-down-leave-to { opacity: 0; transform: translateY(-6px) scale(.97); }
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
