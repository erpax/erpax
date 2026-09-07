---
name: timestamp
description: "Use when stamping a status-transition timestamp (postedAt, approvedAt, reconciledAt, authorizedAt) onto a configurable field the first time a condition fires — a beforeChange hook factory emitting canonical UTC ISO-8601."
atomPath: "auto/set/timestamp"
coordinate: "auto/set/timestamp · 2/share · bdac2d52"
contentUuid: "e92b956e-5cce-5e57-b3ee-d3a4c5a80f72"
diamondUuid: "cc3fe7bf-4f9f-80b6-80da-4ea95f76172d"
uuid: "bdac2d52-9f8a-88a4-a5da-67a71319a873"
horo: 2
typography:
  partition: auto
  bondDegree: 10
standards:
  - "EU-Intrastat-Reg-2019/2152"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time utc-canonical"
  - "SOX §404 internal-controls verifiable-event-time"
bindings: []
signatures:
  computationUuid: "d54cf331-599a-8a81-bf05-aa34b51682a5"
  stages:
    - stage: path
      stageUuid: "75418288-873f-8a23-9c69-bb50e4dab801"
    - stage: trinity
      stageUuid: "8b3e7cd1-0a48-887e-a976-75e30cb909a4"
    - stage: boundary
      stageUuid: "d3c46dc1-be33-82e1-8445-958a278f2d53"
    - stage: links
      stageUuid: "adc90156-b6da-82c4-b398-1b38337990b4"
    - stage: horo
      stageUuid: "69287da8-f53b-89dc-bb49-64249d90448e"
    - stage: seal
      stageUuid: "c3bf02a3-f31d-8ccf-816b-6b3aa7bcc308"
    - stage: uuid
      stageUuid: "980c72bf-38e4-87bc-8047-f2e854d9b69c"
version: 2
---
# auto/set/timestamp — verifiable event time on transition

A factory that builds a Payload `beforeChange` [[hooks]] from a field name and a condition predicate. The returned hook writes a fresh `new Date().toISOString()` onto that field only when the condition holds AND the field is not already set — so a transition time is recorded exactly once, on first occurrence, and never overwritten on later saves. It always emits canonical UTC ISO-8601, the verifiable event-time leg of the [[audit]] trail.

Matter-twin: `src/auto/set/timestamp/index.ts` — `autoSetTimestamp(timestampField, condition)` returning a `CollectionBeforeChangeHook`. One of the [[auto]]-set control gates ([[hooks]]).

**Law — [[law]]: a status-transition time is set once, server-side, in canonical UTC ISO-8601 — written only when the condition fires and the field is empty, so the event time is verifiable and cannot be silently restamped.**

@standard ISO-8601-1:2019 date-time utc-canonical
