---
name: journals
description: "Use when defining or managing recurring accrual templates (rent, depreciation, amortisation, prepaid/deferred-revenue release) that a scheduled job materialises into journal-entries each period — RFC 5545 RRULE supported, SOX §404 four-eyes on auto-post. The recurring-journals automation register."
atomPath: "gl/accounts/recurring/journals"
coordinate: "gl/accounts/recurring/journals · 1/base · f7fe4571"
contentUuid: "06531ffa-f20e-521a-928f-5d468b719c58"
diamondUuid: "c9992cd5-e38f-833b-8d05-4a84db0b7b14"
uuid: "f7fe4571-b2f0-8301-bcff-20af006e54b9"
horo: 1
typography:
  partition: gl
  bondDegree: 25
standards:
  - "IFRS IAS-1 §27 accrual-basis-of-accounting"
  - "IFRS IAS-1 §29 §30 separate-presentation"
  - "ISO-8601-1:2019 date-time recurrence"
  - "ISO-8601-1:2019 date-time recurrence`"
  - "RFC-5545"
  - "SOX §404 internal-controls automated-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "US-GAAP ASC-720 other-expenses"
  - "rfc-5545 icalendar-rrule recurrence-rule"
  - "rfc-5545 icalendar-rrule recurrence-rule`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b4915f8a-35b4-8cdf-a4cd-53d79354b4c7"
  stages:
    - stage: path
      stageUuid: "994bc4fc-e135-865b-b66d-a47a86410297"
    - stage: trinity
      stageUuid: "92100fb0-c8cc-80ed-9cbc-35a2a5489e3b"
    - stage: boundary
      stageUuid: "45c3266f-a4d2-82cc-9347-629c1a643071"
    - stage: links
      stageUuid: "0c796456-2a98-8e71-aba3-ad42b340a2e2"
    - stage: horo
      stageUuid: "8a46466f-45c2-8600-acec-71fee67fb162"
    - stage: seal
      stageUuid: "e218d9ee-bb29-8993-b06a-9920dffcdb8a"
    - stage: uuid
      stageUuid: "e9382b3b-715c-8fb0-8c8e-c9ab34a6b8e3"
version: 2
---
# recurring-journals

Recurring Journals — automation register for IAS-1 §27 accrual-basis.

Template definitions for materialised [[journal/entries]] that recur on a schedule (rent, depreciation accrual, amortisation, prepaid release, deferred-revenue release, etc.). Pairs with the Workers `period-close` queue to instantiate scheduled entries at each period rollover.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time recurrence`
- `@standard rfc-5545 icalendar-rrule recurrence-rule`

- ISO-8601-1:2019 date-time recurrence
- rfc-5545 icalendar-rrule recurrence-rule
- IFRS IAS-1 §27 accrual-basis-of-accounting
- IFRS IAS-1 §29 §30 separate-presentation
- US-GAAP ASC-105 generally-accepted-accounting-principles
- US-GAAP ASC-720 other-expenses
- ISO-19011:2018 audit-trail recurring-evidence
- SOX §404 internal-controls automated-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[cost/centers]] · [[accounting]].

**Law — [[law]]: a recurring journal is a template, not an entry — a scheduled job materialises it into a balanced journal-entry each period (RRULE-driven), four-eyes-gated on auto-post so automation never escapes [[accounting]] control.**
