---
name: reports
description: "Use when submitting, approving or auditing employee expense claims — per-diem, mileage, airfare, hotel, receipts, multi-step approval chain, reimbursement via payroll or AP — with GL coding, FX conversion, policy-compliance flags and SOX §404 four-eyes enforcement. The employee expense-claim collection."
atomPath: "employees/expense/reports"
coordinate: "employees/expense/reports · 4/weave · 9386d532"
contentUuid: "34c42cb9-648d-5b21-9dd5-40c015042239"
diamondUuid: "e8c1b91a-2706-812f-8ed4-19f795576455"
uuid: "9386d532-5b39-8d0b-a3e8-b590e9faba43"
horo: 4
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
  computationUuid: "b60b4384-2d9d-8ed5-8257-749c0fb4de4f"
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
      stageUuid: "7dfbd710-d93b-821a-ae3b-e236a00ac95e"
    - stage: seal
      stageUuid: "df5ad4cd-b7c3-81ec-9236-07c88fafff88"
    - stage: uuid
      stageUuid: "4e79e6c5-e2e2-8351-a5a5-6a0c3e2ba414"
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
