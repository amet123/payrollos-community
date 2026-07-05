<template>
	<div class="space-y-4">
		<router-link to="/payslips" class="text-xs font-semibold text-indigo-600 hover:underline">← Back to Payslips</router-link>

		<div v-if="slip.loading" class="po-skeleton h-64" />
		<div v-else-if="slip.data" class="po-card p-6">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-bold text-gray-900">{{ slip.data.employee_name }}</h2>
					<p class="text-xs text-gray-400">{{ slip.data.start_date }} → {{ slip.data.end_date }} · {{ slip.data.name }}</p>
				</div>
				<a class="po-btn-primary" :href="pdfUrl" target="_blank">Download PDF</a>
			</div>

			<div class="mt-6 grid grid-cols-3 gap-4">
				<div class="po-card p-4">
					<div class="po-label">Gross Pay</div>
					<div class="text-lg font-bold text-gray-900">{{ slip.data.gross_pay }}</div>
				</div>
				<div class="po-card p-4">
					<div class="po-label">Deductions</div>
					<div class="text-lg font-bold text-gray-900">{{ slip.data.total_deduction }}</div>
				</div>
				<div class="po-card p-4">
					<div class="po-label">Net Pay</div>
					<div class="text-lg font-bold text-emerald-600">{{ slip.data.net_pay }}</div>
				</div>
			</div>

			<div class="mt-6 grid gap-6 sm:grid-cols-2">
				<div>
					<h3 class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Earnings</h3>
					<ul class="divide-y divide-gray-100 text-sm">
						<li v-for="e in slip.data.earnings" :key="e.salary_component" class="flex justify-between py-1.5">
							<span class="text-gray-600">{{ e.salary_component }}</span>
							<span class="font-medium text-gray-800">{{ e.amount }}</span>
						</li>
					</ul>
				</div>
				<div>
					<h3 class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Deductions</h3>
					<ul class="divide-y divide-gray-100 text-sm">
						<li v-for="d in slip.data.deductions" :key="d.salary_component" class="flex justify-between py-1.5">
							<span class="text-gray-600">{{ d.salary_component }}</span>
							<span class="font-medium text-gray-800">{{ d.amount }}</span>
						</li>
						<li v-if="!slip.data.deductions?.length" class="py-1.5 text-gray-400">No deductions</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { createResource } from "frappe-ui"

const route = useRoute()

const slip = createResource({
	url: "payroll_os_community.api.payslips.get_payslip",
	auto: true,
	params: { name: route.params.id },
})

const pdfUrl = computed(() =>
	`/api/method/frappe.utils.print_format.download_pdf?doctype=Salary%20Slip&name=${encodeURIComponent(route.params.id)}&format=Salary%20Slip`
)
</script>
