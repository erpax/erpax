---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: "iso/8601"
coordinate: "iso/8601 · 7/descent · 582d5509"
contentUuid: "3524b894-9905-5197-b3d5-d377cc2bfdab"
diamondUuid: "26d687b1-f932-8f68-964d-12f7b475aeab"
uuid: "582d5509-fdee-819c-940a-0c63e497fd7a"
horo: 7
typography:
  partition: iso
  bondDegree: 8
standards:
  - "ECMA-262"
  - "ECMA-402"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ba255f26-b16e-81ac-a429-c615cfec4113"
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
      stageUuid: "27ddea2d-e0b5-8d63-b6c5-e816fdd8a78a"
    - stage: seal
      stageUuid: "be019c25-a32d-815a-b012-85538434834b"
    - stage: uuid
      stageUuid: "6d6f622c-6b1f-8aa9-ba08-08d4d2a2ca64"
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
