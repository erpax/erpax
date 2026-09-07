---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: "legal/entities/consolidations/audit/reports"
coordinate: "legal/entities/consolidations/audit/reports · 7/descent · 645f3397"
contentUuid: "1772ad85-ba41-5f75-9d1f-ead58c55ed91"
diamondUuid: "dd2d07e3-206e-8e52-9a43-e38fce52cab8"
uuid: "645f3397-321e-857d-94b5-f9bcadfa8cbe"
horo: 7
typography:
  partition: legal
  bondDegree: 28
standards:
  - "ISA-700 auditor-report"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "830d710b-db30-8d76-8104-cb72800a12d9"
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
      stageUuid: "484a12e7-4d64-8c3c-bf07-6e6be97bb9da"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "592321e2-1e98-80ad-bec7-e21b543eddff"
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
