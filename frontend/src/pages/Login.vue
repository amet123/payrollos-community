<template>
	<div class="flex min-h-screen bg-gray-50">
		<!-- Brand panel -->
		<div class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-sidebar-gradient p-12 text-white lg:flex">
			<div class="flex items-center gap-3">
				<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-glow">
					<svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 7h16M4 12h10M4 17h7" stroke-linecap="round"/></svg>
				</div>
				<span class="text-lg font-bold">PayrollOS Community</span>
			</div>
			<div>
				<h1 class="text-4xl font-extrabold leading-tight">Payroll, <br />open source.</h1>
				<p class="mt-4 max-w-sm text-indigo-100/70">
					Run payroll on top of Frappe HR — employees, salary structures, payroll runs,
					and payslips, self-hosted and yours to keep.
				</p>
			</div>
			<div class="flex gap-6 text-xs text-indigo-200/60">
				<span>MIT licensed</span><span>•</span><span>Self-hosted</span><span>•</span><span>Built on Frappe HR</span>
			</div>
			<div class="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
			<div class="pointer-events-none absolute -bottom-24 right-12 h-56 w-56 rounded-full bg-brand-400/20 blur-3xl" />
		</div>

		<!-- Form -->
		<div class="flex w-full items-center justify-center p-6 lg:w-1/2">
			<div class="w-full max-w-sm">
				<h2 class="text-2xl font-bold tracking-tight text-gray-900">Welcome back</h2>
				<p class="mt-1 text-sm text-gray-400">Sign in to your PayrollOS workspace</p>

				<form class="mt-8 space-y-4" @submit.prevent="onSubmit">
					<div>
						<label class="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
						<input
							v-model="email" type="text" required autocomplete="username"
							class="w-full rounded-xl border-0 bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-300"
							placeholder="you@company.com"
						/>
					</div>
					<div>
						<label class="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
						<input
							v-model="password" type="password" required autocomplete="current-password"
							class="w-full rounded-xl border-0 bg-gray-100 px-4 py-2.5 text-sm text-gray-800 outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-brand-300"
							placeholder="••••••••"
						/>
					</div>

					<p v-if="error" class="text-sm font-medium text-red-600">{{ error }}</p>

					<button
						type="submit" :disabled="loading"
						class="w-full rounded-xl bg-brand-gradient py-2.5 text-sm font-semibold text-white shadow-premium transition hover:opacity-95 disabled:opacity-60"
					>
						{{ loading ? "Signing in…" : "Sign in" }}
					</button>
				</form>
				<p class="mt-6 text-center text-xs text-gray-400">
					Use the Administrator account and password you set with <code>bench new-site</code>.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { login } from "@/data/session"

const route = useRoute()
const email = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")

async function onSubmit() {
	loading.value = true
	error.value = ""
	try {
		await login(email.value, password.value)
		const target = route.query.redirect || "/payrollos"
		window.location.href = target.startsWith("/payrollos") ? target : "/payrollos"
	} catch (e) {
		error.value = "Invalid email or password."
		loading.value = false
	}
}
</script>
