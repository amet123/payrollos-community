import frappe

FIELDS = [
	"name",
	"employee_name",
	"first_name",
	"last_name",
	"gender",
	"status",
	"company",
	"department",
	"designation",
	"date_of_joining",
	"date_of_birth",
	"employment_type",
	"cell_number",
	"personal_email",
	"user_id",
]


@frappe.whitelist()
def list_employees(company=None, status="Active", search=None, limit_start=0, limit_page_length=20):
	filters = {}
	if company:
		filters["company"] = company
	if status:
		filters["status"] = status

	or_filters = None
	if search:
		or_filters = [
			["employee_name", "like", f"%{search}%"],
			["name", "like", f"%{search}%"],
		]

	return frappe.get_list(
		"Employee",
		fields=FIELDS,
		filters=filters,
		or_filters=or_filters,
		order_by="employee_name asc",
		limit_start=cint_or_zero(limit_start),
		limit_page_length=cint_or_zero(limit_page_length) or 20,
	)


@frappe.whitelist()
def get_employee(name):
	doc = frappe.get_doc("Employee", name)
	doc.check_permission("read")
	return doc.as_dict()


@frappe.whitelist()
def create_employee(data):
	if isinstance(data, str):
		data = frappe.parse_json(data)

	doc = frappe.get_doc({"doctype": "Employee", **data})
	doc.insert()
	return doc.as_dict()


def cint_or_zero(value):
	try:
		return int(value)
	except (TypeError, ValueError):
		return 0
