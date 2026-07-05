<template>
	<div class="space-y-4">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-bold text-gray-900">Salary Structures</h2>
			<button class="po-btn-primary" @click="openCreate">+ New Structure</button>
		</div>

		<div class="po-card overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
					<tr>
						<th class="px-4 py-3">Name</th>
						<th class="px-4 py-3">Company</th>
						<th class="px-4 py-3">Frequency</th>
						<th class="px-4 py-3">Status</th>
						<th class="px-4 py-3"></th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					<tr v-if="list.loading"><td colspan="5" class="px-4 py-6"><div class="po-skeleton h-6" /></td></tr>
					<tr v-else-if="!list.data?.length"><td colspan="5" class="px-4 py-8 text-center text-gray-400">No salary structures yet.</td></tr>
					<tr v-for="s in list.data" :key="s.name">
						<td class="px-4 py-3 font-semibold text-gray-900">{{ s.name }}</td>
						<td class="px-4 py-3 text-gray-600">{{ s.company }}</td>
						<td class="px-4 py-3 text-gray-600">{{ s.payroll_frequency }}</td>
						<td class="px-4 py-3">
							<span class="po-chip" :class="s.docstatus === 1 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'">
								{{ s.docstatus === 1 ? "Submitted" : "Draft" }}
							</span>
						</td>
						<td class="px-4 py-3 text-right">
							<button v-if="s.docstatus === 0" class="text-xs font-semibold text-indigo-600 hover:underline" @click="submitStructure(s.name)">Submit</button>
							<button v-else class="text-xs font-semibold text-indigo-600 hover:underline" @click="openAssign(s.name)">Assign</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Create modal -->
		<Transition name="fade">
			<div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCreate = false" />
				<div class="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
					<h3 class="mb-4 text-base font-bold text-gray-900">New Salary Structure</h3>
					<div class="space-y-3">
						<div>
							<label class="po-label">Structure Name</label>
							<input v-model="form.name" class="po-input" placeholder="e.g. Standard - Engineering" />
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="po-label">Company</label>
								<input v-model="form.company" class="po-input" />
							</div>
							<div>
								<label class="po-label">Currency</label>
								<input v-model="form.currency" class="po-input" placeholder="INR" />
							</div>
						</div>

						<div>
							<div class="flex items-center justify-between">
								<label class="po-label mb-0">Earnings</label>
								<button class="text-xs font-semibold text-indigo-600" @click="form.earnings.push({ salary_component: '', amount: 0 })">+ Add</button>
							</div>
							<div v-for="(row, i) in form.earnings" :key="i" class="mt-1.5 flex gap-2">
								<input v-model="row.salary_component" class="po-input" placeholder="Component name" />
								<input v-model.number="row.amount" type="number" class="po-input w-28" placeholder="Amount" />
								<button class="text-gray-400 hover:text-rose-500" @click="form.earnings.splice(i, 1)">✕</button>
							</div>
						</div>

						<div>
							<div class="flex items-center justify-between">
								<label class="po-label mb-0">Deductions</label>
								<button class="text-xs font-semibold text-indigo-600" @click="form.deductions.push({ salary_component: '', amount: 0 })">+ Add</button>
							</div>
							<div v-for="(row, i) in form.deductions" :key="i" class="mt-1.5 flex gap-2">
								<input v-model="row.salary_component" class="po-input" placeholder="Component name" />
								<input v-model.number="row.amount" type="number" class="po-input w-28" placeholder="Amount" />
								<button class="text-gray-400 hover:text-rose-500" @click="form.deductions.splice(i, 1)">✕</button>
							</div>
						</div>

						<p v-if="error" class="text-xs font-medium text-rose-600">{{ error }}</p>
						<button class="po-btn-primary w-full justify-center" :disabled="creating" @click="onCreate">
							{{ creating ? "Creating…" : "Create Structure" }}
						</button>
					</div>
				</div>
			</div>
		</Transition>

		<!-- Assign modal -->
		<Transition name="fade">
			<div v-if="showAssign" class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showAssign = false" />
				<div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
					<h3 class="mb-4 text-base font-bold text-gray-900">Assign {{ assignTarget }}</h3>
					<div class="space-y-3">
						<div>
							<label class="po-label">Employee ID</label>
							<input v-model="assignForm.employee" class="po-input" placeholder="e.g. HR-EMP-00001" />
						</div>
						<div>
							<label class="po-label">From Date</label>
							<input v-model="assignForm.from_date" type="date" class="po-input" />
						</div>
						<div>
							<label class="po-label">Payroll Payable Account</label>
							<input v-model="assignForm.payroll_payable_account" class="po-input" placeholder="e.g. Creditors - ABC" />
						</div>
						<p v-if="assignError" class="text-xs font-medium text-rose-600">{{ assignError }}</p>
						<button class="po-btn-primary w-full justify-center" :disabled="assigning" @click="onAssign">
							{{ assigning ? "Assigning…" : "Assign" }}
						</button>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { createResource, call } from "frappe-ui"

const list = createResource({
	url: "payroll_os_community.api.salary_structures.list_structures",
	auto: true,
})

const showCreate = ref(false)
const creating = ref(false)
const error = ref("")
const form = reactive({ name: "", company: "", currency: "", earnings: [{ salary_component: "", amount: 0 }], deductions: [] })

function openCreate() {
	Object.assign(form, { name: "", company: "", currency: "", earnings: [{ salary_component: "", amount: 0 }], deductions: [] })
	error.value = ""
	showCreate.value = true
}

async function onCreate() {
	error.value = ""
	if (!form.name || !form.company) {
		error.value = "Name and company are required."
		return
	}
	creating.value = true
	try {
		await call("payroll_os_community.api.salary_structures.create_structure", { data: { ...form } })
		showCreate.value = false
		list.fetch()
	} catch (e) {
		error.value = e?.messages?.[0] || "Failed to create structure."
	}
	creating.value = false
}

async function submitStructure(name) {
	await call("payroll_os_community.api.salary_structures.submit_structure", { name })
	list.fetch()
}

const showAssign = ref(false)
const assignTarget = ref("")
const assigning = ref(false)
const assignError = ref("")
const assignForm = reactive({ employee: "", from_date: "", payroll_payable_account: "" })

function openAssign(name) {
	assignTarget.value = name
	Object.assign(assignForm, { employee: "", from_date: "", payroll_payable_account: "" })
	assignError.value = ""
	showAssign.value = true
}

async function onAssign() {
	assignError.value = ""
	if (!assignForm.employee || !assignForm.from_date) {
		assignError.value = "Employee and from-date are required."
		return
	}
	assigning.value = true
	try {
		await call("payroll_os_community.api.salary_structures.assign_structure", {
			name: assignTarget.value, ...assignForm,
		})
		showAssign.value = false
	} catch (e) {
		assignError.value = e?.messages?.[0] || "Failed to assign structure."
	}
	assigning.value = false
}
</script>
