---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/R-shaped output — , . The bucket math is identical to payable/aging; only the naming differs, and the two stay separate so each side names its own…"
atomPath: "receivable/aging"
coordinate: "receivable/aging · 7/descent · 1da069f8"
contentUuid: "285f8edd-2f7e-53b6-ad80-232e8a6b3428"
diamondUuid: "dc9b93b4-cb67-8d07-80e9-f64b4002acde"
uuid: "1da069f8-1c56-85ed-a84e-99a2f37c1a2e"
horo: 7
typography:
  partition: receivable
  bondDegree: 17
standards:
  - "IFRS IFRS-9 financial-instruments expected-credit-loss"
  - "ISO-8601-1:2019 date-time as-of-date"
  - "US-GAAP ASC-310 receivables"
  - "US-GAAP ASC-326 credit-losses-cecl"
bindings: []
signatures:
  computationUuid: "790e9e47-da93-85be-b484-52e503d5b7d6"
  stages:
    - stage: path
      stageUuid: "0a738fd1-139a-8c6d-857d-390badf0b065"
    - stage: trinity
      stageUuid: "a3173d8b-15eb-83e2-b269-33f181f9fce7"
    - stage: boundary
      stageUuid: "b56a432a-4154-8b43-89d2-284e0b969f02"
    - stage: links
      stageUuid: "2ce0062e-2575-86db-966c-91dd05270928"
    - stage: horo
      stageUuid: "032c63ae-83fa-81eb-9cb4-2573ed1f6e14"
    - stage: seal
      stageUuid: "5ab51680-ed72-819b-ade3-cb20d7b7ed56"
    - stage: uuid
      stageUuid: "be9de544-0d73-8797-ae1a-683890f3a880"
version: 2
---
# receivable/aging — the A/R side of one bucket calculation

Wraps [[party]]/aging with A/R-shaped output — `invoices`, `ARAgingReport`. The bucket
math is identical to [[payable]]/aging; only the naming differs, and the two stay separate so each
side names its own documents rather than sharing a word that means neither.

**Why it is a child atom.** It was `aging.service.ts` beside the barrel. When [[receivable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[receivable]] · [[law]].

## Standards

- **IFRS 9 §5.5** — expected credit loss (the buckets this feeds).
