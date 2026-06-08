---
name: reports
description: "Use when generating or tracking immutable audit reports and regulatory filings — SAF-T 3.0.2 audit files, jurisdiction-specific tax filings, transfer-pricing documentation packages, and cross-jurisdiction optimization analysis per ISA-700 / SOX §404. The audit-report generation and submission collection."
atomPath: legal/entities/consolidations/audit/reports
coordinate: legal/entities/consolidations/audit/reports · 4/weave · 9eb8e064
contentUuid: "39ecbd89-8dbe-5fdd-ab73-ebe9a6354b5d"
diamondUuid: "d16ed004-4465-8d09-ba96-5f4d8f9670cc"
uuid: "9eb8e064-0a3a-8cd4-bbfc-cbd8cf30a3a0"
horo: 4
bonds:
  in:
    - accounting
    - audit
    - employees
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
  partition: legal
  bondDegree: 0
  neighbors: []
standards:
  - "ISA-700 auditor-report"
  - "ISO-19011:2018 reporting"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - reports
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
  computationUuid: "45b85e11-86f1-8327-9d12-79064f532c5a"
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
      stageUuid: "b6596cab-df4f-85ea-b9a9-be9e60710aa2"
    - stage: seal
      stageUuid: "95207687-9e45-8668-a4ea-e1bacb94eb6e"
    - stage: uuid
      stageUuid: "ed4de121-b2b6-8a5f-a444-1b487a6d7b14"
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
