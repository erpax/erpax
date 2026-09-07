---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: "legal/entities/consolidations/audit/reports"
coordinate: "legal/entities/consolidations/audit/reports · 8/crest · e6f65b92"
contentUuid: "8d6a533f-1e36-58a6-ae08-be815667f355"
diamondUuid: "9c76bbff-b5ed-802a-abf9-7915fe5b34ce"
uuid: "e6f65b92-6646-81e8-8237-ca5509ae6bef"
horo: 8
typography:
  partition: legal
  bondDegree: 28
standards:
  - "ISA-700 auditor-report"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "6098b507-c33a-8bc4-8c19-644455cf9c88"
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
      stageUuid: "01f4ddbc-7a05-864f-93ad-d275932c05b3"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "7e68e9f0-2cd8-8f57-b2d5-0cab5469b0ce"
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
