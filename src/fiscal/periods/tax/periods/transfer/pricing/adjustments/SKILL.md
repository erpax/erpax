---
name: adjustments
description: "Use when documenting intercompany transfer-pricing adjustments — selecting the OECD method (CUP, cost-plus, resale, profit-split, TNMM), recording original vs arm's-length amounts, attaching contemporaneous documentation, and tracking approval through documented → validated → approved → posted. The OECD BEPS-compliant TP adjustment node."
atomPath: "fiscal/periods/tax/periods/transfer/pricing/adjustments"
coordinate: "fiscal/periods/tax/periods/transfer/pricing/adjustments · 2/share · 3f897b77"
contentUuid: "c95f681a-510d-520f-be9d-347482ac2905"
diamondUuid: "f5520f6b-e41e-8d86-801d-f6ff60eadb71"
uuid: "3f897b77-de35-8edc-b035-287970530932"
horo: 2
typography:
  partition: fiscal
  bondDegree: 42
standards:
  - "OECD BEPS Action-13 country-by-country"
  - "OECD Transfer-Pricing-Guidelines-2022"
  - "OECD-Transfer-Pricing"
  - "US IRC §482 arms-length"
bindings: []
signatures:
  computationUuid: "c8fba92a-3a2a-8fa5-bbb5-baf06de47517"
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
      stageUuid: "0d3bc60d-4b86-8358-ad76-a05b03cc9bf1"
    - stage: seal
      stageUuid: "c82c2d5e-1639-8cc6-ab9c-fc90112ba29a"
    - stage: uuid
      stageUuid: "693c47de-14fb-89d0-8cbe-641e10a79916"
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
