---
name: reports
description: "Use when submitting, approving or auditing employee expense claims — per-diem, mileage, airfare, hotel, receipts, multi-step approval chain, reimbursement via payroll or AP — with GL coding, FX conversion, policy-compliance flags and SOX §404 four-eyes enforcement. The employee expense-claim collection."
atomPath: "employees/expense/reports"
coordinate: "employees/expense/reports · 1/base · f5b1f8c7"
contentUuid: "9c754378-26c5-5d38-aac3-38574e32b166"
diamondUuid: "80d1d9d8-c415-88a9-9612-25c6f14b5bb5"
uuid: "f5b1f8c7-f9a0-8b0c-8d97-95079a9910bc"
horo: 1
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
  computationUuid: "7becdd0b-95f8-82b9-b2ee-939c2f8f2e4b"
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
      stageUuid: "3cec7b7f-245f-87dd-887a-1b405df4eed3"
    - stage: seal
      stageUuid: "df5ad4cd-b7c3-81ec-9236-07c88fafff88"
    - stage: uuid
      stageUuid: "5efff610-42cf-81e3-8c91-8ee41bfa10d1"
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
