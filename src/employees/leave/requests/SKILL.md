---
name: requests
description: "Use when managing employee leave — annual vacation, sick, parental, TOIL, bereavement — approval workflow, entitlement balance decrement, IAS-19 accrual feed, and multi-jurisdiction minimum-leave compliance (EU WTD, US FMLA, BG Labour Code). The employee leave-request register."
atomPath: "employees/leave/requests"
coordinate: "employees/leave/requests · 7/descent · 1a514c88"
contentUuid: "6991a55b-974d-567f-9874-c71062c1b349"
diamondUuid: "749bf94b-2aea-80bb-ab83-fd085e1e64cc"
uuid: "1a514c88-ea5c-8800-9b8d-9a137b120ba2"
horo: 7
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
  computationUuid: "541695e3-9ea5-8506-8804-f3c12bfabdb9"
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
      stageUuid: "006654b1-3e8d-826c-9e11-cdc06db4d482"
    - stage: seal
      stageUuid: "277cfb7e-153e-86d2-bfcd-e76ff9fb1d58"
    - stage: uuid
      stageUuid: "e8d2bd3f-22db-8213-bcd8-8e5dfb046f50"
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
