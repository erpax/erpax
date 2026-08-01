---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: "legal/entities/consolidations/audit/reports"
coordinate: "legal/entities/consolidations/audit/reports · 4/weave · 61ea0446"
contentUuid: "3b548e32-e440-571b-96e3-fb7d8e027230"
diamondUuid: "699a88d7-c866-851a-9720-12c8e6251161"
uuid: "61ea0446-8bc6-8821-b859-298e7783e186"
horo: 4
typography:
  partition: legal
  bondDegree: 0
standards:
  - "ISA-700 auditor-report"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "7d198b78-46db-824d-b242-91953c772fae"
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
      stageUuid: "d74d7104-ba67-8ec3-9545-67794579b709"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "ae701870-6b33-8eeb-b9b8-06f988168be0"
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
