---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 1/base · 24d3734d"
contentUuid: "5e9fdd31-9531-55dc-949c-560cbc14bdc6"
diamondUuid: "2af75c35-11f6-844c-850e-1a961afead31"
uuid: "24d3734d-0450-8373-b26c-8bd39c2e393a"
horo: 1
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
  computationUuid: "9f9b67a5-ff44-8df4-afed-bc327965b49a"
  stages:
    - stage: path
      stageUuid: "b55a4ed0-f8bd-8f54-b239-ea0b09de9d96"
    - stage: trinity
      stageUuid: "34b4fe05-df87-8bfa-9ad0-c701a94f6fe9"
    - stage: boundary
      stageUuid: "080915b9-d373-8ea1-9ddc-f482a1952d1a"
    - stage: links
      stageUuid: "87905c94-e4e4-88e5-b7c2-e063de24aed5"
    - stage: horo
      stageUuid: "e30a4b52-077d-8b31-8f23-071cb8dce3c0"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "06d4ab10-0273-8e3a-8603-955bf25bb364"
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
