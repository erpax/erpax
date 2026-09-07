---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 8/crest · 08ee54b7"
contentUuid: "1cf441cd-c64d-557d-9037-04fe9e05661d"
diamondUuid: "281d12a0-eabf-88b2-9891-f10e081f00a5"
uuid: "08ee54b7-69cc-86c4-a9b7-a28649aa1ad0"
horo: 8
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
  computationUuid: "d0834795-8bdc-8f30-a105-735aac768bcb"
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
      stageUuid: "a945d89e-4d04-8be6-8f9d-44d865428cb2"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "b32d55ba-1688-84a0-b7b3-36f6948b769f"
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
