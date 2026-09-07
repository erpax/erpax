---
name: reports
description: "Use when submitting, approving or auditing employee expense claims — per-diem, mileage, airfare, hotel, receipts, multi-step approval chain, reimbursement via payroll or AP — with GL coding, FX conversion, policy-compliance flags and SOX §404 four-eyes enforcement. The employee expense-claim collection."
atomPath: "employees/expense/reports"
coordinate: "employees/expense/reports · 2/share · 3e991ac1"
contentUuid: "32d8cd36-6235-5c66-904f-765fdcb4e77d"
diamondUuid: "57292a51-317b-8fdc-8750-e3ca7179ee31"
uuid: "3e991ac1-dda3-89be-b48f-257c5cfc19a9"
horo: 2
typography:
  partition: employees
  bondDegree: 28
standards:
  - "GDPR Art.5 PII receipt-images"
  - "IFRS IAS-19 employee-benefits"
  - "IFRS IAS-21 §28 fx-on-reimbursement"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls four-eyes"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "829474fa-239d-8f6e-885b-10efe8a4e685"
  stages:
    - stage: path
      stageUuid: "403f2ee9-d470-8577-b33a-d3122cc50e6c"
    - stage: trinity
      stageUuid: "56d5235d-b64e-82f4-9d99-65f418788ec3"
    - stage: boundary
      stageUuid: "d55b7aa1-e157-8eef-81ec-b30bf3e303d1"
    - stage: links
      stageUuid: "fecec840-64b4-8347-9416-8487f4720f4b"
    - stage: horo
      stageUuid: "fcd8c40a-45af-8596-9246-9ef7a804c5c6"
    - stage: seal
      stageUuid: "df5ad4cd-b7c3-81ec-9236-07c88fafff88"
    - stage: uuid
      stageUuid: "50222cbf-8b56-82c3-928c-0b60fb4669de"
version: 2
---
# expense-reports

Expense Reports — employee expense claims with approval + reimbursement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time
- ISO-4217:2015 currency-codes
- IFRS IAS-19 employee-benefits
- IFRS IAS-21 §28 fx-on-reimbursement
- GDPR Art.5 PII receipt-images
- SOX §404 internal-controls four-eyes
- ISO-19011:2018 audit-trail expense-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[Projects]] · [[accounting]] · [[transaction]] · [[identity]] · [[proof]] · [[standard]].

**Law — [[law]]: no expense claim reimburses without passing the SOX §404 four-eyes approval chain (claimant ≠ approver), GL-coded and FX-converted before it posts.**
