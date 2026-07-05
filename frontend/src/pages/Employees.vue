<template>
	<div class="space-y-4">
		<div class="flex items-center justify-between gap-3">
			<input v-model="search" @input="onSearch" type="text" placeholder="Search employees…"
				class="po-input max-w-xs" />
			<button class="po-btn-primary" @click="showCreate = true">+ Add Employee</button>
		</div>

		<div class="po-card overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
					<tr>
						<th class="px-4 py-3">Employee</th>
						<th class="px-4 py-3">Department</th>
						<th class="px-4 py-3">Designation</th>
						<th class="px-4 py-3">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					<tr v-if="list.loading">
						<td colspan="4" class="px-4 py-6"><div class="po-skeleton h-6" /></td>
					</tr>
					<tr v-else-if="!list.data?.length">
						<td colspan="4" class="px-4 py-8 text-center text-gray-400">No employees yet.</td>
					</tr>
					<tr v-for="emp in list.data" :key="emp.name" class="cursor-pointer hover:bg-gray-50"
						@click="$router.push(`/employees/${emp.name}`)">
						<td class="px-4 py-3">
							<div class="font-semibold text-gray-900">{{ emp.employee_name }}</div>
							<div class="text-xs text-gray-400">{{ emp.name }}</div>
						</td>
						<td class="px-4 py-3 text-gray-600">{{ emp.department || "—" }}</td>
						<td class="px-4 py-3 text-gray-600">{{ emp.designation || "—" }}</td>
						<td class="px-4 py-3">
							<span class="po-chip" :class="emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'">
								{{ emp.status }}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Add Employee modal -->
		<Transition name="fade">
			<div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showCreate = false" />
				<div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
					<h3 class="mb-4 text-base font-bold text-gray-900">Add Employee</h3>
					<div class="space-y-3">
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="po-label">First Name</label>
								<input v-model="form.first_name" class="po-input" />
							</div>
							<div>
								<label class="po-label">Last Name</label>
								<input v-model="form.last_name" class="po-input" />
							</div>
						</div>
						<div>
							<label class="po-label">Company</label>
							<input v-model="form.company" class="po-input" placeholder="Exact company name" />
						</div>
						<div class="grid grid-cols-2 gap-3">
							<div>
								<label class="po-label">Gender</label>
								<select v-model="form.gender" class="po-input">
									<option value="">—</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div>
								<label class="po-label">Date of Joining</label>
								<input v-model="form.date_of_joining" type="date" class="po-input" />
							</div>
						</div>
						<p v-if="error" class="text-xs font-medium text-rose-600">{{ error }}</p>
						<button class="po-btn-primary w-full justify-center" :disabled="creating" @click="onCreate">
							{{ creating ? "Creating…" : "Create Employee" }}
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

const search = ref("")
const showCreate = ref(false)
const creating = ref(false)
const error = ref("")
const form = reactive({ first_name: "", last_name: "", company: "", gender: "", date_of_joining: "" })

const list = createResource({
	url: "payroll_os_community.api.employees.list_employees",
	auto: true,
	params: { search: "" },
})

let searchTimer = null
function onSearch() {
	clearTimeout(searchTimer)
	searchTimer = setTimeout(() => list.fetch({ search: search.value }), 250)
}

async function onCreate() {
	error.value = ""
	if (!form.first_name || !form.company) {
		error.value = "First name and company are required."
		return
	}
	creating.value = true
	try {
		await call("payroll_os_community.api.employees.create_employee", { data: { ...form } })
		showCreate.value = false
		Object.assign(form, { first_name: "", last_name: "", company: "", gender: "", date_of_joining: "" })
		list.fetch()
	} catch (e) {
		error.value = e?.messages?.[0] || "Failed to create employee."
	}
	creating.value = false
}
</script>
