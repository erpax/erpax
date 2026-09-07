---
name: journals
description: "Use when defining or managing recurring accrual templates (rent, depreciation, amortisation, prepaid/deferred-revenue release) that a scheduled job materialises into journal-entries each period — RFC 5545 RRULE supported, SOX §404 four-eyes on auto-post. The recurring-journals automation register."
atomPath: "gl/accounts/recurring/journals"
coordinate: "gl/accounts/recurring/journals · 4/weave · d71d8d07"
contentUuid: "761fb4b1-ec15-5247-85ff-68689ec4caa2"
diamondUuid: "64945d35-dd94-8c14-9ecf-d48c7005bfa2"
uuid: "d71d8d07-fa4a-804b-bda8-36409d2963c9"
horo: 4
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
  computationUuid: "c93a3f24-2a26-8d5a-b962-007db5e0f416"
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
      stageUuid: "ff868033-361d-8325-ab93-b91a0cee5b7a"
    - stage: seal
      stageUuid: "e218d9ee-bb29-8993-b06a-9920dffcdb8a"
    - stage: uuid
      stageUuid: "2bf058aa-bb5f-8296-8fa0-ac03d57d8cfd"
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
