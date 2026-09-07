---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/R-shaped output — , . The bucket math is identical to payable/aging; only the naming differs, and the two stay separate so each side names its own…"
atomPath: "receivable/aging"
coordinate: "receivable/aging · 7/descent · 31f5a0b2"
contentUuid: "319d5f84-ee30-5e90-800f-ffc39cfaed40"
diamondUuid: "25f42fc7-e5fe-8b86-abda-8fd3b9a833b7"
uuid: "31f5a0b2-e7de-8b91-b5c3-d5c68cee834b"
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
  computationUuid: "36141278-ac5e-861f-b07f-362482b3fa1d"
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
      stageUuid: "8f2d09e9-84ce-85d3-ad80-d3b8cff05b7a"
    - stage: seal
      stageUuid: "5ab51680-ed72-819b-ade3-cb20d7b7ed56"
    - stage: uuid
      stageUuid: "bc3b4540-2d3e-8de9-92b3-1126211eba02"
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
