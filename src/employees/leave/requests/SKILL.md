---
name: requests
description: "Use when managing employee leave — annual vacation, sick, parental, TOIL, bereavement — approval workflow, entitlement balance decrement, IAS-19 accrual feed, and multi-jurisdiction minimum-leave compliance (EU WTD, US FMLA, BG Labour Code). The employee leave-request register."
atomPath: "employees/leave/requests"
coordinate: "employees/leave/requests · 5/round · 4528a738"
contentUuid: "2f010543-174b-5a32-97c0-484619c02422"
diamondUuid: "68e293b9-1710-8768-86f0-2af601b017d5"
uuid: "4528a738-bafe-8291-b059-7e93c39dbc6a"
horo: 5
typography:
  partition: employees
  bondDegree: 37
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
signatures:
  computationUuid: "bb1b37ed-8fb5-803b-bb1f-6d04bcbc7496"
  stages:
    - stage: path
      stageUuid: "3dc04419-a2dc-821f-904c-c83e478dff54"
    - stage: trinity
      stageUuid: "7f704df5-e5c9-860f-83f7-cbff50fb2aa2"
    - stage: boundary
      stageUuid: "30b429c3-5659-8526-b6e3-f4377a803393"
    - stage: links
      stageUuid: "e412a273-b316-8424-9e1d-0cda24512e74"
    - stage: horo
      stageUuid: "bed9779c-ff51-853c-8ad0-9409750eb1a9"
    - stage: seal
      stageUuid: "277cfb7e-153e-86d2-bfcd-e76ff9fb1d58"
    - stage: uuid
      stageUuid: "b2a58716-c99a-8542-ac27-c97c474c0b32"
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
