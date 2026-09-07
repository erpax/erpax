---
name: aging
description: "Use when reasoning about aging — Wraps party/aging with A/P-shaped output — , — and adds the cash-flow-impact section the payables side needs and the receivables side does not."
atomPath: "payable/aging"
coordinate: "payable/aging · 2/share · 73cab322"
contentUuid: "d6cb67cd-e388-52ea-b65f-6676b117cfb7"
diamondUuid: "3c4e801d-5375-81df-a13b-28037a69f099"
uuid: "73cab322-e96d-8f37-b76a-4c9996b6af66"
horo: 2
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
  computationUuid: "c4cf250b-ee4b-88db-93a6-0148b5fc588b"
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
      stageUuid: "5a987888-e071-8d38-a965-648f8d9c9f2f"
    - stage: seal
      stageUuid: "9375f13c-b633-830e-b0d9-6a6cc9483672"
    - stage: uuid
      stageUuid: "ac4bffd7-e97c-8038-837e-bc14e22d0dc5"
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
