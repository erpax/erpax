---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: "iso/8601"
coordinate: "iso/8601 · 7/descent · 8a30af48"
contentUuid: "8698c309-b62d-5bff-97ea-f2d6ba40e004"
diamondUuid: "c1aac65b-3876-8d27-8636-73a561784196"
uuid: "8a30af48-b5f8-8e07-a4a3-56fb0832f06b"
horo: 7
typography:
  partition: iso
  bondDegree: 6
standards:
  - "ECMA-262"
  - "ECMA-402"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e39ade1f-9a05-8e23-bba3-cec618c3d66f"
  stages:
    - stage: path
      stageUuid: "3263fbde-a5c5-8435-a949-818219b105ec"
    - stage: trinity
      stageUuid: "34430768-9380-8b81-bd10-a66e1b771383"
    - stage: boundary
      stageUuid: "d63921b2-a0a2-8d04-9927-9f78dfb39b66"
    - stage: links
      stageUuid: "ba4a131b-3b97-827d-bc0c-c0dc36312eb8"
    - stage: horo
      stageUuid: "1f88d35d-c422-884e-91ab-b8cffe69a110"
    - stage: seal
      stageUuid: "be019c25-a32d-815a-b012-85538434834b"
    - stage: uuid
      stageUuid: "5634843b-3cf8-87dc-bab7-84a2ec5936f0"
version: 2
---
# ISO 8601 — Date and time

**Editions:** ISO 8601-1:2019 (basic + extended), ISO 8601-2:2019 (extensions).
**Publisher:** <https://www.iso.org/iso-8601-date-and-time-format.html>

## What's here

- `validate.ts` — `isIso8601(s)` accepts `YYYY-MM-DD` or full timestamp.
- `coerce.ts` — `toIso8601(value)` coerces date-ish input to canonical UTC.

## Note on JS interplay

`Date.toISOString()` always emits `YYYY-MM-DDTHH:mm:ss.sssZ` — a strict
ISO 8601-1 extended-format calendar date-time in UTC. We use it as the
canonical wire form throughout erpax.

## Out of scope

- ISO 8601-2 extensions (intervals, recurring intervals, partial-precision).
  Add when needed; today we only emit/accept the basic+extended subset.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time`

Composes: [[standards]].
