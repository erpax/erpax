---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 5/round · d9ed9667"
contentUuid: "e5664f92-5225-57ef-91c0-84114718dc06"
diamondUuid: "c0bd421d-ea0d-820f-b6f4-8206c0fd3e10"
uuid: "d9ed9667-e2cd-850e-b738-96d43e4796ec"
horo: 5
typography:
  partition: trading
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "3a1e6487-d2d6-8a81-a95e-2d0b30811e94"
  stages:
    - stage: path
      stageUuid: "10773e52-6a3d-873b-a875-499bc2ba389f"
    - stage: trinity
      stageUuid: "83c22513-0559-8815-a3ac-d940f6dd62be"
    - stage: boundary
      stageUuid: "c27632c9-fe02-8dda-8431-b7b2fed4862e"
    - stage: links
      stageUuid: "045d2c54-41bf-842c-b2ac-41456b7e1a29"
    - stage: horo
      stageUuid: "173317d4-d787-8efb-89a9-e7d499b40e62"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "15aeb4b2-2fbf-89ff-900c-15a38504aa8c"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
