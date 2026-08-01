---
name: bitemporal
description: "Use when querying a row AS OF two clocks at once — system-time (when the value was recorded) crossed with valid-time (when it was true in the world) — under SQL:2011 temporal tables; isHistoricalQuery gates whether a request looks back in time, asOf is the pending temporal-table read."
atomPath: "beyond/bitemporal"
coordinate: "beyond/bitemporal · 5/round · d2027c5b"
contentUuid: "72c3c09a-5628-5e24-b4fa-a2f8322af667"
diamondUuid: "bcae7e4a-8e36-8a66-a7a8-ce5f5ceeae6b"
uuid: "d2027c5b-13a6-87df-8df6-acfe7646bd47"
horo: 5
typography:
  partition: beyond
  bondDegree: 4
standards:
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO/IEC 9075-2:2016 §4.15.10 temporal-tables"
  - "ISO/IEC 9075-2:2016 §4.15.10 temporal-tables`"
  - "SQL:2011 system-versioned + application-time tables"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "30c09399-f7cd-8c21-a89c-40408b285472"
  stages:
    - stage: path
      stageUuid: "68aab473-1f63-8b01-99d8-e34fdc65196b"
    - stage: trinity
      stageUuid: "8bba095b-3f70-8f6a-a9ed-a6269c57b406"
    - stage: boundary
      stageUuid: "02b24e32-bc65-8e91-ab44-8d80a801dd31"
    - stage: links
      stageUuid: "9ee4bc4b-df41-8c17-8d9e-adea88ba2d6c"
    - stage: horo
      stageUuid: "5ac90096-e8e6-85a5-8248-7426ee384349"
    - stage: seal
      stageUuid: "89bcc5aa-acde-83dd-8e8e-7abd68a58923"
    - stage: uuid
      stageUuid: "f3665892-5b4e-8609-a6d0-c9a5443cc1a9"
version: 2
---
# beyond/bitemporal — bitemporal queries (system-time × valid-time)

Law 14 of the [[beyond]] horizon: every value has two clocks — when the system *recorded* it and when it was *true in the world*. A bitemporal read fixes both coordinates at once. `isHistoricalQuery` is the pure gate (the request's `recordedAt` is in the past ⇒ a valid look-back); `asOf` is the temporal-table read, a deliberate STUB until a temporal-table extension lands, refusing with `{ ok: false, reason }` rather than guessing.

Matter-twin: src/beyond/bitemporal/index.ts (`asOf` · `isHistoricalQuery`) — coordinates typed in src/beyond/types.

**Law — [[law]]: a value carries two clocks ([[standard]] SQL:2011 system-time × valid-time); a query that does not fix both is incomplete, and the temporal read refuses rather than fabricates — the [[trinity]] proof holds the refusal contract.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO/IEC 9075-2:2016 §4.15.10 temporal-tables`
