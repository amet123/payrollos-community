<template>
	<div class="space-y-4">
		<div class="po-card p-6">
			<h2 class="text-sm font-bold text-gray-900">Signed in as</h2>
			<div class="mt-3 flex items-center gap-3">
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white shadow-glow">
					{{ initials }}
				</div>
				<div>
					<div class="font-semibold text-gray-800">{{ session.fullName || session.user }}</div>
					<div class="text-xs text-gray-400">{{ session.user }}</div>
				</div>
			</div>
		</div>

		<div class="po-card p-6">
			<h2 class="text-sm font-bold text-gray-900">Edition</h2>
			<p class="mt-2 text-sm text-gray-600">
				You're running <span class="font-semibold">PayrollOS Community</span> —
				<span v-if="session.proInstalled" class="font-semibold text-emerald-600">Pro add-on installed</span>
				<span v-else>the Pro add-on is not installed on this bench.</span>
			</p>
		</div>

		<div class="po-card p-6">
			<h2 class="text-sm font-bold text-gray-900">Advanced configuration</h2>
			<p class="mt-2 text-sm text-gray-600">
				Company details, salary components, tax settings, and other rarely-touched
				configuration live in the standard Frappe Desk — PayrollOS Community
				doesn't duplicate that UI.
			</p>
			<a href="/app/company" target="_blank" class="mt-3 inline-block text-xs font-semibold text-indigo-600 hover:underline">
				Open Desk →
			</a>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { session } from "@/data/session"

const initials = computed(() => {
	const n = session.fullName || session.user || "?"
	return n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
})
</script>
