---
name: goods
description: "Use when reasoning about goods — Use for the goods-movement trading APIs — e-commerce platforms, marketplaces, shipping carriers/aggregators, and product-data/document-validation networks. The goods slice of the trading-API registry."
atomPath: "trading/api/goods"
coordinate: "trading/api/goods · 1/base · 96321820"
contentUuid: "57d5fe82-f056-5696-9dde-19565f37b6d2"
diamondUuid: "b83c8d6f-1931-8400-a015-e0e1af27482a"
uuid: "96321820-d4af-8972-8f18-af5a0da0519a"
horo: 1
typography:
  partition: trading
  bondDegree: 26
standards: []
bindings: []
signatures:
  computationUuid: "a58ffe81-1e92-8ff6-864c-9a4299b96148"
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
      stageUuid: "8215af5d-bbc8-87a0-9860-01dce7a500e5"
    - stage: seal
      stageUuid: "0a2c5832-f7f7-8bef-8165-6df3d13dbd36"
    - stage: uuid
      stageUuid: "19ac516d-3d10-8ab0-acac-91298d971509"
version: 2
---
# trading/api/goods

The **goods** slice of the trading-API registry — reference entries (provider ·
region · category · endpoints · auth) split from the hub so its index.ts stays a
thin barrel ([[rules]]/concentration). Pure data; the parent [[trading]]/api owns
the query functions and concatenates money ⊕ goods into TRADING_APIS.

Composes: [[trading]].
