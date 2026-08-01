---
name: reports
description: "Use when submitting or tracking statutory filings — 10-K/20-F, 10-Q, SOX attestations, annual compliance reports — per legal entity per jurisdiction — filing status, due dates, regulator feedback, and linked audit findings. The regulatory-filing register."
atomPath: "legal/entities/regulatory/reports"
coordinate: "legal/entities/regulatory/reports · 5/round · ea63c8fb"
contentUuid: "a7813f33-3008-5d44-9b21-833a5b6cf968"
diamondUuid: "2c652548-fa82-8f72-a990-cfdb037e092c"
uuid: "ea63c8fb-6d16-8798-8336-8d78cf5013e5"
horo: 5
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
  computationUuid: "5cc06074-83d6-8ecc-adcc-5ab9a3582390"
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
      stageUuid: "12bc5783-bd72-85db-b589-e823e94b14c1"
    - stage: seal
      stageUuid: "485f02ef-b0d4-8724-a33a-89669e61e556"
    - stage: uuid
      stageUuid: "1e69ad8c-57b0-8778-9b29-82594ee5bdc5"
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
