---
name: journals
description: "Use when defining or managing recurring accrual templates (rent, depreciation, amortisation, prepaid/deferred-revenue release) that a scheduled job materialises into journal-entries each period — RFC 5545 RRULE supported, SOX §404 four-eyes on auto-post. The recurring-journals automation register."
atomPath: "gl/accounts/recurring/journals"
coordinate: "gl/accounts/recurring/journals · 5/round · 2c2ca22f"
contentUuid: "86425cb3-0ec0-516c-9447-987b4a1efd98"
diamondUuid: "af595819-5956-84e1-ab9d-8d1d4b5aefd3"
uuid: "2c2ca22f-9921-87da-888e-61885f2960e8"
horo: 5
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
  computationUuid: "767d0411-b5f2-8249-a019-5ff7e50cf7a7"
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
      stageUuid: "9a928426-ad2a-85ff-9c09-0aa098a05fac"
    - stage: seal
      stageUuid: "e218d9ee-bb29-8993-b06a-9920dffcdb8a"
    - stage: uuid
      stageUuid: "a6ade9b9-9c74-846d-8775-4672c67cc576"
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
