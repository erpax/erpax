---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: "legal/entities/consolidations/audit/reports"
coordinate: "legal/entities/consolidations/audit/reports · 5/round · 73204c74"
contentUuid: "7157efb7-5eb2-511a-b007-9e502835a3cc"
diamondUuid: "84d2b4e0-91be-8a70-a4d4-446859213b70"
uuid: "73204c74-db78-8044-bc05-43a9ee2e6713"
horo: 5
bonds:
  in:
    - accounting
    - audit
    - balance
    - debit
    - law
    - path
  out:
    - accounting
    - balance
    - debit
    - law
    - path
typography:
  partition: legal
  bondDegree: 0
  neighbors: []
standards:
  - "ISA-700 auditor-report"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - reports
  matrix:
    - accounting
    - balance
    - debit
    - law
    - path
  backlinks:
    - accounting
    - balance
    - debit
    - law
    - path
signatures:
  computationUuid: "ed8dee24-e32d-8b9b-a8be-8bc6fe15bdf6"
  stages:
    - stage: path
      stageUuid: "f737bd84-3a71-8275-ba40-d77605bda028"
    - stage: trinity
      stageUuid: "92b89b43-f62c-899b-8df4-c335d62bef70"
    - stage: boundary
      stageUuid: "8d7ad6a4-cee3-813a-bb3e-1096129ff179"
    - stage: links
      stageUuid: "fd1ba99b-81d1-8376-a1e3-4c76dfe97fa5"
    - stage: horo
      stageUuid: "0c2b3f5c-7aa2-856f-a7d5-e56d61d955e4"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "05531ada-9db8-8b6c-80d1-05b4202fbcd7"
version: 2
---
# audit-reports

AuditReports Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISA-700 auditor-report
- ISO-19011:2018 reporting
- SOX §404 internal-controls

Composes: [[legal/entities/consolidations/audit/reports/post/close/analytics/reports]].
