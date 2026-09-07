---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/R-shaped output — , . The bucket math is identical to payable/aging; only the naming differs, and the two stay separate so each side names its own…"
atomPath: "receivable/aging"
coordinate: "receivable/aging · 5/round · 039f1f29"
contentUuid: "a867a0b0-1a4a-5b57-977d-465b8e9633d6"
diamondUuid: "c9ffcd3c-7afd-8c0d-92f1-c0aa3a1da0a9"
uuid: "039f1f29-bffc-801d-ab64-1161d8c50221"
horo: 5
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
  computationUuid: "b4af254f-5f1c-8e7e-b371-2f903d7fbd73"
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
      stageUuid: "984863f4-7037-8dd7-a0e2-8b01fd56092d"
    - stage: seal
      stageUuid: "5ab51680-ed72-819b-ade3-cb20d7b7ed56"
    - stage: uuid
      stageUuid: "27ea2945-1261-831d-954d-0b399d634292"
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
