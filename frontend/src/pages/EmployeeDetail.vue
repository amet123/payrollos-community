<template>
	<div class="space-y-4">
		<router-link to="/employees" class="text-xs font-semibold text-indigo-600 hover:underline">← Back to Employees</router-link>

		<div v-if="emp.loading" class="po-skeleton h-40" />
		<div v-else-if="emp.data" class="po-card p-6">
			<div class="flex items-center gap-4">
				<div class="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-lg font-bold text-white shadow-glow">
					{{ initials }}
				</div>
				<div>
					<h2 class="text-lg font-bold text-gray-900">{{ emp.data.employee_name }}</h2>
					<p class="text-xs text-gray-400">{{ emp.data.name }}</p>
				</div>
				<span class="ml-auto po-chip" :class="emp.data.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'">
					{{ emp.data.status }}
				</span>
			</div>

			<div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
				<div><div class="po-label">Company</div><div class="text-sm text-gray-800">{{ emp.data.company }}</div></div>
				<div><div class="po-label">Department</div><div class="text-sm text-gray-800">{{ emp.data.department || "—" }}</div></div>
				<div><div class="po-label">Designation</div><div class="text-sm text-gray-800">{{ emp.data.designation || "—" }}</div></div>
				<div><div class="po-label">Date of Joining</div><div class="text-sm text-gray-800">{{ emp.data.date_of_joining || "—" }}</div></div>
				<div><div class="po-label">Date of Birth</div><div class="text-sm text-gray-800">{{ emp.data.date_of_birth || "—" }}</div></div>
				<div><div class="po-label">Gender</div><div class="text-sm text-gray-800">{{ emp.data.gender || "—" }}</div></div>
				<div><div class="po-label">Employment Type</div><div class="text-sm text-gray-800">{{ emp.data.employment_type || "—" }}</div></div>
				<div><div class="po-label">Cell Number</div><div class="text-sm text-gray-800">{{ emp.data.cell_number || "—" }}</div></div>
				<div><div class="po-label">Personal Email</div><div class="text-sm text-gray-800">{{ emp.data.personal_email || "—" }}</div></div>
			</div>
		</div>

		<div class="po-card p-5">
			<h3 class="mb-3 text-sm font-bold text-gray-900">Payslips</h3>
			<div v-if="slips.loading" class="po-skeleton h-10" />
			<p v-else-if="!slips.data?.length" class="text-sm text-gray-400">No payslips yet.</p>
			<ul v-else class="divide-y divide-gray-100">
				<li v-for="s in slips.data" :key="s.name" class="flex items-center justify-between py-2 text-sm">
					<router-link :to="`/payslips/${s.name}`" class="text-indigo-600 hover:underline">{{ s.start_date }} → {{ s.end_date }}</router-link>
					<span class="font-semibold text-gray-800">{{ s.net_pay }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { createResource } from "frappe-ui"

const route = useRoute()

const emp = createResource({
	url: "payroll_os_community.api.employees.get_employee",
	auto: true,
	params: { name: route.params.id },
})

const slips = createResource({
	url: "payroll_os_community.api.payslips.list_payslips",
	auto: true,
	params: { employee: route.params.id },
})

const initials = computed(() => {
	const n = emp.data?.employee_name || "?"
	return n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
})
</script>
