---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: "iso/8601"
coordinate: "iso/8601 · 1/base · 96d49a13"
contentUuid: "4db7c580-9076-52b7-89f9-0aaab2fbb8be"
diamondUuid: "8e9d2938-cc26-81db-82fc-28c3e5d6b543"
uuid: "96d49a13-ab82-854d-828a-4906fb28fad6"
horo: 1
typography:
  partition: iso
  bondDegree: 0
standards:
  - "ECMA-262"
  - "ECMA-402"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5b52e521-b3d1-8d69-9a96-35da49cb9270"
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
      stageUuid: "dab4abe6-d0dc-8136-a157-201ebb213c60"
    - stage: seal
      stageUuid: "06db0b4b-3834-8092-9801-ef5d686817b1"
    - stage: uuid
      stageUuid: "85376908-31d9-830a-aacb-e0e5e5dee0cf"
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
