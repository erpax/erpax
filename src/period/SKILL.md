---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 2/share · 26f08547"
contentUuid: "25cae88c-33e5-542a-82f2-eff7758370b0"
diamondUuid: "dcd005a7-d260-8b08-bf9d-c0abcaf7fad7"
uuid: "26f08547-7be2-8e17-be53-6604db4ee21d"
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
  computationUuid: "8f67af1b-3bc6-8d4e-98ca-a10aed04eaf8"
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
      stageUuid: "2629608c-5212-87d2-9279-6a1487a8a73f"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "139fbf93-f6a7-8c2d-bddd-f77a579fd2b1"
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
