<template>
	<div class="space-y-4">
		<router-link to="/payroll-runs" class="text-xs font-semibold text-indigo-600 hover:underline">← Back to Payroll Runs</router-link>

		<div v-if="run.loading" class="po-skeleton h-40" />
		<div v-else-if="run.data" class="po-card p-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-bold text-gray-900">{{ run.data.start_date }} → {{ run.data.end_date }}</h2>
					<p class="text-xs text-gray-400">{{ run.data.name }} · {{ run.data.company }}</p>
				</div>
				<span class="po-chip" :class="statusClass(run.data.status)">{{ run.data.status }}</span>
			</div>

			<p v-if="run.data.error_message" class="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-xs font-medium text-rose-600">
				{{ stripHtml(run.data.error_message) }}
			</p>

			<!-- Step flow -->
			<div class="mt-6 space-y-3">
				<div class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3">
					<span class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
						:class="run.data.number_of_employees ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'">1</span>
					<div class="flex-1">
						<div class="text-sm font-semibold text-gray-800">Fill Employees</div>
						<div class="text-xs text-gray-400">{{ run.data.number_of_employees || 0 }} employee(s) matched</div>
					</div>
					<button class="po-btn-primary" :disabled="acting" @click="doFill">Fill Employees</button>
				</div>

				<div class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3">
					<span class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
						:class="run.data.salary_slips_created ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'">2</span>
					<div class="flex-1">
						<div class="text-sm font-semibold text-gray-800">Create Salary Slips</div>
						<div class="text-xs text-gray-400">{{ run.data.salary_slips_created ? "Slips created" : "Not created yet" }}</div>
					</div>
					<button class="po-btn-primary" :disabled="acting || !run.data.number_of_employees" @click="doCreateSlips">Create Slips</button>
				</div>

				<div class="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3">
					<span class="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
						:class="run.data.salary_slips_submitted ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'">3</span>
					<div class="flex-1">
						<div class="text-sm font-semibold text-gray-800">Submit Salary Slips</div>
						<div class="text-xs text-gray-400">{{ run.data.salary_slips_submitted ? "Submitted" : "Not submitted yet" }}</div>
					</div>
					<button class="po-btn-primary" :disabled="acting || !run.data.salary_slips_created" @click="doSubmit">Submit Slips</button>
				</div>
			</div>
		</div>

		<div class="po-card p-5">
			<h3 class="mb-3 text-sm font-bold text-gray-900">Payslips in this run</h3>
			<div v-if="slips.loading" class="po-skeleton h-10" />
			<p v-else-if="!slips.data?.length" class="text-sm text-gray-400">No payslips yet — create and submit slips above.</p>
			<ul v-else class="divide-y divide-gray-100">
				<li v-for="s in slips.data" :key="s.name" class="flex items-center justify-between py-2 text-sm">
					<router-link :to="`/payslips/${s.name}`" class="text-indigo-600 hover:underline">{{ s.employee }}</router-link>
					<span class="font-semibold text-gray-800">{{ s.net_pay }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute } from "vue-router"
import { createResource, call } from "frappe-ui"

const route = useRoute()
const acting = ref(false)

const run = createResource({
	url: "payroll_os_community.api.payroll_runs.get_run",
	auto: true,
	params: { name: route.params.id },
})

const slips = createResource({
	url: "payroll_os_community.api.payslips.list_payslips",
	auto: true,
	params: { payroll_entry: route.params.id },
})

async function doFill() {
	acting.value = true
	try {
		await call("payroll_os_community.api.payroll_runs.fill_employees", { payroll_entry: route.params.id })
		await run.fetch()
	} finally { acting.value = false }
}

async function doCreateSlips() {
	acting.value = true
	try {
		await call("payroll_os_community.api.payroll_runs.create_slips", { payroll_entry: route.params.id })
		await run.fetch()
		await slips.fetch()
	} finally { acting.value = false }
}

async function doSubmit() {
	acting.value = true
	try {
		await call("payroll_os_community.api.payroll_runs.submit_slips", { payroll_entry: route.params.id })
		await run.fetch()
		await slips.fetch()
	} finally { acting.value = false }
}

function statusClass(status) {
	if (status === "Submitted") return "bg-emerald-50 text-emerald-600"
	if (status === "Failed") return "bg-rose-50 text-rose-600"
	return "bg-gray-100 text-gray-600"
}
function stripHtml(html) {
	const div = document.createElement("div")
	div.innerHTML = html
	return div.textContent || div.innerText || ""
}
</script>
