---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/P-shaped output — , — and adds the cash-flow-impact section the payables side needs and the receivables side does not."
atomPath: "payable/aging"
coordinate: "payable/aging · 5/round · 9cd63558"
contentUuid: "1a56519f-c83c-5abb-a3ff-b694c4ac83ff"
diamondUuid: "8b3436ce-1b36-8cb9-a91a-f44a772a38c6"
uuid: "9cd63558-8fd7-8259-ab7a-06be40febb11"
horo: 5
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
  computationUuid: "e981812a-5412-8605-b928-028be6f3ff90"
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
      stageUuid: "f9d796f3-c168-85d2-99d0-ea0d80bc79c3"
    - stage: seal
      stageUuid: "9375f13c-b633-830e-b0d9-6a6cc9483672"
    - stage: uuid
      stageUuid: "b88d29a4-9e7c-8cb6-84f6-9fdbc2d554dc"
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
