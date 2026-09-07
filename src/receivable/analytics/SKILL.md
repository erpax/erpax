---
name: analytics
description: "Use when reasoning about analytics — Days Sales Outstanding, receivables turnover and the collection effectiveness index over the invoice set — the A/R mirror of payable/analytics."
atomPath: "receivable/analytics"
coordinate: "receivable/analytics · 5/round · 093ec7d6"
contentUuid: "76be3f66-6e0f-51b4-b552-7b448b3f0ea1"
diamondUuid: "5bc35fc2-6914-8a22-a793-bf33b0645ce4"
uuid: "093ec7d6-d9d2-8b44-887a-bbb009665e6b"
horo: 5
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
  computationUuid: "e604e62a-f657-8a47-8a68-397b653846ef"
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
      stageUuid: "e9899702-8c34-8c3e-ac67-f25573d9d592"
    - stage: seal
      stageUuid: "88e283a9-2cd5-82e0-800b-2bce040e0d67"
    - stage: uuid
      stageUuid: "fa28baea-f9ea-8b31-a7a5-aeab2ec1e255"
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
