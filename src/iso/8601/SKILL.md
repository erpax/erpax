---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: "iso/8601"
coordinate: "iso/8601 · 8/crest · 2125e5d1"
contentUuid: "be45c8eb-b45a-52f3-b7b6-f51d39796bcf"
diamondUuid: "4ba09c1a-43d3-8caa-b0b6-2ca69039b458"
uuid: "2125e5d1-12eb-8dac-8755-1baea6357f82"
horo: 8
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
  computationUuid: "5921d3d9-878f-842c-b8ca-259a67c2773b"
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
      stageUuid: "1dcb369d-6337-8c20-8fe1-c8673527af11"
    - stage: seal
      stageUuid: "be019c25-a32d-815a-b012-85538434834b"
    - stage: uuid
      stageUuid: "6d50f0aa-c1cf-8ff5-8919-87c1086923e9"
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
