import frappe


@frappe.whitelist()
def is_pro_installed():
	return "payroll_os" in frappe.get_installed_apps()
