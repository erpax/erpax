---
name: performances
description: "Use when tracking performance milestones and control-transfer events that gate revenue recognition — planned vs. actual completion dates, over-time or point-in-time determination per IFRS-15 §31-35, acceptance criteria, and associated invoice link. The milestone control-transfer collection."
atomPath: customers/contracts/contract/performances
coordinate: customers/contracts/contract/performances · 1/base · 7d9efd28
contentUuid: "df692517-bd42-5fa4-bf59-251acda3d3cf"
diamondUuid: "a81d606b-892a-89f2-9c00-4d04368edcc9"
uuid: "7d9efd28-4695-8a84-a401-206a9c278a93"
horo: 1
bonds:
  in:
    - accounting
    - contract
    - contracts
    - deferral
    - deferredrevenue
    - invoices
    - law
    - obligations
    - proof
    - recognition
    - standard
    - transaction
  out:
    - accounting
    - contracts
    - deferral
    - deferredrevenue
    - invoices
    - law
    - obligations
    - proof
    - recognition
    - standard
    - transaction
typography:
  partition: customers
  bondDegree: 33
  neighbors: []
standards:
  - "ASC-606"
  - "IAS-1"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IFRS-15 §22 performance-obligations"
  - "IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS-15"
  - "ISO-19011:2018 audit-trail performance-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time completion-dates"
  - "SOX §404 internal-controls revenue-completeness TOM-AR-04"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-25 performance-obligations"
  - "US-GAAP ASC-606-10-25-27 transfer-of-control"
bindings: []
neighbors:
  wikilink:
    - accounting
    - invoices
    - law
    - obligations
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - contracts
    - deferral
    - deferredrevenue
    - invoices
    - law
    - obligations
    - proof
    - recognition
    - standard
    - transaction
  backlinks:
    - accounting
    - contracts
    - deferral
    - deferredrevenue
    - invoices
    - law
    - obligations
    - proof
    - recognition
    - standard
    - transaction
signatures:
  computationUuid: "9c0c4b69-cd41-895b-b74c-3db5ff5098aa"
  stages:
    - stage: path
      stageUuid: "cb42c745-6dbc-87f3-aac0-82979dadd14c"
    - stage: trinity
      stageUuid: "18aa144f-8fba-8f70-84b4-546f462fd9c1"
    - stage: boundary
      stageUuid: "2789bc7c-ce0e-8993-82fa-85a4260d7c40"
    - stage: links
      stageUuid: "e3fa67ff-7cce-8031-a1a9-5f62cab2ed35"
    - stage: horo
      stageUuid: "1dc9156d-3373-85cc-bbf6-38a3640f12c6"
    - stage: seal
      stageUuid: "0f31a180-1b87-878a-b48c-0d791e459c3d"
    - stage: uuid
      stageUuid: "1734c341-40d5-8a62-88c3-fddab50de38e"
version: 2
---
# contract-performance

Contract Performance — IFRS-15 §31-35 control transfer & revenue recognition timing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition
- IFRS IFRS-15 §35 over-time-recognition
- IFRS IFRS-15 §22 performance-obligations
- IFRS IAS-1 presentation-of-financial-statements
- US-GAAP ASC-606-10-25-25 performance-obligations
- US-GAAP ASC-606-10-25-27 transfer-of-control
- ISO-8601-1:2019 date-time completion-dates
- ISO-4217:2015 currency-codes
- SOX §404 internal-controls revenue-completeness TOM-AR-04
- ISO-19011:2018 audit-trail performance-evidence

Composes: [[customers/contracts/performance/obligations]] · [[transaction]] · [[standard]] · [[accounting]] · [[Invoices]] · [[proof]].

**Law — [[law]]: revenue is recognised only at the instant (point-in-time) or over the span (over-time) that control actually transfers, never on the planned date alone.**
