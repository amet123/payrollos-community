import frappe


@frappe.whitelist()
def list_structures(company=None):
	filters = {}
	if company:
		filters["company"] = company
	return frappe.get_list(
		"Salary Structure",
		fields=["name", "company", "is_active", "payroll_frequency", "currency", "docstatus"],
		filters=filters,
		order_by="modified desc",
	)


@frappe.whitelist()
def get_structure(name):
	doc = frappe.get_doc("Salary Structure", name)
	doc.check_permission("read")
	return doc.as_dict()


@frappe.whitelist()
def create_structure(data):
	"""data: {company, payroll_frequency, currency, earnings: [...], deductions: [...]}
	Each earnings/deductions row: {salary_component, amount} or {salary_component, formula}.
	Structure is created in Draft — call submit_structure to make it assignable."""
	if isinstance(data, str):
		data = frappe.parse_json(data)

	doc = frappe.get_doc(
		{
			"doctype": "Salary Structure",
			"company": data.get("company"),
			"payroll_frequency": data.get("payroll_frequency", "Monthly"),
			"currency": data.get("currency"),
			"is_active": "Yes",
			"earnings": data.get("earnings", []),
			"deductions": data.get("deductions", []),
		}
	)
	doc.insert()
	return doc.as_dict()


@frappe.whitelist()
def submit_structure(name):
	doc = frappe.get_doc("Salary Structure", name)
	doc.check_permission("submit")
	if doc.docstatus == 0:
		doc.submit()
	return doc.as_dict()


@frappe.whitelist()
def assign_structure(name, employee, from_date, base=None, variable=None, payroll_payable_account=None):
	doc = frappe.get_doc("Salary Structure", name)
	doc.check_permission("write")
	doc.assign_salary_structure(
		employee=employee,
		from_date=from_date,
		base=base,
		variable=variable,
		payroll_payable_account=payroll_payable_account,
	)
	return {"ok": True}


@frappe.whitelist()
def list_assignments(structure=None, employee=None):
	filters = {"docstatus": 1}
	if structure:
		filters["salary_structure"] = structure
	if employee:
		filters["employee"] = employee
	return frappe.get_list(
		"Salary Structure Assignment",
		fields=["name", "employee", "employee_name", "salary_structure", "from_date", "base", "company"],
		filters=filters,
		order_by="from_date desc",
	)
