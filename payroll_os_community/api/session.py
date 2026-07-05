import frappe


@frappe.whitelist()
def context():
	"""Everything the SPA needs on boot. Community has no tenants, no
	subscription plans, no trials — it's always a single self-hosted
	install, and "Pro" is either installed on this bench or it isn't."""
	user = frappe.session.user
	return {
		"user": user,
		"full_name": frappe.utils.get_fullname(user),
		"roles": frappe.get_roles(user),
		"mode": "self_managed",
		"features": [],
		"pro_installed": "payroll_os" in frappe.get_installed_apps(),
	}


@frappe.whitelist(allow_guest=True)
def ping():
	return {"ok": True}
