<template>
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-bold text-gray-900">Payroll Runs</h2>
			<button class="po-btn-primary" @click="openCreate">+ New Payroll Run</button>
		</div>

		<div class="po-card overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
					<tr>
						<th class="px-4 py-3">Period</th>
						<th class="px-4 py-3">Company</th>
						<th class="px-4 py-3">Employees</th>
						<th class="px-4 py-3">Slips</th>
						<th class="px-4 py-3">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					<tr v-if="list.loading"><td colspan="5" class="px-4 py-6"><div class="po-skeleton h-6" /></td></tr>
					<tr v-else-if="!list.data?.length"><td colspan="5" class="px-4 py-8 text-center text-gray-400">No payroll runs yet.</td></tr>
					<tr v-for="r in list.data" :key="r.name" class="cursor-pointer hover:bg-gray-50" @click="$router.push(`/payroll-runs/${r.name}`)">
						<td class="px-4 py-3">
							<div class="font-semibold text-gray-900">{{ r.start_date }} → {{ r.end_date }}</div>
							<div class="text-xs text-gray-400">{{ r.name }}</div>
						</td>
						<td class="px-4 py-3 text-gray-600">{{ r.company }}</td>
						<td class="px-4 py-3 text-gray-600">{{ r.number_of_employees ?? 0 }}</td>
						<td class="px-4 py-3 text-gray-600">{{ r.salary_slips_submitted ? "Submitted" : (r.salary_slips_created ? "Created" : "—") }}</td>
						<td class="px-4 py-3">
							<span class="po-chip" :class="statusClass(r.status)">{{ r.status }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<Transition name="fade">
			<div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCreate = false" />
				<div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
					<h3 class="mb-4 text-base font-bold text-gray-900">New Payroll Run</h3>
					<div class="space-y-3">
						<div>
							<label class="po-label">Company</label>
							<input v-model="form.company" class="po-input" />
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="po-label">Start Date</label>
								<input v-model="form.start_date" type="date" class="po-input" />
							</div>
							<div>
								<label class="po-label">End Date</label>
								<input v-model="form.end_date" type="date" class="po-input" />
							</div>
						</div>
						<div>
							<label class="po-label">Cost Center</label>
							<input v-model="form.cost_center" class="po-input" placeholder="e.g. Main - ABC" />
						</div>
						<div>
							<label class="po-label">Payroll Payable Account</label>
							<input v-model="form.payroll_payable_account" class="po-input" placeholder="e.g. Creditors - ABC" />
						</div>
						<div>
							<label class="po-label">Currency</label>
							<input v-model="form.currency" class="po-input" placeholder="INR" />
						</div>
						<p v-if="error" class="text-xs font-medium text-rose-600">{{ error }}</p>
						<button class="po-btn-primary w-full justify-center" :disabled="creating" @click="onCreate">
							{{ creating ? "Creating…" : "Create Run" }}
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { createResource, call } from "frappe-ui"

const router = useRouter()

const list = createResource({
	url: "payroll_os_community.api.payroll_runs.list_runs",
	auto: true,
})

const showCreate = ref(false)
const creating = ref(false)
const error = ref("")
const form = reactive({ company: "", start_date: "", end_date: "", cost_center: "", payroll_payable_account: "", currency: "" })

function openCreate() {
	Object.assign(form, { company: "", start_date: "", end_date: "", cost_center: "", payroll_payable_account: "", currency: "" })
	error.value = ""
	showCreate.value = true
}

async function onCreate() {
	error.value = ""
	if (!form.company || !form.start_date || !form.end_date) {
		error.value = "Company, start date and end date are required."
		return
	}
	creating.value = true
	try {
		const run = await call("payroll_os_community.api.payroll_runs.create_run", { ...form })
		showCreate.value = false
		router.push(`/payroll-runs/${run.name}`)
	} catch (e) {
		error.value = e?.messages?.[0] || "Failed to create payroll run."
	}
	creating.value = false
}

function statusClass(status) {
	if (status === "Submitted") return "bg-emerald-50 text-emerald-600"
	if (status === "Failed") return "bg-rose-50 text-rose-600"
	return "bg-gray-100 text-gray-600"
}
</script>
