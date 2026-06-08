---
name: adjustments
description: "Use when documenting intercompany transfer-pricing adjustments — selecting the OECD method (CUP, cost-plus, resale, profit-split, TNMM), recording original vs arm's-length amounts, attaching contemporaneous documentation, and tracking approval through documented → validated → approved → posted. The OECD BEPS-compliant TP adjustment node."
atomPath: fiscal/periods/tax/periods/transfer/pricing/adjustments
coordinate: fiscal/periods/tax/periods/transfer/pricing/adjustments · 1/base · 3b0035dc
contentUuid: "da35d482-13dc-5a81-b6c8-335f29bf7970"
diamondUuid: "7fc1c414-b17c-86f3-a473-f27c8b0e6eb0"
uuid: "3b0035dc-6ab0-8674-bf96-895d47daf0be"
horo: 1
bonds:
  in:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
  out:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
typography:
  partition: fiscal
  bondDegree: 41
  neighbors: []
standards:
  - "OECD BEPS Action-13 country-by-country"
  - "OECD Transfer-Pricing-Guidelines-2022"
  - "OECD-Transfer-Pricing"
  - "US IRC §482 arms-length"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
  backlinks:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
signatures:
  computationUuid: "2919cbf2-17b5-89ac-959d-095a6a66725e"
  stages:
    - stage: path
      stageUuid: "e13d5020-8aa5-87c6-95b2-0b452326015a"
    - stage: trinity
      stageUuid: "2e8d6873-647c-8e9a-bc9a-2c3421eda92f"
    - stage: boundary
      stageUuid: "38620922-b4c6-80b7-a81b-df121d7f6588"
    - stage: links
      stageUuid: "78669f5e-4c72-8567-a998-440b262b78d7"
    - stage: horo
      stageUuid: "5451d294-f9ae-8d02-8555-aeda698bfb84"
    - stage: seal
      stageUuid: "c82c2d5e-1639-8cc6-ab9c-fc90112ba29a"
    - stage: uuid
      stageUuid: "4824f3dd-5d88-8e7e-9b5b-56bed2753366"
version: 2
---
# transfer-pricing-adjustments

TransferPricingAdjustments Collection.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: a transfer-pricing adjustment restates an intercompany amount to arm's-length under one declared OECD method (CUP/cost-plus/resale/profit-split/TNMM), backed by contemporaneous documentation and advanced documented → validated → approved → posted; it cannot post without that method and evidence.**

## Standards
- OECD Transfer-Pricing-Guidelines-2022
- OECD BEPS Action-13 country-by-country
- US IRC §482 arms-length
