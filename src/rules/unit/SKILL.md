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

## Honest boundary

**`day` is a theorem at zero.** `hour` (6) and `minute` (5) are a declared **ratchet**, not a claim:
those sites are duration *formatters* and timeouts, which decompose a span into units rather than
difference two dates, so they need an hour/minute primitive this atom has not written. Naming the
residue is the point — an unasked question reported as green is the defect this corpus keeps paying
for.

`DECLARED_UNITS` holds four values in the open so it can be argued with. This proves the divisor is
not re-derived, never that a call site picked the *right* rounding — that is the accounting decision
above, and no gate makes it. And it reads `.ts`/`.tsx` outside tests, so a conversion in a config, a
`.mjs` hook or generated output is invisible to it ([[rules]]/domain).

**Law — [[law]]: a unit conversion has one address, and the rounding travels with it. A constant
everybody knows is the one everybody retypes — and the copy that drifts is the one that reaches the
report.**

## Standards

- **ISO 80000-3** — time: the day as a unit of measure.
- **ISO/IEC 25010:2023 §5.6** — maintainability: a change is made once, not once per copy.
- **ISO 19011:2018 §6.4** — audit evidence: an aging figure must be reproducible.

Composes: [[rules]]/copy · [[rules]]/probe · [[rules]]/audience · [[syntax]] · [[law]].
