---
name: requests
description: "Use when managing employee leave — annual vacation, sick, parental, TOIL, bereavement — approval workflow, entitlement balance decrement, IAS-19 accrual feed, and multi-jurisdiction minimum-leave compliance (EU WTD, US FMLA, BG Labour Code). The employee leave-request register."
atomPath: "employees/leave/requests"
coordinate: "employees/leave/requests · 8/crest · 4e48ba29"
contentUuid: "1038ee32-c921-548f-94c5-deb3cdb55444"
diamondUuid: "24dc29a5-b261-8166-968e-bb3a21e3addb"
uuid: "4e48ba29-697e-85c1-87f0-30eb271ef5d7"
horo: 8
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
  computationUuid: "189a672d-123f-80a5-a346-a4ebcb70601e"
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
      stageUuid: "b0d1a4a9-961b-87ed-a0fa-1fd56c5610cd"
    - stage: seal
      stageUuid: "277cfb7e-153e-86d2-bfcd-e76ff9fb1d58"
    - stage: uuid
      stageUuid: "9f19259b-95c1-84cb-b6e5-775db3942ea5"
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
