---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: "legal/entities/consolidations/audit/reports"
coordinate: "legal/entities/consolidations/audit/reports · 2/share · 3c3a5a42"
contentUuid: "613504a4-b6b3-5235-bd60-21ee59f9b363"
diamondUuid: "4e7fcad8-c9ca-84f3-beb8-9edbf142d1f7"
uuid: "3c3a5a42-3553-8606-9a79-73e007fdea05"
horo: 2
typography:
  partition: legal
  bondDegree: 28
standards:
  - "ISA-700 auditor-report"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "b733ebb8-4265-809b-b70c-77992458764c"
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
      stageUuid: "86175620-325c-8d18-8aff-8809dd9d10bb"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "1213a19d-e74f-839f-a32b-d2654cc180ed"
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
