---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: "iso/8601"
coordinate: "iso/8601 · 8/crest · b9ac7bc6"
contentUuid: "ccd31bcf-314c-5590-90a9-37e472bf97b6"
diamondUuid: "32585b82-1e16-8dd4-a0f3-c99c536abe48"
uuid: "b9ac7bc6-7f8c-886f-87d4-f7ede3b141f7"
horo: 8
bonds:
  in:
    - iso
  out: []
typography:
  partition: iso
  bondDegree: 0
  neighbors: []
standards:
  - "ECMA-262"
  - "ECMA-402"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "aa2bbb85-8d47-85d3-bf1d-5a09b8e64cca"
  stages:
    - stage: path
      stageUuid: "3263fbde-a5c5-8435-a949-818219b105ec"
    - stage: trinity
      stageUuid: "34430768-9380-8b81-bd10-a66e1b771383"
    - stage: boundary
      stageUuid: "d63921b2-a0a2-8d04-9927-9f78dfb39b66"
    - stage: links
      stageUuid: "516562b4-ed3b-81e3-8f29-0e9466c5097a"
    - stage: horo
      stageUuid: "ab78eb00-53d6-8b36-9e05-454f585ae52e"
    - stage: seal
      stageUuid: "06db0b4b-3834-8092-9801-ef5d686817b1"
    - stage: uuid
      stageUuid: "1ff87d5c-0638-85f4-b3e4-50c95aebcaef"
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
