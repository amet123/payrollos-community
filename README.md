# PayrollOS Community

An open-source, self-hostable payroll UI built on top of [Frappe HR](https://github.com/frappe/hrms) — run payroll, manage salary structures, and issue payslips from one clean admin console.

PayrollOS Community does not define its own payroll engine or its own Employee/Salary Slip records. It's a thin, premium UI + a small API layer over the standard, battle-tested `hrms` Payroll module (Salary Structure, Salary Structure Assignment, Salary Component, Salary Slip, Payroll Entry). Your data lives in standard Frappe HR doctypes — no lock-in.

## What's in Community vs Pro

| | Community (this repo) | [PayrollOS Pro](#upgrading-to-pro) |
|---|---|---|
| Employees, Salary Structures, Payroll Runs, Payslips | ✅ | ✅ |
| Statutory reports (PF/ESI/PT/TDS, Form 16/24Q) | — | ✅ |
| Hiring & onboarding, Loans, Reimbursements | — | ✅ |
| Gratuity, Bonus, Group Insurance | — | ✅ |
| AI HR Copilot | — | ✅ |
| Bank export/reconciliation, parallel-run validation | — | ✅ |

Locked nav items in the app show what Pro adds — click one to see details.

## Requirements

Because this app depends on `hrms`, and `hrms` itself depends on `erpnext`, a full install is:

- Frappe v15
- ERPNext v15
- Frappe HR (`hrms`) v15.60+
- This app (`payroll_os_community`)

This is **not** a lightweight frappe-only install — it brings in the full ERPNext stack as a dependency. If you already run ERPNext + HR, this is just one more app on top.

## Installation

```bash
bench get-app hrms
bench get-app payroll_os_community https://github.com/amet123/payrollos-community

bench new-site yoursite.local
bench --site yoursite.local install-app hrms
bench --site yoursite.local install-app payroll_os_community
```

## First login

```
http://yoursite.local/payrollos
```

Log in with the Administrator account and password you set during `bench new-site`.

## Upgrading to Pro

PayrollOS Pro is a separate, privately-licensed add-on app that installs alongside Community (`bench get-app` + `bench install-app` for the Pro app, in addition to Community — not a config flag). It unlocks statutory compliance, hiring, loans, reimbursements, gratuity/bonus/insurance, an AI copilot, and more.

**Note:** Pro runs its own independent data model — installing it does not merge with the Employees/Payroll Runs you've already created in Community. This is a known v1 limitation.

Contact your PayrollOS administrator, or reach out at hello@payrollos.app, to get access.

## License

MIT — see [LICENSE](LICENSE).

## Contributing

Issues and PRs welcome.
