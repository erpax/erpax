---
name: analytics
description: "Use when reasoning about analytics — Days Sales Outstanding, receivables turnover and the collection effectiveness index over the invoice set — the A/R mirror of payable/analytics."
atomPath: "receivable/analytics"
coordinate: "receivable/analytics · 2/share · bd69385b"
contentUuid: "128b7612-6459-5b1c-8b79-38f010bf311c"
diamondUuid: "7d769b22-8c24-8618-a5d5-ae404b4e0adc"
uuid: "bd69385b-bf9f-8093-a39e-7dd18c7691eb"
horo: 2
typography:
  partition: receivable
  bondDegree: 58
standards:
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time period"
  - "US-GAAP ASC-310 receivables"
  - "US-GAAP ASC-606 revenue-from-contracts-with-customers"
bindings: []
signatures:
  computationUuid: "477e3844-e9ad-8439-8526-b2554641e30f"
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
      stageUuid: "77d4fb95-3beb-8622-a762-ceb24439ab76"
    - stage: seal
      stageUuid: "88e283a9-2cd5-82e0-800b-2bce040e0d67"
    - stage: uuid
      stageUuid: "4f4fd4c3-4a18-8bb9-9e8b-2fad638b6f65"
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
