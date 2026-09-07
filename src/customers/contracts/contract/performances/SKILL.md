---
name: performances
description: "Use when tracking performance milestones and control-transfer events that gate revenue recognition — planned vs. actual completion dates, over-time or point-in-time determination per IFRS-15 §31-35, acceptance criteria, and associated invoice link. The milestone control-transfer collection."
atomPath: "customers/contracts/contract/performances"
coordinate: "customers/contracts/contract/performances · 7/descent · 2aad495b"
contentUuid: "f2c79d65-d046-56ee-82b2-c6187c090a23"
diamondUuid: "765e7df5-f45b-8fb7-a2c1-83a9aacb4ed2"
uuid: "2aad495b-fbc3-830d-be42-44b5162dbda4"
horo: 7
typography:
  partition: customers
  bondDegree: 33
standards:
  - "ASC-606"
  - "IAS-1"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "IFRS IAS-1 presentation-of-financial-statements`"
  - "IFRS IFRS-15 §22 performance-obligations"
  - "IFRS IFRS-15 §22 performance-obligations`"
  - "IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition"
  - "IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition`"
  - "IFRS IFRS-15 §35 over-time-recognition"
  - "IFRS IFRS-15 §35 over-time-recognition`"
  - "IFRS-15"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time completion-dates"
  - "ISO-8601-1:2019 date-time completion-dates`"
  - "SOX §404 internal-controls revenue-completeness TOM-AR-04"
  - "US-GAAP"
  - "US-GAAP ASC-606-10-25-25 performance-obligations"
  - "US-GAAP ASC-606-10-25-27 transfer-of-control"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3892017e-eaa3-8011-aef0-0a0c0dd6e3d9"
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
      stageUuid: "a8fa87d4-b6c4-840a-9a58-f5d3267330fd"
    - stage: seal
      stageUuid: "0f31a180-1b87-878a-b48c-0d791e459c3d"
    - stage: uuid
      stageUuid: "cae456f3-6683-8f8b-8494-ac8dec3109c5"
version: 2
---
# contract-performance

Contract Performance — IFRS-15 §31-35 control transfer & revenue recognition timing.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-15 §31-35 control-transfer point-in-time-recognition`
- `@standard IFRS IFRS-15 §35 over-time-recognition`
- `@standard IFRS IFRS-15 §22 performance-obligations`
- `@standard IFRS IAS-1 presentation-of-financial-statements`
- `@standard ISO-8601-1:2019 date-time completion-dates`
- `@standard ISO-4217:2015 currency-codes`

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
