---
name: entries
description: "Use when creating or auditing double-entry accounting records — balanced debit/credit lines, entry/posted/approval dates, period-lock enforcement, posted-immutability, and segregation-of-duties (creator ≠ approver). The core GL write target per IAS-1 and OECD SAF-T §3."
atomPath: "journal/entries"
coordinate: "journal/entries · 1/base · ef8e7fb7"
contentUuid: "f6fd586a-4174-5993-80ad-f37a4922efb1"
diamondUuid: "3d4c53e8-6005-85d1-be02-f002a823e21b"
uuid: "ef8e7fb7-18c0-83e3-999e-470179f5a6a6"
horo: 1
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
  computationUuid: "a4bd8573-067f-828e-b1e4-4cdd0e76e625"
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
      stageUuid: "175902a8-c384-8c7d-be96-a83cdc5452ca"
    - stage: seal
      stageUuid: "a6185d99-fa65-85ac-aaa5-9d065a99b5aa"
    - stage: uuid
      stageUuid: "fb31eb12-501c-8704-b17a-0ec93080df36"
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
