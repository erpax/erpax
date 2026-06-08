---
name: journals
description: "Use when defining or managing recurring accrual templates (rent, depreciation, amortisation, prepaid/deferred-revenue release) that a scheduled job materialises into journal-entries each period — RFC 5545 RRULE supported, SOX §404 four-eyes on auto-post. The recurring-journals automation register."
atomPath: gl/accounts/recurring/journals
coordinate: gl/accounts/recurring/journals · 4/weave · 66912f9a
contentUuid: "65ecfbbd-fd10-5471-b7ab-2aeb92e93642"
diamondUuid: "0654cbb3-5d70-83d6-921c-b9e784df3ee6"
uuid: "66912f9a-a3e0-8f7c-af61-ccdbf66163d3"
horo: 4
bonds:
  in:
    - accounting
    - accrual
    - centers
    - deferral
    - entries
    - journal
    - law
    - prepaid
  out:
    - accounting
    - accrual
    - centers
    - deferral
    - entries
    - journal
    - law
    - prepaid
typography:
  partition: gl
  bondDegree: 25
  neighbors: []
standards:
  - "IFRS IAS-1 §27 accrual-basis-of-accounting"
  - "IFRS IAS-1 §29 §30 separate-presentation"
  - "ISO-19011:2018 audit-trail recurring-evidence"
  - "ISO-8601-1:2019 date-time recurrence"
  - "RFC-5545"
  - "SOX §404 internal-controls automated-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "US-GAAP ASC-720 other-expenses"
  - "rfc-5545 icalendar-rrule recurrence-rule"
bindings: []
neighbors:
  wikilink:
    - accounting
    - centers
    - entries
    - law
  matrix:
    - accounting
    - accrual
    - centers
    - deferral
    - entries
    - journal
    - law
    - prepaid
  backlinks:
    - accounting
    - accrual
    - centers
    - deferral
    - entries
    - journal
    - law
    - prepaid
signatures:
  computationUuid: "ec12a6f4-2024-8664-948b-8d1802b8242b"
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
      stageUuid: "72964b35-9a01-8ddb-bc51-41360a4e82cc"
    - stage: seal
      stageUuid: "e218d9ee-bb29-8993-b06a-9920dffcdb8a"
    - stage: uuid
      stageUuid: "4e61b2d4-0c0e-8479-a36d-ea225760140f"
version: 2
---
# recurring-journals

Recurring Journals — automation register for IAS-1 §27 accrual-basis.

Template definitions for materialised [[journal/entries]] that recur on a schedule (rent, depreciation accrual, amortisation, prepaid release, deferred-revenue release, etc.). Pairs with the Workers `period-close` queue to instantiate scheduled entries at each period rollover.

## Standards
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
