<template>
	<div class="space-y-4">
		<h2 class="text-sm font-bold text-gray-900">Payslips</h2>

		<div class="po-card overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
					<tr>
						<th class="px-4 py-3">Employee</th>
						<th class="px-4 py-3">Period</th>
						<th class="px-4 py-3">Gross</th>
						<th class="px-4 py-3">Deductions</th>
						<th class="px-4 py-3">Net Pay</th>
						<th class="px-4 py-3">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					<tr v-if="list.loading"><td colspan="6" class="px-4 py-6"><div class="po-skeleton h-6" /></td></tr>
					<tr v-else-if="!list.data?.length"><td colspan="6" class="px-4 py-8 text-center text-gray-400">No payslips yet.</td></tr>
					<tr v-for="s in list.data" :key="s.name" class="cursor-pointer hover:bg-gray-50" @click="$router.push(`/payslips/${s.name}`)">
						<td class="px-4 py-3 font-semibold text-gray-900">{{ s.employee_name || s.employee }}</td>
						<td class="px-4 py-3 text-gray-600">{{ s.start_date }} → {{ s.end_date }}</td>
						<td class="px-4 py-3 text-gray-600">{{ s.gross_pay }}</td>
						<td class="px-4 py-3 text-gray-600">{{ s.total_deduction }}</td>
						<td class="px-4 py-3 font-semibold text-gray-900">{{ s.net_pay }}</td>
						<td class="px-4 py-3">
							<span class="po-chip" :class="s.docstatus === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">
								{{ s.docstatus === 1 ? "Submitted" : "Draft" }}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { createResource } from "frappe-ui"

const list = createResource({
	url: "payroll_os_community.api.payslips.list_payslips",
	auto: true,
})
</script>
