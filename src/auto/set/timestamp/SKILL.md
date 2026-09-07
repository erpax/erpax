---
name: timestamp
description: "Use when stamping a status-transition timestamp (postedAt, approvedAt, reconciledAt, authorizedAt) onto a configurable field the first time a condition fires — a beforeChange hook factory emitting canonical UTC ISO-8601."
atomPath: "auto/set/timestamp"
coordinate: "auto/set/timestamp · 5/round · b52526ff"
contentUuid: "a9e962ad-80f3-5fca-a1cd-842db3e83de5"
diamondUuid: "c74e1911-1a3b-844e-9f9b-cf1a297652e6"
uuid: "b52526ff-cc3c-8d46-9b23-674c535d1a26"
horo: 5
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
  computationUuid: "3dced565-a6e1-8f5c-a871-a7ed8000b7d9"
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
      stageUuid: "7dedeb23-9e98-8a9f-a1ef-6d65f1f7d0fb"
    - stage: seal
      stageUuid: "c3bf02a3-f31d-8ccf-816b-6b3aa7bcc308"
    - stage: uuid
      stageUuid: "01a51685-6f2d-8f4c-9cc1-3c94d14b21ec"
version: 2
---
# auto/set/timestamp — verifiable event time on transition

A factory that builds a Payload `beforeChange` [[hooks]] from a field name and a condition predicate. The returned hook writes a fresh `new Date().toISOString()` onto that field only when the condition holds AND the field is not already set — so a transition time is recorded exactly once, on first occurrence, and never overwritten on later saves. It always emits canonical UTC ISO-8601, the verifiable event-time leg of the [[audit]] trail.

Matter-twin: `src/auto/set/timestamp/index.ts` — `autoSetTimestamp(timestampField, condition)` returning a `CollectionBeforeChangeHook`. One of the [[auto]]-set control gates ([[hooks]]).

**Law — [[law]]: a status-transition time is set once, server-side, in canonical UTC ISO-8601 — written only when the condition fires and the field is empty, so the event time is verifiable and cannot be silently restamped.**

@standard ISO-8601-1:2019 date-time utc-canonical
