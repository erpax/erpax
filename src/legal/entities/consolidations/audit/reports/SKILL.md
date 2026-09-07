---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: "legal/entities/consolidations/audit/reports"
coordinate: "legal/entities/consolidations/audit/reports · 8/crest · 1ca81d9d"
contentUuid: "c3c1892f-f141-5f9c-8f0a-ac7885b64156"
diamondUuid: "c7efce94-15f2-8398-95ba-2d4fe444cd11"
uuid: "1ca81d9d-9d11-85c9-b1d0-04dab627cc4f"
horo: 8
typography:
  partition: legal
  bondDegree: 28
standards:
  - "ISA-700 auditor-report"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "2eaa1412-7fca-8014-810f-c7bf3e56f3f1"
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
      stageUuid: "c1e0f852-3341-8d61-9f86-12646d7f410c"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "95a6b135-30db-8bad-8a48-8f820b276a1a"
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
