---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 4/weave · f684a7a9"
contentUuid: "f1a89d13-08e0-5e71-bfb7-d851cc33612a"
diamondUuid: "9c9762ce-d3c5-851d-8100-9e7eabe7280e"
uuid: "f684a7a9-3e35-813a-9cdc-a3aa9d3a40f2"
horo: 4
typography:
  partition: period
  bondDegree: 41
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
  computationUuid: "4a013570-1ba0-8f1d-badd-1f63b5d2c19a"
  stages:
    - stage: path
      stageUuid: "b55a4ed0-f8bd-8f54-b239-ea0b09de9d96"
    - stage: trinity
      stageUuid: "34b4fe05-df87-8bfa-9ad0-c701a94f6fe9"
    - stage: boundary
      stageUuid: "eb8686ef-4a7e-88ae-9f53-030e68058f56"
    - stage: links
      stageUuid: "50be83b1-a248-8f5d-849a-158d4f34cac1"
    - stage: horo
      stageUuid: "e3fc3dac-ee23-8cdb-844e-ac0fe2d50e83"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "316caaaa-248a-82c6-a4f2-de228d775c23"
version: 2
---
# period

Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning.

Composes: [[date]] · [[field]] · [[versions]] · [[accounting]] · start.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`

- ISO-8601-1:2019

**Law — [[law]]: a period is a date-range from start to end (or a fiscal-period code) that fixes the time-based [[accounting]] cutoff — which period a value falls in — and drives [[versions]] over that span.**
