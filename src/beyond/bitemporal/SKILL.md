---
name: bitemporal
description: "Use when querying a row AS OF two clocks at once — system-time (when the value was recorded) crossed with valid-time (when it was true in the world) — under SQL:2011 temporal tables; isHistoricalQuery gates whether a request looks back in time, asOf is the pending temporal-table read."
atomPath: beyond/bitemporal
coordinate: beyond/bitemporal · 2/share · f755eae4
contentUuid: "a9a5a96d-498b-5f7e-b68c-adf459fa89c2"
diamondUuid: "7156e8c3-97a5-8348-94f6-26601e73ae64"
uuid: "f755eae4-8152-8426-8f81-39270a7ddbe4"
horo: 2
bonds:
  in:
    - beyond
    - law
    - standard
    - trinity
  out:
    - beyond
    - law
    - standard
    - trinity
typography:
  partition: beyond
  bondDegree: 12
  neighbors: []
standards:
  - "EU-2011/83"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO/IEC 9075-2:2016 §4.15.10 temporal-tables"
  - "SQL:2011 system-versioned + application-time tables"
bindings: []
neighbors:
  wikilink:
    - beyond
    - law
    - standard
    - trinity
  matrix:
    - beyond
    - law
    - standard
    - trinity
  backlinks:
    - beyond
    - law
    - standard
    - trinity
signatures:
  computationUuid: "1093e109-a5b9-878f-a37f-dce9799468a6"
  stages:
    - stage: path
      stageUuid: "68aab473-1f63-8b01-99d8-e34fdc65196b"
    - stage: trinity
      stageUuid: "8bba095b-3f70-8f6a-a9ed-a6269c57b406"
    - stage: boundary
      stageUuid: "02b24e32-bc65-8e91-ab44-8d80a801dd31"
    - stage: links
      stageUuid: "b52544a7-365f-8161-9fdb-eb761918ba6d"
    - stage: horo
      stageUuid: "657aa9e5-291c-8735-9ad8-6b8fb87ac0b1"
    - stage: seal
      stageUuid: "89bcc5aa-acde-83dd-8e8e-7abd68a58923"
    - stage: uuid
      stageUuid: "abe2040e-9eaf-8223-ab4d-e80032de7bd0"
version: 2
---
# beyond/bitemporal — bitemporal queries (system-time × valid-time)

Law 14 of the [[beyond]] horizon: every value has two clocks — when the system *recorded* it and when it was *true in the world*. A bitemporal read fixes both coordinates at once. `isHistoricalQuery` is the pure gate (the request's `recordedAt` is in the past ⇒ a valid look-back); `asOf` is the temporal-table read, a deliberate STUB until a temporal-table extension lands, refusing with `{ ok: false, reason }` rather than guessing.

Matter-twin: src/beyond/bitemporal/index.ts (`asOf` · `isHistoricalQuery`) — coordinates typed in src/beyond/types.

**Law — [[law]]: a value carries two clocks ([[standard]] SQL:2011 system-time × valid-time); a query that does not fix both is incomplete, and the temporal read refuses rather than fabricates — the [[trinity]] proof holds the refusal contract.**
