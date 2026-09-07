---
name: period
description: "Use when a value is tied to a fiscal/calendar period — revenue recognized in period, expense recorded in month, cutoff rules. A date-range [start, end] or a fiscal-period code. Twins with date (point) to establish time-based accounting cutoffs and versioning."
atomPath: period
coordinate: "period · 2/share · b654668f"
contentUuid: "3442b17b-7510-56b6-aed7-7cffa2060f5f"
diamondUuid: "6f5a8c42-a19c-866a-8dea-eff52fc1a2fe"
uuid: "b654668f-0205-8d1a-a724-e2e5c575815d"
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
  computationUuid: "002b4fda-60b7-809b-9d79-e117376a801d"
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
      stageUuid: "7dfb9676-86e1-8b06-8081-06695c8b10c3"
    - stage: seal
      stageUuid: "a0b2da05-da31-8437-a71a-5519275a744f"
    - stage: uuid
      stageUuid: "c08ace1e-c044-84ff-a3ad-693c3409880a"
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
