---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 2/share · 27f5efd4"
contentUuid: "86ec4856-c57b-5bef-984e-03eec0dd7d19"
diamondUuid: "9388f42f-330f-8ae4-b3f6-a96435b336a6"
uuid: "27f5efd4-ad6c-8023-b737-79043c03d4d4"
horo: 2
typography:
  partition: trading
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "b3926024-5ecc-89a4-a2b5-3a4948dd7d3e"
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
      stageUuid: "00cc2a6d-e985-8a6e-a46b-d8a96e4524bc"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "d235c587-82d2-8568-aa51-b3a4d393b155"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
