---
name: analytics
description: "Use when reasoning about analytics — Days Sales Outstanding, receivables turnover and the collection effectiveness index over the invoice set — the A/R mirror of payable/analytics."
atomPath: "receivable/analytics"
coordinate: "receivable/analytics · 1/base · 7f0354cd"
contentUuid: "12194b90-7ff1-5f23-976a-4f4dd5266bf5"
diamondUuid: "96568a12-09f8-8318-883b-2f05b81b9fdd"
uuid: "7f0354cd-a807-877e-9d3e-f8f0e077e811"
horo: 1
typography:
  partition: receivable
  bondDegree: 92
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period"
  - "US-GAAP ASC-310 receivables"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "eb1a1baf-f8eb-80f4-a446-d30f087e2e8d"
  stages:
    - stage: path
      stageUuid: "a89ba93b-1e30-897b-85fc-b72f913609fe"
    - stage: trinity
      stageUuid: "8f7771ea-ad76-806a-92c7-3b9883c845fe"
    - stage: boundary
      stageUuid: "94af8005-dc0b-8ef0-8f18-5cdd7cbfc857"
    - stage: links
      stageUuid: "9fbc38c0-4441-8d47-8fd1-7166223272a3"
    - stage: horo
      stageUuid: "08dabd5f-9977-84c2-8214-6487dafe4872"
    - stage: seal
      stageUuid: "88e283a9-2cd5-82e0-800b-2bce040e0d67"
    - stage: uuid
      stageUuid: "6e0b8c5e-def6-8f32-98cb-bcfdeb937a52"
version: 2
---
# receivable/analytics — DSO, turnover and collection effectiveness

Days Sales Outstanding, receivables turnover and the collection effectiveness index over
the invoice set — the A/R mirror of [[payable]]/analytics.

DSO answers "how long does cash take to arrive"; turnover answers "how many times over the period";
CEI answers "of what was collectable, how much did we collect". Three questions, deliberately not
one number, because a single "collections health" score hides which of the three moved.

**Why it is a child atom.** It was `analytics.service.ts` beside the barrel. When [[receivable]] gained
the SKILL its code always warranted, that folder became an ATOM — and matter at an atom root is a
stray sibling ([[rules]]): only the trinity lives beside a barrel. Nesting it is the lawful form, and
the parent re-exports it, so no caller changed.

**Honest boundary.** This computes; it does not decide. The inputs — rates, terms, thresholds — are
given by the caller or the tenant, and nothing here validates that they are the right ones.

Composes: [[receivable]] · [[law]].

## Standards

- **IFRS 15** — revenue from contracts with customers.
