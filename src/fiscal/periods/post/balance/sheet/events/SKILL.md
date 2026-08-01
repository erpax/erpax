---
name: events
description: "Use when capturing events between the reporting date and FS-authorisation date — classifying them as adjusting (IAS 10 §8 — book) or non-adjusting (§10 — disclose); assessing going-concern impact; linking booked journal entries; meeting §21 disclosure requirements. The IAS 10 subsequent-events register."
atomPath: "fiscal/periods/post/balance/sheet/events"
coordinate: "fiscal/periods/post/balance/sheet/events · 7/descent · e70222f4"
contentUuid: "35b22e25-b960-5d8b-821c-47a522ae948a"
diamondUuid: "5cb6a086-433a-8d3f-93f0-2a65163e8f76"
uuid: "e70222f4-9e4d-8bac-b5c6-b94462af5731"
horo: 7
typography:
  partition: fiscal
  bondDegree: 54
standards:
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
  computationUuid: "99493877-6b34-8b3d-9ca3-ae99c922f5ef"
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
      stageUuid: "c995cfa4-6a5f-8fb1-bbbb-209537e61389"
    - stage: seal
      stageUuid: "681d3668-84ad-8b00-9cdf-9cb2ebd7e95e"
    - stage: uuid
      stageUuid: "b962bcff-144e-8fdf-ad44-cbe652b9e0eb"
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
