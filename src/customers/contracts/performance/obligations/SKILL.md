---
name: obligations
description: "Use when decomposing a contract into its distinct promises for IFRS-15 §22 revenue allocation — kind (distinct or series), recognition timing (point-in-time §38 or over-time §35), progress measurement method, standalone selling price, and allocated amount. The IFRS-15 performance-obligation collection."
atomPath: "customers/contracts/performance/obligations"
coordinate: "customers/contracts/performance/obligations · 2/share · 9e2e4991"
contentUuid: "69727d01-2ff3-5123-a77b-5225376de098"
diamondUuid: "214bcd37-1d91-897c-a06c-f38afd8de6df"
uuid: "9e2e4991-6bb0-8281-a459-d55fc2718ab3"
horo: 2
typography:
  partition: customers
  bondDegree: 28
standards:
  - "IFRS IFRS-15 §22 distinct-performance-obligation"
  - "IFRS IFRS-15 §31 satisfaction-of-performance-obligation"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §38 point-in-time-recognition"
  - "IFRS IFRS-15 §41-§43 progress-measurement"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time satisfaction-date"
  - "ISO-8601-1:2019 date-time satisfaction-date`"
  - "SOX §404 internal-controls revenue-recognition"
  - "US-GAAP ASC-606-10-25-14 distinct-goods-services"
  - "US-GAAP ASC-606-10-25-31 progress-measurement"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "82c91305-cf16-8f9c-aeac-72bbab9c0a1d"
  stages:
    - stage: path
      stageUuid: "fc62e037-117b-8f30-b5d8-f0d29725b571"
    - stage: trinity
      stageUuid: "a4babf19-6d14-882e-9c24-01024a5edc65"
    - stage: boundary
      stageUuid: "6caa9fa6-cd54-8afa-8120-0ca1402dc61e"
    - stage: links
      stageUuid: "f57ced79-e4e8-8742-acc5-a4b95f239144"
    - stage: horo
      stageUuid: "d878963b-1a53-8212-9c8c-bd9df0ea0b90"
    - stage: seal
      stageUuid: "545c13c8-0931-85dd-9f7c-b290e53396c4"
    - stage: uuid
      stageUuid: "cc1e0824-a38c-8a89-976b-129fc8bba24d"
version: 2
---
# performance-obligations

Performance Obligations — IFRS 15 §22 distinct promises within a contract.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time satisfaction-date`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time satisfaction-date
- IFRS IFRS-15 §22 distinct-performance-obligation
- IFRS IFRS-15 §31 satisfaction-of-performance-obligation
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §38 point-in-time-recognition
- IFRS IFRS-15 §41-§43 progress-measurement
- US-GAAP ASC-606-10-25-14 distinct-goods-services
- US-GAAP ASC-606-10-25-31 progress-measurement
- ISO-19011:2018 audit-trail po-satisfaction
- SOX §404 internal-controls revenue-recognition

Composes: [[Contracts]] · [[hooks]] · [[accounting]] · [[auth]] · [[standard]].

**Law — [[law]]: the amounts allocated across a contract's distinct obligations sum exactly to its transaction price, each by standalone selling price.**
