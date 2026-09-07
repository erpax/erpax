---
name: adjustments
description: "Use when documenting intercompany transfer-pricing adjustments — selecting the OECD method (CUP, cost-plus, resale, profit-split, TNMM), recording original vs arm's-length amounts, attaching contemporaneous documentation, and tracking approval through documented → validated → approved → posted. The OECD BEPS-compliant TP adjustment node."
atomPath: "fiscal/periods/tax/periods/transfer/pricing/adjustments"
coordinate: "fiscal/periods/tax/periods/transfer/pricing/adjustments · 2/share · 527bf7f7"
contentUuid: "70bf574a-0528-52b3-8846-bb82685c3f97"
diamondUuid: "7de18cca-2190-8de9-883f-47d44756385c"
uuid: "527bf7f7-9653-8b9a-83d8-aff0d662f8ee"
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
  computationUuid: "1b02e43b-edd1-8c44-8747-4339459600c4"
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
      stageUuid: "23ec2a47-9f2e-8a7b-9f12-9290bf054f9e"
    - stage: seal
      stageUuid: "c82c2d5e-1639-8cc6-ab9c-fc90112ba29a"
    - stage: uuid
      stageUuid: "c34228dd-cfa6-890c-8012-7134914d44c8"
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
