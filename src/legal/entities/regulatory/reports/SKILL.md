---
name: reports
description: "Use when submitting or tracking statutory filings — 10-K/20-F, 10-Q, SOX attestations, annual compliance reports — per legal entity per jurisdiction — filing status, due dates, regulator feedback, and linked audit findings. The regulatory-filing register."
atomPath: legal/entities/regulatory/reports
coordinate: legal/entities/regulatory/reports · 2/share · 5d4754e1
contentUuid: "470e0c4f-354c-5af7-b9af-558a5be781b0"
diamondUuid: "da14a8cf-9fe2-81be-830d-9443ae0b0ffb"
uuid: "5d4754e1-9de8-8695-bed7-ae063efa2ab9"
horo: 2
bonds:
  in:
    - accounting
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
  bondDegree: 29
  neighbors: []
standards:
  - "SAF-T"
  - "SAF-T OECD standard-audit-file-tax"
  - XBRL
  - "XBRL business-reporting"
  - "local-regulatory-filing"
bindings: []
neighbors:
  wikilink: []
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
  computationUuid: "e328515f-c240-8976-8303-5963a294448a"
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
      stageUuid: "22091329-efe7-846b-a108-857718daeab6"
    - stage: seal
      stageUuid: "485f02ef-b0d4-8724-a33a-89669e61e556"
    - stage: uuid
      stageUuid: "e6887a47-ff64-83d1-be06-e7ae30c02d15"
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
