---
name: reports
description: "Use when submitting, approving or auditing employee expense claims — per-diem, mileage, airfare, hotel, receipts, multi-step approval chain, reimbursement via payroll or AP — with GL coding, FX conversion, policy-compliance flags and SOX §404 four-eyes enforcement. The employee expense-claim collection."
atomPath: employees/expense/reports
coordinate: employees/expense/reports · 5/round · 33f75b6c
contentUuid: "1d9ff766-f05c-5fb7-966e-549acc4d2652"
diamondUuid: "63ec5f43-afa1-8e7f-a3c0-338caa690d30"
uuid: "33f75b6c-6e8d-8b5a-a1e5-621576d6c0fb"
horo: 5
bonds:
  in:
    - accounting
    - employees
    - expense
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
  out:
    - accounting
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
typography:
  partition: employees
  bondDegree: 29
  neighbors: []
standards:
  - "GDPR Art.5 PII receipt-images"
  - "IFRS IAS-19 employee-benefits"
  - "IFRS IAS-21 §28 fx-on-reimbursement"
  - "ISO-19011:2018 audit-trail expense-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls four-eyes"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - employees
    - identity
    - law
    - projects
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "28221317-bb88-88e0-8b48-92be941beb76"
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
      stageUuid: "7c23724d-d208-83e8-ab8a-9eb55b2eda4d"
    - stage: seal
      stageUuid: "df5ad4cd-b7c3-81ec-9236-07c88fafff88"
    - stage: uuid
      stageUuid: "16cb3f0d-b403-836c-bd50-9f57615097c9"
version: 2
---
# expense-reports

Expense Reports — employee expense claims with approval + reimbursement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
