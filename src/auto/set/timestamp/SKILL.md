---
name: timestamp
description: "Use when stamping a status-transition timestamp (postedAt, approvedAt, reconciledAt, authorizedAt) onto a configurable field the first time a condition fires — a beforeChange hook factory emitting canonical UTC ISO-8601."
atomPath: "auto/set/timestamp"
coordinate: "auto/set/timestamp · 5/round · cb627fd2"
contentUuid: "975a245d-5807-56e4-8fc5-737e56c88f13"
diamondUuid: "31ef5edf-4092-8f12-a127-095ec7ed3ea8"
uuid: "cb627fd2-8f8c-8e0f-af37-c27d622dc962"
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
  computationUuid: "ae77d2fa-6fb0-8231-b738-47c9264dd8af"
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
      stageUuid: "3afcba86-cae3-896a-90f2-3f3511e49ec1"
    - stage: seal
      stageUuid: "c3bf02a3-f31d-8ccf-816b-6b3aa7bcc308"
    - stage: uuid
      stageUuid: "8c05d5c6-364b-8580-ba79-ef808c2bc1b1"
version: 2
---
# auto/set/timestamp — verifiable event time on transition

A factory that builds a Payload `beforeChange` [[hooks]] from a field name and a condition predicate. The returned hook writes a fresh `new Date().toISOString()` onto that field only when the condition holds AND the field is not already set — so a transition time is recorded exactly once, on first occurrence, and never overwritten on later saves. It always emits canonical UTC ISO-8601, the verifiable event-time leg of the [[audit]] trail.

Matter-twin: `src/auto/set/timestamp/index.ts` — `autoSetTimestamp(timestampField, condition)` returning a `CollectionBeforeChangeHook`. One of the [[auto]]-set control gates ([[hooks]]).

**Law — [[law]]: a status-transition time is set once, server-side, in canonical UTC ISO-8601 — written only when the condition fires and the field is empty, so the event time is verifiable and cannot be silently restamped.**

@standard ISO-8601-1:2019 date-time utc-canonical
