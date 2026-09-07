---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 8/crest · 5ffe20d4"
contentUuid: "e97bdfbf-7e5a-5954-9349-98fd590b9f31"
diamondUuid: "4d056658-45c1-8d9d-a06f-97fe7f939e61"
uuid: "5ffe20d4-1953-8c77-9908-b07310555eac"
horo: 8
typography:
  partition: period
  bondDegree: 57
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
  computationUuid: "805b697e-c41a-81a1-aa6b-7e3154241004"
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
      stageUuid: "7cf1e66c-6b7d-8c19-bc93-04e7d7257384"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "9c0bb0b5-89a0-8b1b-9270-d5cc3a20d0a8"
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
