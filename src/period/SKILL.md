---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 1/base · b25c07e8"
contentUuid: "90f67552-1299-5523-a8db-85dd4b7a5e13"
diamondUuid: "36a53753-8279-8719-9310-c319db8f53f0"
uuid: "b25c07e8-7181-8c86-9ec6-da3567d9279b"
horo: 1
typography:
  partition: period
  bondDegree: 55
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
  computationUuid: "24d009cd-a17d-83d2-b7a6-cac5c3d703fc"
  stages:
    - stage: path
      stageUuid: "b55a4ed0-f8bd-8f54-b239-ea0b09de9d96"
    - stage: trinity
      stageUuid: "34b4fe05-df87-8bfa-9ad0-c701a94f6fe9"
    - stage: boundary
      stageUuid: "9f86ace4-9788-846a-a2b2-321649d47ecd"
    - stage: links
      stageUuid: "bc6cbc97-39cd-8bbf-bbd4-8d4cc38b87c2"
    - stage: horo
      stageUuid: "7e0b2a61-90d2-8c75-b42b-28df7ef1d2ae"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "7dab27f8-1a71-873b-9f65-7ac00667040b"
version: 2
---
# period

Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning.

Composes: [[date]] · [[field]] · [[versions]] · [[accounting]] · [[start]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`

- ISO-8601-1:2019

**Law — [[law]]: a period is a date-range from [[start]] to end (or a fiscal-period code) that fixes the time-based [[accounting]] cutoff — which period a value falls in — and drives [[versions]] over that span.**
