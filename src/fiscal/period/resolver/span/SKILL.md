---
name: span
description: "Use when a calendar date must be placed in a fiscal year as a span — monthly, quarterly, weekly, ISO-week, retail 4-4-5 or custom boundaries — as pure functions of the period config; the resolver's child, split out of its 714-line hub so the class keeps its face and the computations get their own proof."
atomPath: "fiscal/period/resolver/span"
coordinate: "fiscal/period/resolver/span · 7/descent · 08d02b99"
contentUuid: "184d7579-0f1f-5367-9f5f-86ef4c77411d"
diamondUuid: "3645b9d6-adb2-81ff-aeb2-1ae3c3e4c46d"
uuid: "08d02b99-5832-8858-8063-d3a462b4d82a"
horo: 7
typography:
  partition: fiscal
  bondDegree: 15
standards:
  - "IAS-1 §36 reporting period"
  - "ISO-8601:2019 week-numbering (the ISO week)"
bindings: []
signatures:
  computationUuid: "42d5bc26-f57d-80a1-9d4c-f2245e7a003c"
  stages:
    - stage: path
      stageUuid: "9a0aebe2-d5af-8db8-8374-3594596038f9"
    - stage: trinity
      stageUuid: "7a5b6c11-baf8-8b4b-a07d-548ed0bd2e2e"
    - stage: boundary
      stageUuid: "de187fdc-e94f-8b2e-a576-55475c165d72"
    - stage: links
      stageUuid: "7ab5c516-42ea-8713-acbf-3eb37059d901"
    - stage: horo
      stageUuid: "f51a6b91-f296-804b-9130-5b97211af5eb"
    - stage: seal
      stageUuid: "6ee89cd5-463a-8621-a540-24828314d07d"
    - stage: uuid
      stageUuid: "24024b27-4f68-82b4-ab72-27192195dd17"
version: 2
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
