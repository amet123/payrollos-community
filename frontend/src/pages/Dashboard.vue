<template>
	<div class="space-y-6">
		<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
			<div class="po-stat" v-for="s in stats" :key="s.label">
				<div class="flex items-center justify-between">
					<span class="po-label mb-0">{{ s.label }}</span>
					<span v-html="s.icon" class="text-indigo-400 [&>svg]:h-5 [&>svg]:w-5" />
				</div>
				<div class="mt-2 text-2xl font-black text-gray-900">
					<span v-if="summary.loading" class="po-skeleton inline-block h-7 w-16 align-middle" />
					<span v-else>{{ s.value }}</span>
				</div>
			</div>
		</div>

		<div class="grid gap-4 lg:grid-cols-2">
			<div class="po-card p-5">
				<h3 class="mb-3 text-sm font-bold text-gray-900">Last Payroll Run</h3>
				<div v-if="summary.loading" class="po-skeleton h-16" />
				<div v-else-if="lastRun" class="flex items-center justify-between">
					<div>
						<div class="text-sm font-semibold text-gray-800">{{ lastRun.start_date }} → {{ lastRun.end_date }}</div>
						<div class="text-xs text-gray-400">Posted {{ lastRun.posting_date }}</div>
					</div>
					<span class="po-chip" :class="statusClass(lastRun.status)">{{ lastRun.status }}</span>
				</div>
				<p v-else class="text-sm text-gray-400">No payroll run yet.</p>
				<router-link to="/payroll-runs" class="mt-4 inline-block text-xs font-semibold text-indigo-600 hover:underline">
					Go to Run Payroll →
				</router-link>
			</div>

			<div class="po-card p-5">
				<h3 class="mb-3 text-sm font-bold text-gray-900">Getting Started</h3>
				<ol class="space-y-2 text-sm text-gray-600 list-decimal list-inside">
					<li>Add your <router-link to="/employees" class="text-indigo-600 hover:underline">employees</router-link></li>
					<li>Create a <router-link to="/salary-structures" class="text-indigo-600 hover:underline">salary structure</router-link> and assign it</li>
					<li>Run payroll from <router-link to="/payroll-runs" class="text-indigo-600 hover:underline">Run Payroll</router-link></li>
					<li>View & download <router-link to="/payslips" class="text-indigo-600 hover:underline">payslips</router-link></li>
				</ol>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { createResource } from "frappe-ui"

const summary = createResource({
	url: "payroll_os_community.api.dashboard.summary",
	auto: true,
})

const lastRun = computed(() => summary.data?.last_run)

const stats = computed(() => [
	{
		label: "Employees", value: summary.data?.headcount ?? 0,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0112 0"/></svg>`,
	},
	{
		label: "Active Structures", value: summary.data?.active_structures ?? 0,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h7"/></svg>`,
	},
	{
		label: "Payslips this month", value: summary.data?.payslips_this_month ?? 0,
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/></svg>`,
	},
	{
		label: "Last Run Status", value: summary.data?.last_run?.status ?? "—",
		icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l4-3 3 3 3-3 4 3V3"/></svg>`,
	},
])

function statusClass(status) {
	if (status === "Submitted") return "bg-emerald-50 text-emerald-600"
	if (status === "Failed") return "bg-rose-50 text-rose-600"
	return "bg-gray-100 text-gray-600"
}
</script>
