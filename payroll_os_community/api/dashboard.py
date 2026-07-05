import frappe
from frappe.utils import getdate


@frappe.whitelist()
def summary(company=None):
	employee_filters = {"status": "Active"}
	structure_filters = {"docstatus": 1}
	run_filters = {}
	if company:
		employee_filters["company"] = company
		structure_filters["company"] = company
		run_filters["company"] = company

	headcount = frappe.db.count("Employee", employee_filters)
	active_structures = frappe.db.count("Salary Structure", structure_filters)

	last_run = frappe.get_list(
		"Payroll Entry",
		fields=["name", "status", "posting_date", "start_date", "end_date"],
		filters=run_filters,
		order_by="posting_date desc",
		limit_page_length=1,
	)

	today = getdate()
	month_start = today.replace(day=1)
	payslip_filters = {"posting_date": [">=", month_start]}
	if company:
		payslip_filters["company"] = company
	payslip_count_this_month = frappe.db.count("Salary Slip", payslip_filters)

	return {
		"headcount": headcount,
		"active_structures": active_structures,
		"last_run": last_run[0] if last_run else None,
		"payslips_this_month": payslip_count_this_month,
	}
