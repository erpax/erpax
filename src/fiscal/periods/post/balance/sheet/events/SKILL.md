---
name: events
description: "Use when capturing events between the reporting date and FS-authorisation date — classifying them as adjusting (IAS 10 §8 — book) or non-adjusting (§10 — disclose); assessing going-concern impact; linking booked journal entries; meeting §21 disclosure requirements. The IAS 10 subsequent-events register."
atomPath: "fiscal/periods/post/balance/sheet/events"
coordinate: "fiscal/periods/post/balance/sheet/events · 5/round · e6810dd2"
contentUuid: "33c1e670-ebb9-56b1-bca9-e083a11d22ed"
diamondUuid: "cc875407-8802-8f67-807c-8ae1f42d91ac"
uuid: "e6810dd2-bb4c-8893-9815-e7bd0446a08a"
horo: 5
typography:
  partition: fiscal
  bondDegree: 54
standards:
  - "IAS-10"
  - "IFRS IAS-10 §10 non-adjusting-events-disclose"
  - "IFRS IAS-10 §10 non-adjusting-events-disclose`"
  - "IFRS IAS-10 §17 going-concern-after-reporting-date"
  - "IFRS IAS-10 §17 going-concern-after-reporting-date`"
  - "IFRS IAS-10 §21 disclosure-requirements"
  - "IFRS IAS-10 §21 disclosure-requirements`"
  - "IFRS IAS-10 §3 adjusting-vs-non-adjusting-events"
  - "IFRS IAS-10 §3 adjusting-vs-non-adjusting-events`"
  - "IFRS IAS-10 §8 adjusting-events-recognise"
  - "IFRS IAS-10 §8 adjusting-events-recognise`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time event-date authorisation-date"
  - "ISO-8601-1:2019 date-time event-date authorisation-date`"
  - "SOX §404 internal-controls TOM-CL-03"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "cf16e6df-f354-84eb-b5db-40836f8e572f"
  stages:
    - stage: path
      stageUuid: "964d4449-27a0-8d89-b610-89182a6308d7"
    - stage: trinity
      stageUuid: "e5945adf-51bc-88d8-98d4-c604439668b0"
    - stage: boundary
      stageUuid: "aa01a8c2-a2b9-82dc-b69e-0b54ac883d6e"
    - stage: links
      stageUuid: "65a749e6-e55d-83a8-a836-ade198ea369c"
    - stage: horo
      stageUuid: "08887e8a-edf6-8454-97dc-bde8af75bf2b"
    - stage: seal
      stageUuid: "681d3668-84ad-8b00-9cdf-9cb2ebd7e95e"
    - stage: uuid
      stageUuid: "d6658de8-2df0-8f03-ba9d-eec8ab50b3c1"
version: 2
---
# post-balance-sheet-events

Post-Balance-Sheet Events — IAS 10 events after the reporting period.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IAS-10 §3 adjusting-vs-non-adjusting-events`
- `@standard IFRS IAS-10 §8 adjusting-events-recognise`
- `@standard IFRS IAS-10 §10 non-adjusting-events-disclose`
- `@standard IFRS IAS-10 §17 going-concern-after-reporting-date`
- `@standard IFRS IAS-10 §21 disclosure-requirements`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time event-date authorisation-date`

- IFRS IAS-10 §3 adjusting-vs-non-adjusting-events
- IFRS IAS-10 §8 adjusting-events-recognise
- IFRS IAS-10 §10 non-adjusting-events-disclose
- IFRS IAS-10 §17 going-concern-after-reporting-date
- IFRS IAS-10 §21 disclosure-requirements
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time event-date authorisation-date
- ISO 19011:2018 §6.4.6 audit-evidence-subsequent-events
- SOX §404 internal-controls TOM-CL-03
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fiscal/periods]] · [[journal/entries]] · [[currency]].

**Law — [[law]]: an event after the reporting date is either adjusting (IAS 10 §8 — book it) or non-adjusting (§10 — disclose only); the classification, fixed by whether it evidences a condition existing at the reporting date, decides whether a journal entry is posted.**
