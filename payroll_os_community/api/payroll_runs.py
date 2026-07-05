import frappe
from frappe.utils import nowdate


@frappe.whitelist()
def create_run(company, start_date, end_date, payroll_frequency="Monthly", cost_center=None,
	payroll_payable_account=None, currency=None):
	doc = frappe.get_doc(
		{
			"doctype": "Payroll Entry",
			"posting_date": nowdate(),
			"company": company,
			"payroll_frequency": payroll_frequency,
			"start_date": start_date,
			"end_date": end_date,
			"cost_center": cost_center or f"Main - {frappe.db.get_value('Company', company, 'abbr')}",
			"currency": currency or frappe.db.get_value("Company", company, "default_currency"),
			"exchange_rate": 1,
			"payroll_payable_account": payroll_payable_account
			or frappe.db.get_value("Company", company, "default_payroll_payable_account"),
		}
	)
	doc.insert()
	return doc.as_dict()


@frappe.whitelist()
def fill_employees(payroll_entry):
	doc = frappe.get_doc("Payroll Entry", payroll_entry)
	doc.check_permission("write")
	unmarked = doc.fill_employee_details()
	doc.save()
	return {"number_of_employees": doc.number_of_employees, "unmarked_attendance": unmarked}


@frappe.whitelist()
def create_slips(payroll_entry):
	doc = frappe.get_doc("Payroll Entry", payroll_entry)
	doc.check_permission("write")
	doc.create_salary_slips()
	doc.reload()
	return doc.as_dict()


@frappe.whitelist()
def submit_slips(payroll_entry):
	doc = frappe.get_doc("Payroll Entry", payroll_entry)
	doc.check_permission("write")
	doc.submit_salary_slips()
	doc.reload()
	return doc.as_dict()


@frappe.whitelist()
def unmarked_attendance(payroll_entry):
	doc = frappe.get_doc("Payroll Entry", payroll_entry)
	doc.check_permission("read")
	return doc.get_employees_with_unmarked_attendance()


@frappe.whitelist()
def list_runs(company=None):
	filters = {}
	if company:
		filters["company"] = company
	return frappe.get_list(
		"Payroll Entry",
		fields=["name", "company", "start_date", "end_date", "status", "number_of_employees",
			"salary_slips_created", "salary_slips_submitted", "posting_date"],
		filters=filters,
		order_by="posting_date desc",
	)


@frappe.whitelist()
def get_run(name):
	doc = frappe.get_doc("Payroll Entry", name)
	doc.check_permission("read")
	return doc.as_dict()
