---
name: timestamp
description: "Use when stamping a status-transition timestamp (postedAt, approvedAt, reconciledAt, authorizedAt) onto a configurable field the first time a condition fires — a beforeChange hook factory emitting canonical UTC ISO-8601."
atomPath: auto/set/timestamp
coordinate: auto/set/timestamp · 8/crest · 92696280
contentUuid: "69c33cef-248c-50e0-8145-961647e3d323"
diamondUuid: "37191225-f34d-8efe-9d68-a78b76af9b41"
uuid: "92696280-6538-8c23-9c29-c74d433417fd"
horo: 8
bonds:
  in:
    - law
    - set
    - thing
  out:
    - law
    - thing
typography:
  partition: auto
  bondDegree: 10
  neighbors: []
standards:
  - "EU-2019/1150"
  - "EU-2019/1152"
  - "EU-2019/1937"
  - "EU-2019/2161"
  - "EU-2019/770"
  - "EU-2019/771"
  - "EU-Intrastat-Reg-2019/2152"
  - "ISO-19011:2018 audit-trail status-transition-timestamp"
  - "ISO-8601-1"
  - "ISO-8601-1:2019 date-time utc-canonical"
  - "SOX §404 internal-controls verifiable-event-time"
bindings: []
neighbors:
  wikilink:
    - audit
    - auto
    - hooks
    - law
  matrix:
    - law
    - thing
  backlinks:
    - law
    - thing
signatures:
  computationUuid: "471e069d-cf94-878f-a80d-f70d5d825614"
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
      stageUuid: "7d376c6b-5db9-87d0-87cc-0697fe5c5a18"
    - stage: seal
      stageUuid: "c3bf02a3-f31d-8ccf-816b-6b3aa7bcc308"
    - stage: uuid
      stageUuid: "56e13208-7d5e-80fe-a406-7cf4d7653fd1"
version: 2
---
# auto/set/timestamp — verifiable event time on transition

A factory that builds a Payload `beforeChange` [[hooks]] from a field name and a condition predicate. The returned hook writes a fresh `new Date().toISOString()` onto that field only when the condition holds AND the field is not already set — so a transition time is recorded exactly once, on first occurrence, and never overwritten on later saves. It always emits canonical UTC ISO-8601, the verifiable event-time leg of the [[audit]] trail.

Matter-twin: `src/auto/set/timestamp/index.ts` — `autoSetTimestamp(timestampField, condition)` returning a `CollectionBeforeChangeHook`. One of the [[auto]]-set control gates ([[hooks]]).

**Law — [[law]]: a status-transition time is set once, server-side, in canonical UTC ISO-8601 — written only when the condition fires and the field is empty, so the event time is verifiable and cannot be silently restamped.**

@standard ISO-8601-1:2019 date-time utc-canonical
