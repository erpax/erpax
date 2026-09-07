---
name: cycles
description: "Use when tracking or auditing the collections process for an overdue invoice — reminder→demand→legal-handover→write-off stages, ECL allowance evidence (IFRS 9 §5.5 / ASC 326-20 CECL), manual overrides and SOX §404 bad-debt evidence. The dunning-cycles collection."
atomPath: "invoices/dunning/cycles"
coordinate: "invoices/dunning/cycles · 5/round · 05dad936"
contentUuid: "677291b9-7a20-506f-bfc7-3f20a0018f5d"
diamondUuid: "067e8c52-86f6-8fa7-b335-e4db020965d8"
uuid: "05dad936-b249-8045-8340-6e393f6596c7"
horo: 5
typography:
  partition: invoices
  bondDegree: 25
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
signatures:
  computationUuid: "49ca4224-49d4-8b4a-adbd-c410eb4075e9"
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
      stageUuid: "db1f72fc-f357-8e87-8f63-e94e89885bef"
    - stage: seal
      stageUuid: "68c0c8c6-a9ad-858d-9757-f84cd4e2aec0"
    - stage: uuid
      stageUuid: "761b27e4-f0bf-8856-8370-bc52b06558d8"
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
