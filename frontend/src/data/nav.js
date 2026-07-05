const I = {
	grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
	people: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0112 0"/></svg>`,
	structure: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h7"/></svg>`,
	payroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18l4-3 3 3 3-3 4 3V3"/></svg>`,
	payslip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/></svg>`,
	settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
	hiring: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 7h-9M14 17H5M6 4v6M18 14v6"/><circle cx="6" cy="4" r="0"/></svg>`,
	loan: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`,
	reimbursement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6l9-4 9 4-9 4-9-4zM3 6v12l9 4 9-4V6"/></svg>`,
	compliance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/></svg>`,
	gratuity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
	insurance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>`,
	ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
	bank: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M4 10h16M4 10l8-6 8 6M6 10v8M12 10v8M18 10v8"/></svg>`,
}

export const NAV = [
	{
		label: "Overview",
		items: [{ label: "Dashboard", to: "/dashboard", icon: I.grid }],
	},
	{
		label: "Payroll",
		items: [
			{ label: "Employees", to: "/employees", icon: I.people },
			{ label: "Salary Structures", to: "/salary-structures", icon: I.structure },
			{ label: "Run Payroll", to: "/payroll-runs", icon: I.payroll },
			{ label: "Payslips", to: "/payslips", icon: I.payslip },
		],
	},
	{
		label: "Pro Features",
		items: [
			{ label: "Hiring & Onboarding", proKey: "hiring", proPath: "/hiring", icon: I.hiring, pro: true },
			{ label: "Loans & Advances", proKey: "loans", proPath: "/loans", icon: I.loan, pro: true },
			{ label: "Reimbursements", proKey: "reimbursements", proPath: "/reimbursements", icon: I.reimbursement, pro: true },
			{ label: "Statutory Reports", proKey: "statutory_reports", proPath: "/compliance", icon: I.compliance, pro: true },
			{ label: "Gratuity & Bonus", proKey: "gratuity_bonus", proPath: "/bonus", icon: I.gratuity, pro: true },
			{ label: "Group Insurance", proKey: "insurance", proPath: "/insurance", icon: I.insurance, pro: true },
			{ label: "Bank Export & Recon", proKey: "bank_export", proPath: "/bank-export", icon: I.bank, pro: true },
			{ label: "AI HR Copilot", proKey: "ai_copilot", proPath: "/ai", icon: I.ai, pro: true },
		],
	},
	{
		label: "System",
		items: [{ label: "Settings", to: "/settings", icon: I.settings }],
	},
]

export const MOBILE_NAV = [
	{ to: "/dashboard", label: "Home", icon: I.grid },
	{ to: "/employees", label: "People", icon: I.people },
	{ to: "/payroll-runs", label: "Payroll", icon: I.payroll },
	{ to: "/payslips", label: "Payslips", icon: I.payslip },
	{ to: "/settings", label: "Settings", icon: I.settings },
]
