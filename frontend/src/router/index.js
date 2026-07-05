import { createRouter, createWebHistory } from "vue-router"
import { session, fetchContext } from "@/data/session"

const routes = [
	{ path: "/login", name: "Login", component: () => import("@/pages/Login.vue"), meta: { public: true } },

	{
		path: "/",
		component: () => import("@/components/AppShell.vue"),
		children: [
			{ path: "", redirect: "/dashboard" },
			{ path: "dashboard", name: "Dashboard", component: () => import("@/pages/Dashboard.vue"), meta: { title: "Dashboard" } },
			{ path: "employees", name: "Employees", component: () => import("@/pages/Employees.vue"), meta: { title: "Employees" } },
			{ path: "employees/:id", name: "EmployeeDetail", component: () => import("@/pages/EmployeeDetail.vue"), meta: { title: "Employee" } },
			{ path: "salary-structures", name: "SalaryStructures", component: () => import("@/pages/SalaryStructures.vue"), meta: { title: "Salary Structures" } },
			{ path: "payroll-runs", name: "RunPayroll", component: () => import("@/pages/RunPayroll.vue"), meta: { title: "Run Payroll" } },
			{ path: "payroll-runs/:id", name: "RunDetail", component: () => import("@/pages/RunDetail.vue"), meta: { title: "Payroll Run" } },
			{ path: "payslips", name: "PayslipList", component: () => import("@/pages/PayslipList.vue"), meta: { title: "Payslips" } },
			{ path: "payslips/:id", name: "PayslipDetail", component: () => import("@/pages/PayslipDetail.vue"), meta: { title: "Payslip" } },
			{ path: "settings", name: "Settings", component: () => import("@/pages/Settings.vue"), meta: { title: "Settings" } },
			{ path: "feature-locked/:key", name: "FeatureLocked", component: () => import("@/pages/FeatureLockedPage.vue"), meta: { title: "PayrollOS Pro" } },
		],
	},

	{ path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/pages/NotFound.vue"), meta: { public: true } },
]

const router = createRouter({
	history: createWebHistory("/payrollos"),
	routes,
})

router.beforeEach(async (to) => {
	if (to.meta.public) return true

	if (!session.isLoggedIn) {
		await fetchContext()
	}
	if (!session.isLoggedIn) {
		return { name: "Login", query: { redirect: to.fullPath } }
	}

	return true
})

export default router
