---
name: reports
description: "Use when submitting or tracking statutory filings — 10-K/20-F, 10-Q, SOX attestations, annual compliance reports — per legal entity per jurisdiction — filing status, due dates, regulator feedback, and linked audit findings. The regulatory-filing register."
atomPath: "legal/entities/regulatory/reports"
coordinate: "legal/entities/regulatory/reports · 7/descent · ff174604"
contentUuid: "c05178d2-e161-5d24-804c-a14b465f93d7"
diamondUuid: "1a66b869-25a9-800f-9163-8b941721943e"
uuid: "ff174604-bbde-82d3-9cce-b61abcc50974"
horo: 7
typography:
  partition: legal
  bondDegree: 28
standards:
  - "SAF-T"
  - "SAF-T OECD standard-audit-file-tax"
  - XBRL
  - "XBRL business-reporting"
  - "local-regulatory-filing"
bindings: []
signatures:
  computationUuid: "4acca843-3fe8-86e4-9be5-d6551c937a5e"
  stages:
    - stage: path
      stageUuid: "763d0e92-636c-8473-bf9f-47178fee4ad5"
    - stage: trinity
      stageUuid: "ce1ec4ef-9d6a-83e6-82ff-cdafe702beaa"
    - stage: boundary
      stageUuid: "90fdb745-1853-8b9b-8024-924f36ca4c65"
    - stage: links
      stageUuid: "6eccfbb3-f25c-825e-a1c4-b2d315daaaf6"
    - stage: horo
      stageUuid: "a9d228a3-2fb8-864e-ba39-5988b132b379"
    - stage: seal
      stageUuid: "485f02ef-b0d4-8724-a33a-89669e61e556"
    - stage: uuid
      stageUuid: "b5ce7ae8-76ab-8f77-b669-b266118d1611"
version: 2
---
# regulatory-reports

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- SAF-T OECD standard-audit-file-tax
- XBRL business-reporting
- local-regulatory-filing
- ISO-27001 A.5.23 cloud-service-tenant-isolation
