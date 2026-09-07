---
name: reports
description: "Use when submitting or tracking statutory filings — 10-K/20-F, 10-Q, SOX attestations, annual compliance reports — per legal entity per jurisdiction — filing status, due dates, regulator feedback, and linked audit findings. The regulatory-filing register."
atomPath: "legal/entities/regulatory/reports"
coordinate: "legal/entities/regulatory/reports · 5/round · 74b08c3c"
contentUuid: "a3f8a40e-fa11-500f-bdac-bd7c55de3506"
diamondUuid: "bfe21e22-00ab-877c-be90-99638fc4345c"
uuid: "74b08c3c-3bc3-86dc-8800-e993323eab80"
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
  computationUuid: "2f9b2aff-bd1f-8820-aee9-ec7b777eaa33"
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
      stageUuid: "05ed81a6-ba3c-8857-9d8c-0be461753dd3"
    - stage: seal
      stageUuid: "485f02ef-b0d4-8724-a33a-89669e61e556"
    - stage: uuid
      stageUuid: "fe8e071f-a1a9-8bf9-b722-56fb8db310fe"
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
