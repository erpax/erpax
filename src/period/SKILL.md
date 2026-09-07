---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 1/base · bd0e535b"
contentUuid: "7605c92e-b0dc-590e-b5f2-ace2bc0040d3"
diamondUuid: "3a4ae9c5-d623-8bf8-818f-7c15df6ce264"
uuid: "bd0e535b-d49c-8244-997f-249f332e7db2"
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
  computationUuid: "6acbc37c-f376-815a-b6a1-f6ead404e19c"
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
      stageUuid: "de918bbf-144b-81dd-aab2-e653ba7ac79a"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "b1dd7d32-3ab3-8379-ab6e-d0047821c86e"
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
