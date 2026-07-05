import frappe

FIELDS = [
	"name",
	"employee",
	"employee_name",
	"posting_date",
	"start_date",
	"end_date",
	"payroll_entry",
	"status",
	"gross_pay",
	"total_deduction",
	"net_pay",
	"currency",
	"docstatus",
]


@frappe.whitelist()
def list_payslips(employee=None, payroll_entry=None, limit_start=0, limit_page_length=20):
	filters = {}
	if employee:
		filters["employee"] = employee
	if payroll_entry:
		filters["payroll_entry"] = payroll_entry

	return frappe.get_list(
		"Salary Slip",
		fields=FIELDS,
		filters=filters,
		order_by="posting_date desc",
		limit_start=cint_or_zero(limit_start),
		limit_page_length=cint_or_zero(limit_page_length) or 20,
	)


@frappe.whitelist()
def get_payslip(name):
	doc = frappe.get_doc("Salary Slip", name)
	doc.check_permission("read")
	return doc.as_dict()


def cint_or_zero(value):
	try:
		return int(value)
	except (TypeError, ValueError):
		return 0
