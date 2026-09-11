---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/R-shaped output — , . The bucket math is identical to payable/aging; only the naming differs, and the two stay separate so each side names its own…"
atomPath: "receivable/aging"
coordinate: "receivable/aging · 8/crest · d099d373"
contentUuid: "df71a95d-8be7-5d4f-b0c0-bd143f522f1f"
diamondUuid: "9350d547-db0a-8b91-b1b8-bd06a97ab4cb"
uuid: "d099d373-2263-8474-b4f7-01ecf7203965"
horo: 8
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
  computationUuid: "cb971e0c-10ae-8521-ad7e-ccee3d2ce084"
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
      stageUuid: "dbd38d03-0e9e-8d3c-8c09-3e8385b9e139"
    - stage: seal
      stageUuid: "5ab51680-ed72-819b-ade3-cb20d7b7ed56"
    - stage: uuid
      stageUuid: "1ac0800e-cdf8-8c3a-800f-b9c0ccbc83e4"
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
