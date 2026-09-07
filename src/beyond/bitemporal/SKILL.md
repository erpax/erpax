---
name: bitemporal
description: "Use when querying a row AS OF two clocks at once — system-time (when the value was recorded) crossed with valid-time (when it was true in the world) — under SQL:2011 temporal tables; isHistoricalQuery gates whether a request looks back in time, asOf is the pending temporal-table read."
atomPath: "beyond/bitemporal"
coordinate: "beyond/bitemporal · 1/base · 9fc55cd0"
contentUuid: "b5fd0666-2c1a-5679-825c-3f034c48b23d"
diamondUuid: "fe9539be-e27f-8fce-a21d-21e980f1eb8f"
uuid: "9fc55cd0-0192-86a1-9a6f-09aca08ad8fc"
horo: 1
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
  computationUuid: "60451632-1f2d-8849-bc2c-f791af61d060"
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
      stageUuid: "248a7abb-799c-8bba-9a72-c9f1969d84e1"
    - stage: seal
      stageUuid: "b24cdc3f-e3e4-8de5-bb27-c1d036965711"
    - stage: uuid
      stageUuid: "fca4defd-f3c9-8c06-91de-ab1fc5c460ca"
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
