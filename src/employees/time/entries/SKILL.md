---
name: entries
description: "Use when logging daily employee work time — regular hours, overtime, night shifts, PTO, sick and parental leave — with kind-based GL allocation, billable-rate project costing, approval workflow, and payroll-run linkage for IAS-19 variable pay. The daily time-entry collection."
atomPath: "employees/time/entries"
coordinate: "employees/time/entries · 4/weave · d78b726a"
contentUuid: "77b4596e-9b81-5fdf-9228-afbbd2307dc4"
diamondUuid: "e984a0bc-0783-8f4c-af85-11a2275970c4"
uuid: "d78b726a-4e3a-8981-b0ad-32ac768947af"
horo: 4
typography:
  partition: employees
  bondDegree: 107
standards:
  - "GDPR Art.6(1)(b) lawful-basis-contract"
  - "IFRS IAS-19 employee-benefits short-term"
  - "ISO-4217:2015 currency-codes hourly-rate"
  - "ISO-4217:2015 currency-codes hourly-rate`"
  - "ISO-8601-1:2019 date-time work-date"
  - "ISO-8601-1:2019 date-time work-date`"
  - "SOX §404 internal-controls payroll-evidence"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress"
  - "US-GAAP ASC-710 compensation-general"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "22fd6d95-e616-86d7-826d-986644b0a001"
  stages:
    - stage: path
      stageUuid: "1b92ceef-4dfe-8d92-a351-672b766c8203"
    - stage: trinity
      stageUuid: "d8f94d76-bb1a-8c98-b6ef-71e0de3e6aec"
    - stage: boundary
      stageUuid: "ce3f9bf8-0ca4-83fa-a3b8-9f574d3edacd"
    - stage: links
      stageUuid: "f00b89f2-9089-8ef9-924c-04afbc163542"
    - stage: horo
      stageUuid: "8f420419-63c0-8442-b9de-152238d6fee5"
    - stage: seal
      stageUuid: "7c708ada-c129-830e-85f8-59de4f192e14"
    - stage: uuid
      stageUuid: "891984e7-7100-810b-921d-f54799eac7e9"
version: 2
---
# time-entries

Time Entries — per-day / per-task time records for payroll + project costing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one row per day/task of employee work time — its kind drives GL allocation and billable-rate project costing, gated by approval and linked to a payroll run for IAS-19 variable pay; a single-folder collection node (no scatter, no drift).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time work-date`
- `@standard ISO-4217:2015 currency-codes hourly-rate`

- ISO-8601-1:2019 date-time work-date
- ISO-4217:2015 currency-codes hourly-rate
- IFRS IAS-19 employee-benefits short-term
- US-GAAP ASC-710 compensation-general
- US-GAAP ASC-606 revenue-from-contracts-with-customers performance-obligation-progress
- ISO-19011:2018 audit-trail time-tracking-evidence
- SOX §404 internal-controls payroll-evidence
- GDPR Art.6(1)(b) lawful-basis-contract
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[identity]] · [[standard]] · [[proof]] · [[horo]].
