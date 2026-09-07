---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 7/descent · 55fa53f8"
contentUuid: "26dab978-7bdd-543b-86ae-aac9c47ad59e"
diamondUuid: "d8a66dca-d611-8c9b-9cff-c96c50f0dd3a"
uuid: "55fa53f8-73c3-8e1d-b37b-dfc298f61e68"
horo: 7
typography:
  partition: trading
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "ae954ed0-6544-85bd-984e-cc1a93221fa3"
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
      stageUuid: "6669a57b-42a4-8bd4-a5bb-48bd43dfff4a"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "878cbfc9-16ca-8c38-8be2-46322a5d8546"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
