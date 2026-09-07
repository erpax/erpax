---
name: calendars
description: "Use when resolving a GL posting date to its fiscal year, period, quarter, week, or regulatory SAF-T code — pre-computed O(1) date-to-period lookup table bulk-generated from FiscalPeriods config per IAS-34 / ISO-8601 / SAF-T 3.0.2. The denormalized fiscal-calendar lookup collection."
atomPath: "legal/entities/fiscal/calendars"
coordinate: "legal/entities/fiscal/calendars · 2/share · c0db7e96"
contentUuid: "23ec87d3-c860-599e-acf0-869d2579b3ef"
diamondUuid: "f8e41ddb-381a-82d5-b927-c017e9194675"
uuid: "c0db7e96-9880-8921-a7ff-5cc968ba16ed"
horo: 2
typography:
  partition: legal
  bondDegree: 21
standards:
  - "EU-2016/679"
  - "GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)"
  - "GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)`"
  - "IAS-34"
  - "IAS-34:2023 (period metadata: quarter, fiscal year, period label)"
  - "ISO-4217:2023 (currencyCode inherited from FiscalPeriods)"
  - "ISO-4217:2023 (currencyCode inherited from FiscalPeriods)`"
  - "ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)"
  - "ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)`"
  - "SAF-T"
  - "SAF-T:3.0.2 (regulatoryCode for audit file period coding, e.g., P01_2026)"
  - SOX
  - "SOX:2402 (audit-trail via chainLeafUuid)"
  - "SOX:2402 (audit-trail via chainLeafUuid)`"
  - XBRL
  - XBRL (period context for financial statement generation)
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "62452136-155f-8229-a36a-5e55b5fc8c86"
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
      stageUuid: "923c0281-b1ad-88d2-9c60-7e94e50878b8"
    - stage: seal
      stageUuid: "f25c31be-dd7e-8191-8dbc-24766d6c0875"
    - stage: uuid
      stageUuid: "e39b33c9-2054-8b17-afb5-13b47554edb7"
version: 2
---
# fiscal-calendars

FiscalCalendars Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)`
- `@standard ISO-4217:2023 (currencyCode inherited from FiscalPeriods)`
- `@standard GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)`
- `@standard SOX:2402 (audit-trail via chainLeafUuid)`

- IAS-34:2023 (period metadata: quarter, fiscal year, period label)
- ISO-8601:2019 (calendarDate in RFC 3339, weekNumber per ISO 8601:2019)
- ISO-4217:2023 (currencyCode inherited from FiscalPeriods)
- SAF-T:3.0.2 (regulatoryCode for audit file period coding, e.g., P01_2026)
- XBRL (period context for financial statement generation)
- GDPR:2016/679 (immutable after generation; generatedFrom traces lineage)
- SOX:2402 (audit-trail via chainLeafUuid)

Composes: [[accounting]] · [[standard]] · [[proof]] · [[identity]].

**Law — [[law]]: every posting date resolves to exactly one fiscal year/period/quarter/week — a denormalized O(1) lookup generated from FiscalPeriods config, immutable after generation and lineage-traced, so date-to-period is computed not re-declared ([[proof]] via chain leaf).**
