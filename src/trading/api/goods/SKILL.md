---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 8/crest · 790b58f3"
contentUuid: "6c389136-7d85-5e98-a586-bc931dc0d8ed"
diamondUuid: "5e22aec6-b82c-8051-9211-7625ea8b9c62"
uuid: "790b58f3-aa46-8892-800a-082119cca745"
horo: 8
typography:
  partition: trading
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "0a46e420-fd9c-8915-a9c1-e938b119a1a7"
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
      stageUuid: "06c19d9e-181a-8003-84d5-967a388990e5"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "94747bd2-19c6-80bd-9ba3-f69b0d8895d2"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
