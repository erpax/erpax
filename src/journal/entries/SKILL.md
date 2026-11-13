---
name: entries
description: "Use when creating or auditing double-entry accounting records — balanced debit/credit lines, entry/posted/approval dates, period-lock enforcement, posted-immutability, and segregation-of-duties (creator ≠ approver). The core GL write target per IAS-1 and OECD SAF-T §3."
atomPath: "journal/entries"
coordinate: "journal/entries · 1/base · 02e507e7"
contentUuid: "c7b7e2a5-1c10-5f2a-bae6-2739224be182"
diamondUuid: "43e9fd47-3ea1-8874-84ce-c4a6bb4f6200"
uuid: "02e507e7-6373-8c14-93ba-7394fb145985"
horo: 1
typography:
  partition: journal
  bondDegree: 83
standards:
  - "ECMA-262"
  - "IEEE-754"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-8601-1:2019 date-time entry-date posted-date approval-date"
  - "ISO-8601-1:2019 date-time entry-date posted-date approval-date`"
  - "OECD SAF-T §3 journal-entries"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "addd80e9-1197-8326-8ff7-e5f75d2955fb"
  stages:
    - stage: path
      stageUuid: "e1568b51-9231-8c31-b451-33e00acace8d"
    - stage: trinity
      stageUuid: "15c88970-ff9c-8eff-b12d-0b958e89b9a1"
    - stage: boundary
      stageUuid: "cd9b1434-5f23-8f0b-aed7-a1cd29e94e92"
    - stage: links
      stageUuid: "d8a582b9-24ef-8760-a424-e9bb0b3974d0"
    - stage: horo
      stageUuid: "a857a301-07d2-8418-b775-0f8cff7f6a15"
    - stage: seal
      stageUuid: "a6185d99-fa65-85ac-aaa5-9d065a99b5aa"
    - stage: uuid
      stageUuid: "bbc19faa-746a-80fd-b02f-c8e9ac945d50"
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
