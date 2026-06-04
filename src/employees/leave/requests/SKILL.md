---
name: leave-requests
description: Use when managing employee leave — annual vacation, sick, parental, TOIL, bereavement — approval workflow, entitlement balance decrement, IAS-19 accrual feed, and multi-jurisdiction minimum-leave compliance (EU WTD, US FMLA, BG Labour Code). The employee leave-request register.
---

# leave-requests

Leave Requests — vacation / sick / parental / unpaid leave register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time
- IFRS IAS-19 §11 §13 §14 short-term-employee-benefits
- IFRS IAS-19 §16 accumulating-paid-absences
- US-GAAP ASC-710-10-25 compensated-absences
- EU Working Time Directive 2003/88/EC minimum-leave
- US FMLA family-medical-leave-act
- BG Labour Code Art.155-176
- ISO-19011:2018 audit-trail leave-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[identity]] · [[proof]] · [[standard]] · [[transaction]].
