---
name: entries
description: "Use when logging daily employee work time — regular hours, overtime, night shifts, PTO, sick and parental leave — with kind-based GL allocation, billable-rate project costing, approval workflow, and payroll-run linkage for IAS-19 variable pay. The daily time-entry collection."
atomPath: "employees/time/entries"
coordinate: "employees/time/entries · 2/share · 31b6f77b"
contentUuid: "a6b20840-28c9-5db7-b0bb-7c5ba0762738"
diamondUuid: "fd472549-04f0-8232-ba1d-6b2f467f6d93"
uuid: "31b6f77b-69b9-8c8a-bd65-676b1948d982"
horo: 2
typography:
  partition: employees
  bondDegree: 113
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
  computationUuid: "fe9d3cb4-0f46-8451-8f7c-c3de68ed9158"
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
      stageUuid: "b1ea4130-9fce-8fcb-90fb-5f5dc0de0e02"
    - stage: seal
      stageUuid: "7c708ada-c129-830e-85f8-59de4f192e14"
    - stage: uuid
      stageUuid: "7cc024e8-9043-8a43-94e6-78b1cc78fb11"
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
