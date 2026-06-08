---
name: calendars
description: "Use when resolving a GL posting date to its fiscal year, period, quarter, week, or regulatory SAF-T code — pre-computed O(1) date-to-period lookup table bulk-generated from FiscalPeriods config per IAS-34 / ISO-8601 / SAF-T 3.0.2. The denormalized fiscal-calendar lookup collection."
atomPath: legal/entities/fiscal/calendars
coordinate: legal/entities/fiscal/calendars · 2/share · 4d2f311b
contentUuid: "f443ed7a-7933-5b0c-b7d0-17757da0deef"
diamondUuid: "8e00e5f3-2237-8286-9774-e179ea82fb0f"
uuid: "4d2f311b-53b4-876e-9d24-5922969e54c1"
horo: 2
bonds:
  in:
    - accounting
    - calendar
    - entities
    - identity
    - law
    - proof
    - standard
  out:
    - accounting
    - calendar
    - entities
    - identity
    - law
    - proof
    - standard
typography:
  partition: legal
  bondDegree: 21
  neighbors: []
standards:
  - "EU-2016/679"
  - "GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)"
  - "IAS-34"
  - "IAS-34:2023 (period metadata: quarter, fiscal year, period label)"
  - "ISO-4217:2023 (currencyCode inherited from FiscalPeriods)"
  - "ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)"
  - "SAF-T"
  - "SAF-T:3.0.2 (regulatoryCode for audit file period coding, e.g., P01_2026)"
  - SOX
  - "SOX:2402 (audit-trail via chainLeafUuid)"
  - XBRL
  - XBRL (period context for financial statement generation)
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - standard
  matrix:
    - accounting
    - calendar
    - entities
    - identity
    - law
    - proof
    - standard
  backlinks:
    - accounting
    - calendar
    - entities
    - identity
    - law
    - proof
    - standard
signatures:
  computationUuid: "83ca2ca0-4cd5-82de-be91-354354095309"
  stages:
    - stage: path
      stageUuid: "194b72e6-3476-805f-acaf-92825fc69768"
    - stage: trinity
      stageUuid: "54f23400-fdc1-8d7d-ad8d-bd20988cb593"
    - stage: boundary
      stageUuid: "61d0705a-1c77-84d2-b604-faa8db74799e"
    - stage: links
      stageUuid: "e30f10c4-368f-84eb-8d94-1ae7e6fed2ce"
    - stage: horo
      stageUuid: "a28ed58f-4151-84f9-9472-3d93d5c42836"
    - stage: seal
      stageUuid: "f25c31be-dd7e-8191-8dbc-24766d6c0875"
    - stage: uuid
      stageUuid: "cd257012-1edc-86d3-908c-55d53366f638"
version: 2
---
# fiscal-calendars

FiscalCalendars Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IAS-34:2023 (period metadata: quarter, fiscal year, period label)
- ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)
- ISO-4217:2023 (currencyCode inherited from FiscalPeriods)
- SAF-T:3.0.2 (regulatoryCode for audit file period coding, e.g., P01_2026)
- XBRL (period context for financial statement generation)
- GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)
- SOX:2402 (audit-trail via chainLeafUuid)

Composes: [[accounting]] · [[standard]] · [[proof]] · [[identity]].

**Law — [[law]]: every posting date resolves to exactly one fiscal year/period/quarter/week — a denormalized O(1) lookup generated from FiscalPeriods config, immutable after generation and lineage-traced, so date-to-period is computed not re-declared ([[proof]] via chain leaf).**
