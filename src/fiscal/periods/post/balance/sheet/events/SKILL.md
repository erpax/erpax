---
name: events
description: "Use when capturing events between the reporting date and FS-authorisation date — classifying them as adjusting (IAS 10 §8 — book) or non-adjusting (§10 — disclose); assessing going-concern impact; linking booked journal entries; meeting §21 disclosure requirements. The IAS 10 subsequent-events register."
atomPath: fiscal/periods/post/balance/sheet/events
coordinate: fiscal/periods/post/balance/sheet/events · 8/crest · 910eb855
contentUuid: "26551f55-ba42-50ff-8a3f-602c1575a310"
diamondUuid: "800398ed-0794-8bfe-8a65-1c3a5878b91c"
uuid: "910eb855-e29e-8a72-87fc-00bc00b319e0"
horo: 8
bonds:
  in:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - sheet
    - standard
    - sub
  out:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
typography:
  partition: fiscal
  bondDegree: 54
  neighbors: []
standards:
  - "IFRS IAS-10 §10 non-adjusting-events-disclose"
  - "IFRS IAS-10 §17 going-concern-after-reporting-date"
  - "IFRS IAS-10 §21 disclosure-requirements"
  - "IFRS IAS-10 §3 adjusting-vs-non-adjusting-events"
  - "IFRS IAS-10 §8 adjusting-events-recognise"
  - "ISO 19011:2018 §6.4.6 audit-evidence-subsequent-events"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time event-date authorisation-date"
  - "SOX §404 internal-controls TOM-CL-03"
bindings: []
neighbors:
  wikilink:
    - currency
    - entries
    - law
    - periods
  matrix:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
  backlinks:
    - auditright
    - horo
    - identity
    - incident
    - instances
    - lineage
    - materiality
    - observability
    - party
    - proof
    - standard
    - sub
signatures:
  computationUuid: "0b83e315-afca-8761-b712-b9e6e87c1a45"
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
      stageUuid: "c9271c31-364c-8807-a18e-aaa907601ae0"
    - stage: seal
      stageUuid: "681d3668-84ad-8b00-9cdf-9cb2ebd7e95e"
    - stage: uuid
      stageUuid: "2905d652-b539-8a37-9ce0-237f7718a591"
version: 2
---
# post-balance-sheet-events

Post-Balance-Sheet Events — IAS 10 events after the reporting period.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
