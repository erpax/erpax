---
name: "8601"
description: "Use when implementing or referencing ISO 8601 — Date and time."
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
