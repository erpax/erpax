---
name: span
description: "Use when a calendar date must be placed in a fiscal year as a span — monthly, quarterly, weekly, ISO-week, retail 4-4-5 or custom boundaries — as pure functions of the period config; the resolver's child, split out of its 714-line hub so the class keeps its face and the computations get their own proof."
atomPath: "fiscal/period/resolver/span"
---

# fiscal/period/resolver/span — where in the fiscal year a date falls

`FiscalPeriodResolver` is one class of static methods, and [[rules]]/concentration named it: 714 lines
in one barrel, score 0.74, two exports. Of those lines, the period **kinds** — monthly · quarterly ·
weekly · ISO-week · retail 4-4-5 · custom boundaries — were private statics depending on nothing but
their arguments. A private static that depends on nothing is a function wearing a class, and a
class is not an address a test can reach one method at a time.

So the kinds are functions here, each a one-liner to read and each with its own case in the test:
`fiscalYearStart` (UTC, from the configured month and day), `isoWeek` (the week holding the
Thursday — `2027-01-01` is week 53 of 2026), `monthlySpan` (the only kind that carries real bounds;
the thin kinds carry ordinal and label), `retail445Span` (4 + 4 + 5 weeks), `customSpan` (inclusive
date ranges, refusing a date outside every boundary) and `spanOf`, the dispatch that resolves every
kind the config can name and refuses one it cannot.

The parent keeps every public method and delegates. Nothing a caller imports moved
([[rules]]/face); what moved is the matter, into an address with a proof beside it.

**Honest boundary.** The thin kinds (quarterly, weekly, ISO-week, retail) return empty bounds —
exactly as they did inside the class. Moving them here made that visible as a tested fact rather than
fixing it; a quarter has a first and last day and this atom does not yet compute them.

**Law — [[law]]: a private static that depends only on its arguments is a function at the wrong
address. Give it its own atom, its own test and its own name, and let the class it left keep its face.**

## Standards

- **ISO 8601:2019** — week numbering: the ISO week.
- **IAS 1 §36** — the reporting period.

Composes: [[fiscal]] · [[rules]]/concentration · [[rules]]/face · [[law]].
