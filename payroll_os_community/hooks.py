app_name = "payroll_os_community"
app_title = "PayrollOS Community"
app_publisher = "PayrollOS"
app_description = "Open-source payroll & HR self-service UI on top of Frappe HR (hrms)"
app_email = "hello@payrollos.app"
app_license = "MIT"
app_version = "0.1.0"

# PayrollOS Community defines zero doctypes of its own — it's a thin API +
# frontend layer over the standard Frappe HR (hrms) Payroll module. Installing
# this app pulls in hrms (and, transitively, erpnext) as a hard dependency.
required_apps = ["hrms"]

# ---------------------------------------------------------------------------
# SPA serving — the Vue3 + frappe-ui frontend is mounted at /payrollos.
# Built assets live in payroll_os_community/public/frontend; the entry HTML is
# copied to payroll_os_community/www/payrollos_ce.html. Deep links rewrite to
# that entry so the client-side router can take over.
#
# NOTE: the internal www page is named "payrollos_ce" (not "payrollos") even
# though the external URL is the same /payrollos — this keeps the two apps'
# www-page names distinct in case Community and the private "Pro" add-on
# (which mounts at /payrollos-pro) ever land on the same bench.
# ---------------------------------------------------------------------------
website_route_rules = [
    {"from_route": "/payrollos", "to_route": "payrollos_ce"},
    {"from_route": "/payrollos/<path:app_path>", "to_route": "payrollos_ce"},
]

doc_events = {}
scheduler_events = {}
