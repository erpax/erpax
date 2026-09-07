---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/P-shaped output — , — and adds the cash-flow-impact section the payables side needs and the receivables side does not."
atomPath: "payable/aging"
coordinate: "payable/aging · 8/crest · 680011c2"
contentUuid: "6f4ba2b5-31e3-5d45-8932-93f0c0c3e834"
diamondUuid: "9d7ee131-ae13-823e-901d-1dd2225e191a"
uuid: "680011c2-67a1-8a7a-be36-fc3583c9b279"
horo: 8
typography:
  partition: payable
  bondDegree: 17
standards:
  - "IFRS IAS-37 provisions-contingent-liabilities"
  - "IFRS IAS-7 statement-of-cash-flows"
  - "ISO-8601-1:2019 date-time as-of-date"
  - "US-GAAP ASC-230 statement-of-cash-flows"
  - "US-GAAP ASC-405 liabilities"
bindings: []
signatures:
  computationUuid: "cd4f0ac6-77a9-81a4-b93b-1f21a6ac51db"
  stages:
    - stage: path
      stageUuid: "e99a97ce-378c-8250-bc94-07914d529fe6"
    - stage: trinity
      stageUuid: "2bcf5c0c-50d0-8380-9cfa-24b100a9d488"
    - stage: boundary
      stageUuid: "e47f5b2f-7176-8f19-bd74-050448358f27"
    - stage: links
      stageUuid: "da40b52d-5e23-82ee-a10f-b6d64abceeab"
    - stage: horo
      stageUuid: "780c941b-3f78-8ea9-adf3-37d23ba5ed4a"
    - stage: seal
      stageUuid: "9375f13c-b633-830e-b0d9-6a6cc9483672"
    - stage: uuid
      stageUuid: "9b315c48-fb33-8e9f-a9e3-8fcb76afd692"
version: 2
---
# payable/aging — the A/P side of one bucket calculation

Wraps [[party]]/aging with A/P-shaped output — `bills`, `APAgingReport` — and adds the
cash-flow-impact section the payables side needs and the receivables side does not.

The bucket MATH is shared; only the naming and the cash-flow view differ. That is deliberate: an
aging bucket is the same arithmetic whichever direction the money runs, and duplicating it would be
two chances to disagree about what "60 days overdue" means ([[rules]]/copy).

**Why it is a child atom.** It was `aging.service.ts` beside the barrel. When [[payable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[payable]] · [[law]].

## Standards

- **US-GAAP ASC-405** — liabilities.
