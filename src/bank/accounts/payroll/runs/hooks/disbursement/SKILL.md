---
name: disbursement
description: "Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable."
atomPath: bank/accounts/payroll/runs/hooks/disbursement
---
# bank/accounts/payroll/runs/hooks/disbursement

Payroll Disbursement Hook — fires on `PayrollRuns.status → 'disbursed'` and creates a `payment-runs` row (messageType = pain_001) drawing against the Net Payroll Payable.

Extracted from `bank/accounts/payroll/runs/hooks/disbursement.ts`: a matter file at an atom root is a stray sibling — only `index.ts`, `test.ts` and `seed.ts` live beside a barrel ([[rules]]) — and the lawful form is the child atom it already was, with its own proof beside it.

Composes: [[bank/accounts/payroll/runs]].
