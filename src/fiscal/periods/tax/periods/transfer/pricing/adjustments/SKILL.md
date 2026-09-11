---
name: adjustments
description: "Use when documenting intercompany transfer-pricing adjustments — selecting the OECD method (CUP, cost-plus, resale, profit-split, TNMM), recording original vs arm's-length amounts, attaching contemporaneous documentation, and tracking approval through documented → validated → approved → posted. The OECD BEPS-compliant TP adjustment node."
atomPath: "fiscal/periods/tax/periods/transfer/pricing/adjustments"
coordinate: "fiscal/periods/tax/periods/transfer/pricing/adjustments · 8/crest · 9924deb0"
contentUuid: "9b33dc51-89a5-5863-9579-2a083b672814"
diamondUuid: "809964f5-c737-87f8-8451-3b52f6bc3ec9"
uuid: "9924deb0-10a5-8fe8-b997-4d1ce4b13987"
horo: 8
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
  computationUuid: "cac4e2b8-5002-8cf5-8992-1b1af155d31d"
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
      stageUuid: "abbbea0f-5e55-8f40-9618-9f661fed849e"
    - stage: seal
      stageUuid: "c82c2d5e-1639-8cc6-ab9c-fc90112ba29a"
    - stage: uuid
      stageUuid: "433232c7-8b93-855f-912e-7fb7758fe8e0"
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
