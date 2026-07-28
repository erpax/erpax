---
name: cycles
description: "Use when tracking or auditing the collections process for an overdue invoice — reminder→demand→legal-handover→write-off stages, ECL allowance evidence (IFRS 9 §5.5 / ASC 326-20 CECL), manual overrides and SOX §404 bad-debt evidence. The dunning-cycles collection."
atomPath: "invoices/dunning/cycles"
coordinate: "invoices/dunning/cycles · 7/descent · 088e98cb"
contentUuid: "1ca01fb3-2042-5d8c-bbfb-c4c7c246c3fd"
diamondUuid: "ddc310fc-7d77-85c3-83ca-9bf894efeeb4"
uuid: "088e98cb-2442-843e-871f-425b1e215f24"
horo: 7
bonds:
  in:
    - accounting
    - cycle
    - dunning
    - entries
    - invoices
    - law
    - sla
    - standard
  out:
    - accounting
    - cycle
    - dunning
    - entries
    - invoices
    - law
    - sla
    - standard
typography:
  partition: invoices
  bondDegree: 25
  neighbors: []
standards:
  - "GDPR Art.6(1)(f) lawful-basis-legitimate-interest collections"
  - "IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time stage-due-date"
  - "ISO-8601-1:2019 date-time stage-due-date`"
  - "SOX §404 internal-controls bad-debt-evidence"
  - "US-GAAP ASC-310 receivables"
  - "US-GAAP ASC-326-20 cecl-credit-losses"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - accounting
    - entries
    - invoices
    - law
    - standard
  matrix:
    - accounting
    - cycle
    - dunning
    - entries
    - invoices
    - law
    - sla
    - standard
  backlinks:
    - accounting
    - cycle
    - dunning
    - entries
    - invoices
    - law
    - sla
    - standard
signatures:
  computationUuid: "6595e8f3-86be-8336-b92f-d07715fbc4f1"
  stages:
    - stage: path
      stageUuid: "a80297b2-61c1-8809-9076-b2bf8d9eb151"
    - stage: trinity
      stageUuid: "1d0e3127-4dd1-8b10-b9f5-c01de3bf8cb2"
    - stage: boundary
      stageUuid: "0eff0be9-e0d2-87b2-bac7-20f18d89c222"
    - stage: links
      stageUuid: "482c0a9e-c55e-8378-9917-25d183a6850c"
    - stage: horo
      stageUuid: "eb57f101-6ca9-80b3-850c-9d812a0fe5d6"
    - stage: seal
      stageUuid: "68c0c8c6-a9ad-858d-9757-f84cd4e2aec0"
    - stage: uuid
      stageUuid: "2b590c65-ebf2-81b4-9b1e-dcd50f569a98"
version: 2
---
# dunning-cycles

Dunning Cycles — collection-process record per overdue invoice.

Composes: [[accounting]] · [[invoices]] · [[journal/entries]] · [[standard]].

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: each overdue invoice carries one dunning-cycle record advancing reminder→demand→legal-handover→write-off, every stage producing the IFRS-9/CECL expected-credit-loss allowance evidence, write-off gated by segregation of duties.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time stage-due-date`
- `@standard ISO-4217:2015 currency-codes`

- ISO-8601-1:2019 date-time stage-due-date
- ISO-4217:2015 currency-codes
- IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach
- US-GAAP ASC-326-20 cecl-credit-losses
- US-GAAP ASC-310 receivables
- ISO-19011:2018 audit-trail collections-evidence
- SOX §404 internal-controls bad-debt-evidence
- GDPR Art.6(1)(f) lawful-basis-legitimate-interest collections
- ISO-27002 §5.4 segregation-of-duties write-off-approval
