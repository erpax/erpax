---
name: unit
description: "Use when reasoning about unit — 's own docstring calls itself *\"single source of truth for how old is this item\"*, cites ISO-8601, and party's SKILL says the day-arithmetic *\"is borrowed… not re-typed — the…"
atomPath: "rules/unit"
coordinate: "rules/unit · 8/crest · 7b6c48f2"
contentUuid: "c6aeb5ba-a94a-5868-bd17-ddfc1021affa"
diamondUuid: "aadff5e2-b270-88a7-8cff-f0a249e8e2f0"
uuid: "7b6c48f2-f9f7-80db-8720-eba196a7cde0"
horo: 8
typography:
  partition: rules
  bondDegree: 67
standards:
  - "ISO 80000-3 — time: the day as a unit of measure"
  - "ISO/IEC 25010:2023 §5.6 — maintainability: a change is made once, not once per copy"
bindings: []
signatures:
  computationUuid: "ba7970a0-4e17-8af0-83a3-ab6a69dd9720"
  stages:
    - stage: path
      stageUuid: "df429d82-3d73-8fe8-a222-6f7fff050b3c"
    - stage: trinity
      stageUuid: "843e8eca-d159-8fe5-a9c6-10872eaac5c2"
    - stage: boundary
      stageUuid: "469469d3-3bed-8eda-8c8a-f3b433f9d291"
    - stage: links
      stageUuid: "aca17140-7a54-8350-a36f-ae1769d9dcf9"
    - stage: horo
      stageUuid: "25efe7ff-0cd6-8e09-b0d1-3dce363c9e06"
    - stage: seal
      stageUuid: "c8dd2aea-6f0c-83c7-b8a2-9a6f4985855b"
    - stage: uuid
      stageUuid: "361f1fbd-c5d9-8aea-82fb-df2d52b38267"
version: 2
---
# rules/unit — a constant everybody knows is the one everybody retypes

`daysBetween`'s own docstring calls itself *"single source of truth for how old is this item"*, cites
ISO-8601, and [[party]]'s SKILL says the day-arithmetic *"is borrowed… not re-typed — the filesystem
is the only source"*. Three files called it. **Twenty-four other sites spelled the divisor out.**

| notation | where |
| --- | --- |
| `1000 * 60 * 60 * 24` | 22 sites across 9 files |
| `86_400_000` | a local `MS_PER_DAY` in `lease/service` |
| `86400000` | the ISO-week calculation in `fiscal/period/resolver` |
| `24 * 60 * 60 * 1000` | `jobs/dunning/job`, reversed |

The last two are the reason this is parsed rather than grepped: a search for the first spelling
**cannot see** the reversed order or the underscore-less one. That is [[rules]]/probe's law — a
filter that selects by name cannot see what it does not name — and what it missed here was a third
hand-rolled definition of `daysBetween` itself (`getDaysSincePastDue`).

## The rounding is part of the conversion, and it had two answers

The divisor was the visible half. The sharp half is that **this corpus computed day differences two
ways**: `daysBetween` floors, and every AP/AR site ceils. For any partial day they differ by one,
and one day moves an invoice across the 0–30 / 31–60 aging boundary — so *"how overdue is this"* had
two answers depending on which module answered, and the answer reaches a financial report a person
signs ([[rules]]/audience).

**Both roundings are kept and named** — `daysBetween` · `daysBetweenCeil` · `daysApart` ·
`daysExact` · `daysOverdue` · `daysRemaining` · `daysUntil` · `addDays`. Which is correct for aging
is an accounting-policy decision, not a refactor; what is fixed is that each has ONE address, so the
choice is visible at the call site instead of buried in a divisor. `daysApart` could not be composed
from `daysBetween` at all: `exactFloor(exactAbs(ms))` and `exactAbs(exactFloor(ms))` disagree for any
negative partial day, so the absolute value belongs inside the floor.

## What the DRY pass found that no gate was looking for

```ts
return exactCeil((b.billDate.getTime() - b.billDate.getTime()) / (1000 * 60 * 60 * 24))
```

`payable/analytics` computed a bill's receipt lag as **its own date minus itself** — always `0`, so
`avgDaysToReceive` in every `VendorPerformance` report has never measured anything. It now measures
`billDate → createdAt`, which is real data. Beside it, `daysToPay` for paid bills is
`asOfDate − dueDate`: days past due at the report date, not days taken to pay — `Bill` carries no
paid date, so the real metric **cannot** be computed and is not invented. That is named at the site
rather than quietly left to read as correct.

This is the corpus's own law paying out: *duplication is camouflage — while one law is stated in two
private corners, nothing can show a THIRD place is missing it.* Twenty-four corners, and the bug sat
in one of them.

## Parsed, never matched — and the false green that proved it

`unitRederivations` walks `ts.BinaryExpression` and folds a `*`-chain of numeric literals to its
product, flagging one that equals a `DECLARED_UNITS` value and is multiplied or divided by. So
`spec/generator/seed.ts`, which **emits** `86_400_000` inside a template because it generates code
that will do date arithmetic, is free: a literal in a string is data, not arithmetic — the refusal
[[rules]]/confine and [[rules]]/bypass each paid for separately. A bare `60_000` outside arithmetic
is a timeout, not a conversion, and is not flagged either.

The first run of this gate reported **0** and every planted defect in its own test failed. It had
passed `(cwd, file)` to the single-argument `astOf`, which parsed the *cwd string* as source — so it
was measuring nothing and saying so in green. A gate never seen to fire is a claim, which is why
every shape here is planted in a hermetic tree.

## The other two units followed, and one of them was a split codec

`hour` (6 sites) and `minute` (5) were first left as a declared ratchet, because a duration
*formatter* decomposes a span rather than differencing two dates and needed its own primitive. They
are now **0** as well, and closing them found the better finding:

`capture/media` FORMATTED a millisecond offset as `HH:MM:SS.mmm` and `transcript` PARSED that exact
shape back — two halves of one WebVTT/SRT codec, in different atoms, each with its own inline unit
arithmetic and neither aware of the other. Neither half could state the property that matters. One
address later it is a test: **`parseClock(formatClock(ms)) === ms`**.

The smaller units are **derived** — `MS_PER_HOUR = MS_PER_DAY / 24`, and so down — so a single
literal seeds the family and `3_600_000` and `60_000` appear nowhere in the corpus. `timestampMs`
keeps its exported name and delegates, because an atom may never quietly stop offering a name
([[rules]]/face).

## Honest boundary

Every declared unit is now a **theorem at zero**, and `DECLARED_UNITS` holds four values in the open
so the list can be argued with. This proves the divisor is not re-derived, never that a call site
picked the *right* rounding — that is the accounting decision above, and no gate makes it. The
`day`/`hour`/`minute`/`week` family is closed; a unit this map does not name (a quarter, a fiscal
period) is outside it.

It reads `.ts`/`.tsx` outside tests, so a conversion in a config, a `.mjs` hook or generated output
is invisible to it ([[rules]]/domain) — and a literal inside a template is deliberately free, which is
what keeps `spec/generator/seed.ts` lawful while it emits `86_400_000` into the code it writes.

**Law — [[law]]: a unit conversion has one address, and the rounding travels with it. A constant
everybody knows is the one everybody retypes — and the copy that drifts is the one that reaches the
report.**

## Standards

- **ISO 80000-3** — time: the day as a unit of measure.
- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is made once, not once per copy.
- **ISO 19011:2018 §6.4** — audit evidence: an aging figure must be reproducible.

Composes: [[rules]]/copy · [[rules]]/probe · [[rules]]/audience · [[syntax]] · [[law]].
