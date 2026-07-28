---
name: requests
description: "Use when managing employee leave — annual vacation, sick, parental, TOIL, bereavement — approval workflow, entitlement balance decrement, IAS-19 accrual feed, and multi-jurisdiction minimum-leave compliance (EU WTD, US FMLA, BG Labour Code). The employee leave-request register."
atomPath: "employees/leave/requests"
coordinate: "employees/leave/requests · 8/crest · 46f40ae1"
contentUuid: "ba919e5c-7ddb-5eac-9c6d-e63d5bf8f181"
diamondUuid: "94c71d2e-20fe-82cd-bdf5-f81f4ae389dc"
uuid: "46f40ae1-c44b-879d-873b-a3acea90d416"
horo: 8
bonds:
  in:
    - assets
    - law
    - leave
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
  out:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
typography:
  partition: employees
  bondDegree: 37
  neighbors: []
standards:
  - "BG Labour Code Art.155-176"
  - "BG-Labour-Code"
  - "EU Working Time Directive 2003/88/EC minimum-leave"
  - "EU-Directive-2003/88/EC"
  - "IAS-19"
  - "IFRS IAS-19 §11 §13 §14 short-term-employee-benefits"
  - "IFRS IAS-19 §16 accumulating-paid-absences"
  - "ISO-8601-1:2019"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "US FMLA family-medical-leave-act"
  - "US-FMLA"
  - "US-GAAP ASC-710-10-25 compensated-absences"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
  backlinks:
    - assets
    - law
    - orders
    - properties
    - request
    - resources
    - spaces
    - users
signatures:
  computationUuid: "3f51d237-e6d5-8a91-84af-6c52a1608326"
  stages:
    - stage: path
      stageUuid: "3dc04419-a2dc-821f-904c-c83e478dff54"
    - stage: trinity
      stageUuid: "7f704df5-e5c9-860f-83f7-cbff50fb2aa2"
    - stage: boundary
      stageUuid: "30b429c3-5659-8526-b6e3-f4377a803393"
    - stage: links
      stageUuid: "93c5c8e5-cfe1-874f-b6b0-68db2062ab8f"
    - stage: horo
      stageUuid: "c6ce0a1c-e3e8-8e2b-93b0-df3d8e095812"
    - stage: seal
      stageUuid: "277cfb7e-153e-86d2-bfcd-e76ff9fb1d58"
    - stage: uuid
      stageUuid: "9a8764bd-e16b-81b7-ba38-13fb4087cb5d"
version: 2
---
# leave-requests

Leave Requests — vacation / sick / parental / unpaid leave register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: one row per employee leave request — its approval decrements the entitlement balance and feeds the IAS-19 accrual, checked against multi-jurisdiction minimum-leave rules; a single-folder collection node (no scatter, no drift).**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

- ISO-8601-1:2019 date-time
- IFRS IAS-19 §11 §13 §14 short-term-employee-benefits
- IFRS IAS-19 §16 accumulating-paid-absences
- US-GAAP ASC-710-10-25 compensated-absences
- EU Working Time Directive 2003/88/EC minimum-leave
- US FMLA family-medical-leave-act
- BG Labour Code Art.155-176
- ISO-19011:2018 audit-trail leave-evidence
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[identity]] · [[proof]] · [[standard]] · [[transaction]].
