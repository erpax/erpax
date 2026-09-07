---
name: timestamp
description: "Use when stamping a status-transition timestamp (postedAt, approvedAt, reconciledAt, authorizedAt) onto a configurable field the first time a condition fires — a beforeChange hook factory emitting canonical UTC ISO-8601."
atomPath: "auto/set/timestamp"
coordinate: "auto/set/timestamp · 5/round · a5a6e8f5"
contentUuid: "e6b789b6-64d0-5cb2-ae39-ac9ecf52cc0f"
diamondUuid: "fdf38385-6b02-8cb3-9abb-0adcd8791038"
uuid: "a5a6e8f5-7390-8012-bb55-15a70aafe8ff"
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
  computationUuid: "1248dc25-0149-84da-9806-6cae685ef664"
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
      stageUuid: "3017db73-1a7a-8acd-8e08-34b87c0bab32"
    - stage: seal
      stageUuid: "c3bf02a3-f31d-8ccf-816b-6b3aa7bcc308"
    - stage: uuid
      stageUuid: "c9f854f4-458e-8623-8dc1-523959e113ef"
version: 2
---
# auto/set/timestamp — verifiable event time on transition

A factory that builds a Payload `beforeChange` [[hooks]] from a field name and a condition predicate. The returned hook writes a fresh `new Date().toISOString()` onto that field only when the condition holds AND the field is not already set — so a transition time is recorded exactly once, on first occurrence, and never overwritten on later saves. It always emits canonical UTC ISO-8601, the verifiable event-time leg of the [[audit]] trail.

Matter-twin: `src/auto/set/timestamp/index.ts` — `autoSetTimestamp(timestampField, condition)` returning a `CollectionBeforeChangeHook`. One of the [[auto]]-set control gates ([[hooks]]).

**Law — [[law]]: a status-transition time is set once, server-side, in canonical UTC ISO-8601 — written only when the condition fires and the field is empty, so the event time is verifiable and cannot be silently restamped.**

@standard ISO-8601-1:2019 date-time utc-canonical
