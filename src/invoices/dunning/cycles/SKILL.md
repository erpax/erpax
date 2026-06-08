---
name: cycles
description: "Use when tracking or auditing the collections process for an overdue invoice — reminder→demand→legal-handover→write-off stages, ECL allowance evidence (IFRS 9 §5.5 / ASC 326-20 CECL), manual overrides and SOX §404 bad-debt evidence. The dunning-cycles collection."
atomPath: invoices/dunning/cycles
coordinate: invoices/dunning/cycles · 1/base · 211c9446
contentUuid: "9410045a-5067-5f40-9021-cfbc6df35c1d"
diamondUuid: "571eecef-520c-8fc5-9aae-90c2925d8a97"
uuid: "211c9446-d7e8-871a-accf-4c96fea5de1b"
horo: 1
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
  - "ISO-19011:2018 audit-trail collections-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time stage-due-date"
  - "SOX §404 internal-controls bad-debt-evidence"
  - "US-GAAP ASC-310 receivables"
  - "US-GAAP ASC-326-20 cecl-credit-losses"
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
  computationUuid: "9686680e-dec1-8a1d-8bdd-4da243db8193"
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
      stageUuid: "135e521f-9b1d-8878-b8e3-acbbf62af386"
    - stage: seal
      stageUuid: "68c0c8c6-a9ad-858d-9757-f84cd4e2aec0"
    - stage: uuid
      stageUuid: "3c7905cd-e2bd-8cb3-9910-2079fe915ed6"
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
- ISO-8601-1:2019 date-time stage-due-date
- ISO-4217:2015 currency-codes
- IFRS IFRS-9 §5.5 expected-credit-loss simplified-approach
- US-GAAP ASC-326-20 cecl-credit-losses
- US-GAAP ASC-310 receivables
- ISO-19011:2018 audit-trail collections-evidence
- SOX §404 internal-controls bad-debt-evidence
- GDPR Art.6(1)(f) lawful-basis-legitimate-interest collections
- ISO-27002 §5.4 segregation-of-duties write-off-approval
