---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 1/base · d45254a4"
contentUuid: "5d91171d-10f2-5923-8ada-0cad90728c90"
diamondUuid: "601e6ef3-9593-82a7-ab50-ff9a25fe5418"
uuid: "d45254a4-c8cd-869b-9e5c-2137e0246d2b"
horo: 1
typography:
  partition: period
  bondDegree: 25
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
  computationUuid: "2f9fae86-8b9a-8154-abfb-ce4de41c614a"
  stages:
    - stage: path
      stageUuid: "b55a4ed0-f8bd-8f54-b239-ea0b09de9d96"
    - stage: trinity
      stageUuid: "34b4fe05-df87-8bfa-9ad0-c701a94f6fe9"
    - stage: boundary
      stageUuid: "e261e453-2598-8431-a3ca-c5c08cf93a92"
    - stage: links
      stageUuid: "a3d08b01-b429-8354-a9c8-b1a58f468ec1"
    - stage: horo
      stageUuid: "fedd2470-0f48-8bfd-9f8f-95cf69a29628"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "0f94bcdc-e88d-86f9-b0a7-d51d68fe8e1c"
version: 2
---
# period

Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning.

Composes: date · [[field]] · [[versions]] · [[accounting]] · start.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-8601-1`

- ISO-8601-1:2019

**Law — [[law]]: a period is a date-range from start to end (or a fiscal-period code) that fixes the time-based [[accounting]] cutoff — which period a value falls in — and drives [[versions]] over that span.**
