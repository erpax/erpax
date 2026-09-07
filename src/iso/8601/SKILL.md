---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: "iso/8601"
coordinate: "iso/8601 · 4/weave · 22f5cc3a"
contentUuid: "f204440b-9ec0-52e7-9d47-35014956ce5f"
diamondUuid: "658df926-e3c0-81f7-bdaa-11801cab464c"
uuid: "22f5cc3a-1291-8c17-84ab-6a18004a15bf"
horo: 4
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
  computationUuid: "e3a9e78d-0a00-82ed-960b-0abc512db61b"
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
      stageUuid: "86092b28-bfd5-8b75-8552-958fa8019a02"
    - stage: seal
      stageUuid: "be019c25-a32d-815a-b012-85538434834b"
    - stage: uuid
      stageUuid: "42a8e2eb-32e3-84eb-b950-e93403be7ce1"
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
