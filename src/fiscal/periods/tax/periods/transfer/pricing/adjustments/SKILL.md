---
name: adjustments
description: "Use when documenting intercompany transfer-pricing adjustments — selecting the OECD method (CUP, cost-plus, resale, profit-split, TNMM), recording original vs arm's-length amounts, attaching contemporaneous documentation, and tracking approval through documented → validated → approved → posted. The OECD BEPS-compliant TP adjustment node."
atomPath: "fiscal/periods/tax/periods/transfer/pricing/adjustments"
coordinate: "fiscal/periods/tax/periods/transfer/pricing/adjustments · 8/crest · 9924deb0"
contentUuid: "559d5184-7ba5-57f5-b2ac-a65a6798a2ca"
diamondUuid: "bd1af209-54db-856a-aedc-60eeb48e0cf3"
uuid: "9924deb0-10a5-8fe8-b997-4d1ce4b13987"
horo: 8
typography:
  partition: fiscal
  bondDegree: 36
standards:
  - "OECD BEPS Action-13 country-by-country"
  - "OECD Transfer-Pricing-Guidelines-2022"
  - "OECD-Transfer-Pricing"
  - "US IRC §482 arms-length"
bindings: []
signatures:
  computationUuid: "913ec453-fb93-8978-808c-2aa24de88887"
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
      stageUuid: "cb3c43d9-af1a-846b-b107-2845f579594b"
    - stage: seal
      stageUuid: "c82c2d5e-1639-8cc6-ab9c-fc90112ba29a"
    - stage: uuid
      stageUuid: "e21bbfb8-e03c-8f72-9a25-c13c241bb8c2"
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
