---
name: span
description: "Use when reasoning about span — The calendar day stood at **twenty-four addresses in four notations** — (22 sites), a local in , a bare in the ISO-week calculation, and reversed in — while called itself the…"
atomPath: "utility/span"
coordinate: "utility/span · 8/crest · ba917aab"
contentUuid: "7ffe5e60-0f37-588f-8dbe-011a3a4becd6"
diamondUuid: "531364b1-a918-8552-a54f-15dcef1cf070"
uuid: "ba917aab-1917-811a-8384-430f901022c5"
horo: 8
typography:
  partition: utility
  bondDegree: 12
standards:
  - "ISO 80000-3 — time: the day as a unit of measure"
  - "ISO-8601-1:2019 — date-time days-between arithmetic"
  - "W3C WebVTT — cue timings `HH:MM:SS.mmm`"
bindings: []
signatures:
  computationUuid: "adc56511-7fe9-8fcb-994e-98edf5451da9"
  stages:
    - stage: path
      stageUuid: "39649e03-004c-8351-afec-d01e0935f93e"
    - stage: trinity
      stageUuid: "1313dc73-3e76-8e55-aa38-376b88a33378"
    - stage: boundary
      stageUuid: "85a4b9c1-b906-8382-b775-7f7380a55b54"
    - stage: links
      stageUuid: "7a867c8c-b813-89de-b369-91b8d0cd35dd"
    - stage: horo
      stageUuid: "90f3fa65-b32e-8e5c-be72-0a87990c0792"
    - stage: seal
      stageUuid: "961b5c49-6ad1-8e57-86e2-c8d9f003dbb6"
    - stage: uuid
      stageUuid: "e8a5eefc-699e-8f4b-9bd2-81c17fd02935"
version: 2
---
# utility/span — a span of time, measured once

The calendar day stood at **twenty-four addresses in four notations** — `1000 * 60 * 60 * 24`
(22 sites), a local `86_400_000` in `lease/service`, a bare `86400000` in the ISO-week calculation,
and `24 * 60 * 60 * 1000` reversed in `jobs/dunning` — while `daysBetween` called itself the single
source of truth and three files used it. The hour and minute held eleven more.

`MS_PER_DAY` is module-private here, and the smaller units are **derived** from it, so one literal
seeds the family and no other appears anywhere in the corpus. A caller asks for a span, never for a
divisor. [[rules]]/unit is the wall that keeps it that way, at a baseline of 0.

## The rounding is part of the conversion, and it had two answers

`daysBetween` **floors** and every AP/AR site **ceils**. For a partial day they differ by one, and
one day moves an invoice across the 0–30 / 31–60 aging boundary — so *"how overdue is this"* had two
answers depending on which module answered, and the answer reaches a report a person signs.

Both are kept and named, because choosing one is **accounting policy, not a refactor**. What is
fixed is that each has one address, so the choice is visible at the call site instead of buried in a
divisor.

| name | rounding | for |
| --- | --- | --- |
| `daysBetween` | floor | the established face — aging buckets |
| `daysBetweenCeil` | ceil | the AP/AR reading |
| `daysApart` | floor of the **absolute** span | a tolerance, where direction is irrelevant |
| `daysExact` | none | a caller that divides again, so rounding waits for the end |
| `daysOverdue` · `daysUntil` | ceil, floored at 0 | not-yet-due is zero, never minus five |

`daysApart` is not a wrapper for convenience: the order of `abs` and `floor` decides the answer.
`exactAbs(daysBetween(a, b))` gives **1** for a negative half-day where this gives **0**, because
flooring first has already rounded away from zero. It composes from `daysExact`, so the name exists
for its callers rather than out of necessity — an earlier draft claimed the composition impossible
and that was wrong.

## The codec whose two halves lived apart

`capture/media` **formatted** a millisecond offset as `HH:MM:SS.mmm` and `transcript` **parsed** that
exact shape back — two halves of one WebVTT/SRT codec, in different atoms, each with its own inline
unit arithmetic, neither aware of the other. Neither could state the property that matters. Together
they can: **`parseClock(formatClock(ms)) === ms`**.

`parseClock` is deliberately more permissive than `formatClock` emits — the hours group is optional
and SRT writes the fraction with a comma — so both dialects parse while only the canonical form is
produced. `transcript`'s `timestampMs` keeps its exported name and delegates, because an atom may
never quietly stop offering a name ([[rules]]/face).

## Honest boundary

This is arithmetic over instants, not a calendar: it knows nothing of time zones, leap seconds, or
daylight saving, so a "day" here is 86,400,000 milliseconds and not a civil day that may be 23 or 25
hours long. Every caller today differences UTC instants or stored timestamps, where that is correct;
a civil-calendar span is a different computation and would need a different atom.

It does not decide which rounding a report should use — that is the accounting decision above, and
no gate makes it.

**Law — [[law]]: a unit conversion has one address, and the rounding travels with it. A constant
everybody knows is the one everybody retypes.**

Composes: [[utility]] · [[rules]]/unit · [[algebra]] · [[law]].
