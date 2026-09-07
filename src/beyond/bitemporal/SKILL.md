---
name: bitemporal
description: "Use when querying a row AS OF two clocks at once — system-time (when the value was recorded) crossed with valid-time (when it was true in the world) — under SQL:2011 temporal tables; isHistoricalQuery gates whether a request looks back in time, asOf is the pending temporal-table read."
atomPath: "beyond/bitemporal"
coordinate: "beyond/bitemporal · 5/round · e814d2bf"
contentUuid: "ab5afeef-a685-5bed-b499-de5d357b8bad"
diamondUuid: "561395b8-4f87-8ad1-928c-214a38721334"
uuid: "e814d2bf-2f9e-85e8-8b56-3ca5ebff7109"
horo: 5
typography:
  partition: beyond
  bondDegree: 9
standards:
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO/IEC 9075-2:2016 §4.15.10 temporal-tables"
  - "ISO/IEC 9075-2:2016 §4.15.10 temporal-tables`"
  - "SQL:2011 system-versioned + application-time tables"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "d871676c-cc69-8383-ad17-687212ccf00e"
  stages:
    - stage: path
      stageUuid: "68aab473-1f63-8b01-99d8-e34fdc65196b"
    - stage: trinity
      stageUuid: "8bba095b-3f70-8f6a-a9ed-a6269c57b406"
    - stage: boundary
      stageUuid: "02b24e32-bc65-8e91-ab44-8d80a801dd31"
    - stage: links
      stageUuid: "0c1e0d8d-0c7d-8ad3-af77-ac2b8b1acb54"
    - stage: horo
      stageUuid: "1526a056-d92f-8aed-99e1-2b10334e17c8"
    - stage: seal
      stageUuid: "b24cdc3f-e3e4-8de5-bb27-c1d036965711"
    - stage: uuid
      stageUuid: "18f53a36-018e-88c6-a4f4-4069ac2753e4"
version: 2
---
# beyond/bitemporal — bitemporal queries (system-time × valid-time)

Law 14 of the [[beyond]] horizon: every value has two clocks — when the system *recorded* it and when it was *true in the world*. A bitemporal read fixes both coordinates at once. `isHistoricalQuery` is the pure gate (the request's `recordedAt` is in the past ⇒ a valid look-back); `asOf` is the temporal-table read, a deliberate STUB until a temporal-table extension lands, refusing with `{ ok: false, reason }` rather than guessing.

Matter-twin: src/beyond/bitemporal/index.ts (`asOf` · `isHistoricalQuery`) — coordinates typed in src/beyond/types.

**Law — [[law]]: a value carries two clocks ([[standard]] SQL:2011 system-time × valid-time); a query that does not fix both is incomplete, and the temporal read refuses rather than fabricates — the [[trinity]] proof holds the refusal contract.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 9075-2:2016 §4.15.10 temporal-tables`

Composes: [[beyond]] · [[quantum]].
