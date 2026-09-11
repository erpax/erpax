---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 2/share · 8e6d8ec8"
contentUuid: "07806f71-dd97-54c6-bd66-dc17a01a56b8"
diamondUuid: "bf5fbb71-c3ae-86fa-939c-7a0c42e8b3b5"
uuid: "8e6d8ec8-3417-8251-be1a-acec38b43b69"
horo: 2
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
  computationUuid: "4c174440-2c4c-80ec-9ba1-616a619ac799"
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
      stageUuid: "cc019b5e-a80c-8218-9fd5-7fdc2ef6d8ee"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "235be795-72db-82dc-a78d-ce4cfbab1621"
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
