---
name: entries
description: "Use when creating or auditing double-entry accounting records — balanced debit/credit lines, entry/posted/approval dates, period-lock enforcement, posted-immutability, and segregation-of-duties (creator ≠ approver). The core GL write target per IAS-1 and OECD SAF-T §3."
atomPath: "journal/entries"
coordinate: "journal/entries · 5/round · 3203bd4a"
contentUuid: "7e0be64a-3b3c-5892-82a2-025d4087d59e"
diamondUuid: "1d82fa05-b542-87dc-9cca-0f4c9ce57912"
uuid: "3203bd4a-31b9-8a0a-9a30-958be0721497"
horo: 5
typography:
  partition: journal
  bondDegree: 113
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-8601-1:2019 date-time entry-date posted-date approval-date"
  - "ISO-8601-1:2019 date-time entry-date posted-date approval-date`"
  - "OECD SAF-T §3 journal-entries"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "W3C-PROV-O"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "9f420937-06f3-8958-be96-89752e528203"
  stages:
    - stage: path
      stageUuid: "e1568b51-9231-8c31-b451-33e00acace8d"
    - stage: trinity
      stageUuid: "15c88970-ff9c-8eff-b12d-0b958e89b9a1"
    - stage: boundary
      stageUuid: "5d069a73-7fe2-86cb-bfd5-1bd55295a4f6"
    - stage: links
      stageUuid: "d8a582b9-24ef-8760-a424-e9bb0b3974d0"
    - stage: horo
      stageUuid: "69b601f1-28b4-871c-8920-35ce8e19166e"
    - stage: seal
      stageUuid: "a6185d99-fa65-85ac-aaa5-9d065a99b5aa"
    - stage: uuid
      stageUuid: "14989fa0-695f-81c4-9bb3-4094b44cfb2c"
version: 2
---
# journal-entries

Journal Entries — double-entry-bookkeeping write target.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time entry-date posted-date approval-date`

- ISO-8601-1:2019 date-time entry-date posted-date approval-date
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-105 generally-accepted-accounting-principles
- OECD SAF-T §3 journal-entries
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
- ISO-27002 §5.4 segregation-of-duties

Composes: [[journal/entries/rounding/adjustments]] · [[accounting]] · [[standard]] · [[proof]] · [[identity]].

**Law — [[law]]: every entry's debits equal its credits, creator never equals approver, and once posted it is immutable within its locked period.**
