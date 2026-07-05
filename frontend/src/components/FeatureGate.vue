<template>
  <slot v-if="isEnabled" />
  <div v-else class="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
    <!-- Glow circle -->
    <div class="relative mb-6">
      <div class="absolute inset-0 rounded-full bg-brand-gradient opacity-20 blur-2xl scale-150" />
      <div class="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 shadow-glow">
        <svg viewBox="0 0 24 24" class="h-9 w-9 text-white" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
    </div>

    <div class="mb-3 flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1">
      <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 text-indigo-500" fill="currentColor">
        <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 17l-6.2 3.9 2.4-7.2L2 9.2h7.6L12 2z" />
      </svg>
      <span class="text-xs font-bold text-indigo-600 uppercase tracking-wide">PayrollOS Pro Feature</span>
    </div>

    <h2 class="mb-2 text-2xl font-black text-gray-900 text-center">{{ meta.label }}</h2>
    <p class="mb-6 max-w-sm text-center text-sm text-gray-500">{{ meta.desc }}</p>

    <ul class="mb-8 space-y-2 text-left">
      <li v-for="h in meta.highlights" :key="h" class="flex items-center gap-2.5 text-sm text-gray-700">
        <svg viewBox="0 0 20 20" class="h-4 w-4 shrink-0 text-emerald-500" fill="currentColor">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        {{ h }}
      </li>
    </ul>

    <div class="flex flex-col items-center gap-3">
      <div v-if="isAdmin" class="w-full max-w-md rounded-xl bg-gray-50 border border-gray-200 px-5 py-4 text-left">
        <p class="text-sm font-semibold text-gray-700 mb-2">You're an admin — install the Pro add-on:</p>
        <pre class="rounded-lg bg-gray-900 text-gray-100 text-[11px] px-3 py-2 overflow-x-auto"><code>bench get-app payroll_os &lt;pro-repo-url&gt;
bench --site yoursite install-app payroll_os</code></pre>
      </div>
      <div v-else class="rounded-xl bg-gray-50 border border-gray-200 px-6 py-4 text-center max-w-xs">
        <p class="text-sm font-semibold text-gray-700 mb-1">Want this feature?</p>
        <p class="text-xs text-gray-500">Contact your PayrollOS administrator to enable the Pro add-on.</p>
      </div>
      <p class="text-xs text-gray-400">No disruption — your data is safe and stays intact</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { session } from "@/data/session"
import { useProInstalled } from "@/composables/useFeature"

const props = defineProps({
	feature: { type: String, required: true },
})

const isEnabled = useProInstalled()
const isAdmin = computed(() => session.roles?.includes("System Manager") || session.roles?.includes("Administrator"))

const FEATURE_META = {
	hiring: {
		label: "Hiring & Onboarding",
		desc: "End-to-end recruiting pipeline, onboarding checklists, exits, and full & final settlement.",
		highlights: ["Job requisitions & pipeline", "Interview scheduling", "Offer letters", "Onboarding & exit workflows"],
	},
	loans: {
		label: "Loans & Advances",
		desc: "Employee loan disbursement, EMI schedules, and automatic salary recovery.",
		highlights: ["Loan disbursement", "EMI repayment schedule", "Auto salary deduction"],
	},
	reimbursements: {
		label: "Expense Reimbursements",
		desc: "Employee expense claims with manager approvals and payroll integration.",
		highlights: ["Expense claim submission", "Manager approval flow", "Payroll payout integration"],
	},
	statutory_reports: {
		label: "Statutory Reports",
		desc: "PF, ESI, PT, and TDS challans and statutory returns, including Form 16/24Q.",
		highlights: ["PF ECR & ESI challan", "Professional tax computation", "TDS challan & Form 16/24Q"],
	},
	gratuity_bonus: {
		label: "Gratuity & Statutory Bonus",
		desc: "Automated gratuity accrual and Bonus Act–compliant bonus computation.",
		highlights: ["Gratuity accrual & liability", "Statutory bonus compute/approve/disburse"],
	},
	insurance: {
		label: "Group Insurance",
		desc: "GMC/GPA/GTL/GHI enrollment wired directly into the payroll deduction engine.",
		highlights: ["Policy & enrollment management", "Claims tracking", "Automatic payroll deduction"],
	},
	bank_export: {
		label: "Bank Export & Reconciliation",
		desc: "Generate bank payment files and reconcile disbursements.",
		highlights: ["Bank payment file generation", "Reconciliation", "Multi-bank formats"],
	},
	ai_copilot: {
		label: "AI HR Copilot",
		desc: "Conversational AI assistant for HR queries, payroll insights, and policy guidance.",
		highlights: ["Natural language HR queries", "Payroll data Q&A", "Anomaly detection alerts"],
	},
}

const meta = computed(() => FEATURE_META[props.feature] || {
	label: props.feature,
	desc: "This feature is part of PayrollOS Pro.",
	highlights: [],
})
</script>
