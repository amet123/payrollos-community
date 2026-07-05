# Copyright (c) 2026, PayrollOS and contributors
# For license information, please see license.txt
"""Server context for the PayrollOS Community SPA entry page.

Injects the session CSRF token into the rendered HTML so the frappe-ui request
layer (which reads window.csrf_token) can make authenticated calls.
"""

import frappe


def get_context(context):
	context.no_cache = 1
	context.csrf_token = (
		frappe.sessions.get_csrf_token() if frappe.session.user != "Guest" else ""
	)
	frappe.db.commit()
	return context
