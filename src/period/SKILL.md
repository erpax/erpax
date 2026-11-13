---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 1/base · d45254a4"
contentUuid: "b141cf24-af10-5fc5-acb6-9a0a7b98b300"
diamondUuid: "21776049-a63f-861f-a081-1002674e518d"
uuid: "d45254a4-c8cd-869b-9e5c-2137e0246d2b"
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
  computationUuid: "c6d5baa2-0fef-84aa-a52f-66110a79d425"
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
      stageUuid: "5b69d549-920c-8f4f-9352-ea3373261a2a"
    - stage: seal
      stageUuid: "9e6e513b-7d18-86fb-9ea0-bc38f759f276"
    - stage: uuid
      stageUuid: "e51f14ec-52e8-8d7b-bdac-8b11c6275790"
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
