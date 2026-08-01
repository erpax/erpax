---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 1/base · 412d29ec"
contentUuid: "c417ecff-1a53-5e0b-9952-b3f5ad3672fe"
diamondUuid: "220700f7-b706-87ee-b526-17e2da2fe42a"
uuid: "412d29ec-8327-8eed-838b-29127534f4da"
horo: 1
typography:
  partition: period
  bondDegree: 0
standards:
  - "EU-2016/679"
  - "IAS-34"
  - "ISO-8601-1`"
  - "NIST-SP-800-92"
  - "SAF-T"
  - SOX
  - XBRL
  - eIDAS
bindings: []
signatures:
  computationUuid: "beb937dc-b996-8b92-901c-0eeea183928f"
  stages:
    - stage: path
      stageUuid: "b55a4ed0-f8bd-8f54-b239-ea0b09de9d96"
    - stage: trinity
      stageUuid: "34b4fe05-df87-8bfa-9ad0-c701a94f6fe9"
    - stage: boundary
      stageUuid: "ddb06c92-57a3-8231-826d-33169fa48015"
    - stage: links
      stageUuid: "2ab4c253-f5b1-8d0e-9e0f-a9f50a9bd094"
    - stage: horo
      stageUuid: "a5c1aaaf-b1ce-8b99-af50-36dea6faedb7"
    - stage: seal
      stageUuid: "9e6e513b-7d18-86fb-9ea0-bc38f759f276"
    - stage: uuid
      stageUuid: "16cde1bc-16dc-8f42-afce-7d105a029322"
version: 2
---
# period

Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning.

Composes: [[date]] · [[fields]] · [[versions]] · [[accounting]] · [[start]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`

- ISO-8601-1:2019

**Law — [[law]]: a period is a date-range from [[start]] to end (or a fiscal-period code) that fixes the time-based [[accounting]] cutoff — which period a value falls in — and drives [[versions]] over that span.**
