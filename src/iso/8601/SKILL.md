---
name: "8601"
description: Use when implementing or referencing ISO 8601 — Date and time.
atomPath: iso/8601
coordinate: iso/8601 · 1/base · 8af5edcc
contentUuid: "99ff481d-c77f-546e-afb6-988ecfb792c6"
diamondUuid: "3d840c1e-b3ee-8fd9-a6a7-55f7a492fd2e"
uuid: "8af5edcc-611e-8f76-abff-33d56927439b"
horo: 1
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
bindings: []
neighbors:
  wikilink: []
  matrix: []
  backlinks: []
signatures:
  computationUuid: "d9b942af-36d7-85b6-aca6-76d2c48852e4"
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
      stageUuid: "71252556-54a5-81f5-9617-549b5a2bc142"
    - stage: seal
      stageUuid: "06db0b4b-3834-8092-9801-ef5d686817b1"
    - stage: uuid
      stageUuid: "fcce4179-1a30-8e95-9d9e-ee9dc8a3ac69"
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
